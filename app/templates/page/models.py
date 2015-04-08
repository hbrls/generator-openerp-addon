# -*- coding: utf-8 -*-
import logging
from openerp import tools
from .utils import utc2local


_logger = logging.getLogger(__name__)


class User(object):
    def __init__(self, pool, cr, uid, request_context, pid):
        self._pid = pid

        partner_obj = pool.get('res.partner')
        self._partner = partner_obj.browse(cr, uid, pid)

    @property
    def name(self):
        return self.id and self._partner.name or ''


class AnonymousUser(User):
    def __init__(self, pool, cr, uid, request_context, pid):
        self.id = None


class Admin(User):
    def __init__(self, pool, cr, uid, request_context, pid):
        # if brand:
        #     self.is_admin = True

        #     super(Admin, self).__init__(pool, cr, uid, request_context, pid)
        # else:
        #     self.is_admin = False
        pass


def get_current_user(pool, cr, uid, request_context):
    partner_obj = pool.get('res.partner')

    if tools.config.get('debug_mode', False):
        debug_partner_id = request_context._handler.get_query_argument('debug_partner_id', None)
        if debug_partner_id:
            debug_partner_id = int(debug_partner_id)
            _logger.debug('DEBUG PARTNER ID: %s' % debug_partner_id)
            return User(pool, cr, uid, request_context, debug_partner_id)

    # ** 用户从微信进来时走的 /weixin2，在那里 request_context.Session['account'] 已经被设置成了 partner_id
    #    该 Session 什么时候过期是由那边控制的，我这里只管使用，并且认为就是当前用户
    partner_id = partner_obj.site_get_partner_id(cr, uid, request_context)
    if partner_id:
        partner_id = int(partner_id)
        return User(pool, cr, uid, request_context, partner_id)

    return AnonymousUser(pool, cr, uid, request_context, None)
