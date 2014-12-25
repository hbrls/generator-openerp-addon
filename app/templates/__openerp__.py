# -*- coding: utf-8 -*-
{
    'name': '<%= addon_name %>',
    'version': '0.1.1',
    'category': 'Hidden',
    'description': """
<%= addon_name %> 描述
    """,
    'author': 'NextTao',
    'depends': ['base'<%= addon_depends %>],
    'web_depends': [],
    'init_xml': [],
    'data': [
        'data_noupdate.xml'
    ],
    'demo_xml': [],
    'test': [],
    'installable': True,
    'active': False,
}
