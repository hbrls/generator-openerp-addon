# -*- coding: utf-8 -*-
from functools import update_wrapper
from tornado.web import HTTPError
import logging
from .models import User, Admin


_logger = logging.getLogger(__name__)


def route(f):
    def wrapped_function(view, cr, uid, request_context):
        _logger.info('initializing a standard view ...')

        ctx = {}
        request_context.ctx = ctx

        _logger.info('elaborating the view context ...')
        f(view, cr, uid, request_context)

        _logger.info('the view is ready ...')
    return update_wrapper(wrapped_function, f)


def restful(f):
    def wrapped_function(view, cr, uid, request_context):
        _logger.info('initializing a standard view ...')

        ctx = {}
        request_context.ctx = ctx

        _logger.info('elaborating the view context ...')
        return f(view, cr, uid, request_context)
    return update_wrapper(wrapped_function, f)


def role_required(role_name):
    def _decorator(f):
        def _wrapped_function(view, cr, uid, request_context):
            if not hasattr(request_context, 'ctx'):
                _logger.warn('deprecated: decorate your views with @route/@restful')
                request_context.ctx = {}

            ctx = request_context.ctx

            pid = User.get_current_weixin_user(view.pool, cr, uid, request_context)

            if pid:
                ctx.update({ 'pid': pid })
                if role_name == 'weixin':
                    # 只要是从微信进来的就可以了
                    weixin_user = User(view.pool, cr, uid, request_context, pid)
                    ctx.update({ 'current_user': weixin_user })
                    _logger.info('weixin_required: ok')
                    return f(view, cr, uid, request_context)
                elif role_name == 'admin':
                    admin = Admin(view.pool, cr, uid, request_context, pid)
                    if admin.is_admin:
                        ctx.update({ 'current_user': admin })
                        _logger.info('admin_required: ok')
                        return f(view, cr, uid, request_context)
                    else:
                        raise HTTPError(403, reason=u'admin required')

            raise HTTPError(403, reason=u'请在微信中打开')
        return update_wrapper(_wrapped_function, f)

    return _decorator


weixin_required = role_required('weixin')
admin_required = role_required('admin')


def weixin_js_sdk(f):
    def wrapped_function(view, cr, uid, request_context):
        _logger.info('preparing weixin js sdk signature ...')

        ctx = request_context.ctx

        mock_wjs = request_context._handler.get_query_argument('mock_wjs', None)
        if mock_wjs == 'true':
            ctx.update({ 'mock_wjs': True })
            signature = {
                'app_id': 'FAKE_APP_ID',
                'timestamp': 1500000000000,
                'nonceStr': 'FAKE_NONCE_STR',
                'signature': 'FAKE_SIGNATURE',
            }
        else:
            ctx.update({ 'mock_wjs': False })
            jsapi_ticket_obj = view.pool.get('nt.nexttao.web.page.jsapi_ticket')

            signature = jsapi_ticket_obj.get_signature_info(cr, uid, request_context)

        ctx.update({ 'signature': signature })

        _logger.info('weixin js sdk signature is ready ...')

        f(view, cr, uid, request_context)
    return update_wrapper(wrapped_function, f)

