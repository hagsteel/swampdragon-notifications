from django.contrib import admin
from .models import NotificationSettings, NotificationSetting


admin.site.register(NotificationSettings)
admin.site.register(NotificationSetting)
