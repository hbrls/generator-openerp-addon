# -*- coding: utf-8 -*-
import logging
from tornado.web import HTTPError
from openerp.osv import osv
from .decorators import weixin_required, admin_required, weixin_js_sdk, route
from .utils import utc2local

_logger = logging.getLogger(__name__)


class views(osv.osv_memory):
    _name = 'nt.<%= addon_short %>.page.views'

    @route
    @weixin_required
    @weixin_js_sdk
    def my_coupons(self, cr, uid, request_context):
        coupon_code = request_context._handler.get_query_argument('coupon')

        ctx = request_context.ctx

        ctx.update({
            'coupon': coupon
        })

    @route
    @admin_required
    def my_shops(self, cr, uid, request_context):
        ctx = request_context.ctx

        current_user = ctx['current_user']
