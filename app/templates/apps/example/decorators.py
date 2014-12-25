# -*- coding: utf-8 -*-
import logging
from openerp.osv import fields, osv
from eshop.decorator import json_request


_logger = logging.getLogger(__name__)


class rest(osv.osv_memory):
    _name = 'nt.<%= addon_short %>.rest'

    @json_request
    def js_http_post(self, cr, uid, request_context):
        data = request_context.get_json()
        a = data['a']
        return ['list', 'dict', 'composite']
