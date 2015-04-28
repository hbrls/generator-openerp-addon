# -*- coding: utf-8 -*-
{
    'name': '<%= addon_name %>',
    'version': '0.1.1',
    'category': 'Hidden',
    'description': """
<%= addon_name %> 描述
    """,
    'author': 'NextTao',
    'depends': ['web', 'base'<%= addon_depends %>],
    'web_depends': [],
    'init_xml': [],
    'data': [
        'data_noupdate.xml'
    ],
    'demo_xml': [],
    'test': [],
    <% if (!is_website) { %>
    'qweb': [
        'static/xml/simple.xml'
    ],
    'js': [
        'static/js/example.js'
    ],
    'css': [
        'static/css/example.min.css'
    ],
    <% } %>
    'installable': True,
    'active': False,
}
