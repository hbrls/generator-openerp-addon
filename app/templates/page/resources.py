# -*- coding: utf-8 -*-
from datetime import datetime
from tornado.web import HTTPError
import logging
from openerp.osv import osv
from eshop.decorator import json_request
from .decorators import restful, weixin_required, admin_required


_logger = logging.getLogger(__name__)


class rest(osv.osv_memory):
    _name = 'nt.<%= addon_short %>.page.rest'

    @json_request
    @restful
    @weixin_required
    def get_some_data(self, cr, uid, request_context):
        data = request_context.get_json()

        # admin_obj = self.pool.get('nt.<% addon_short %>.admin')

        return []
