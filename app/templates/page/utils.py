# -*- coding: utf-8 -*-
from datetime import datetime
import pytz


def utc2local(str_utc_time):
    local_tz = pytz.timezone('Asia/Shanghai')
    utc_tz = pytz.timezone('UTC')

    utc_time = datetime.strptime(str_utc_time[0:19], '%Y-%m-%d %H:%M:%S')
    utc_time = utc_time.replace(tzinfo=utc_tz)

    local_time = utc_time.astimezone(local_tz)

    return local_time.strftime('%Y-%m-%d %H:%M:%S')
