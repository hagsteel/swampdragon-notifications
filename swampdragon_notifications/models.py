from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from model_utils.models import TimeStampedModel

try:
    from django.contrib.contenttypes.fields import GenericForeignKey
except ImportError:
    from django.contrib.contenttypes.generic import GenericForeignKey


class NotificationManager(models.Manager):
    def new_notifications(self, users, subject, notification_type):
        notifications = [Notification(user=user, subject=subject, type=notification_type) for user in users]
        return self.bulk_create(notifications)

    def unread(self, user):
        return self.filter(user=user, read=False)

    def mark_read(self, notification_ids):
        if not isinstance(notification_ids, list):
            notification_ids = [notification_ids]
        self.filter(pk__in=notification_ids).update(read=True)


class Notification(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='notifications')
    body = models.TextField()
    read = models.BooleanField(default=False)
    type = models.CharField(max_length=100, default='default')

    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    subject = GenericForeignKey('content_type', 'object_id')

    objects = NotificationManager()

    def action_url(self):
        if hasattr(self.subject, 'get_absolute_url'):
            return self.subject.get_absolute_url()
        return None


class NotificationSettingsManager(models.Manager):
    def notification_settings(self, user):
        settings, created = self.get_or_create(user=user)
        return settings

    def filter_notifications(self, notifications, notification_backend):
        user_ids = [n.user.pk for n in notifications]
        excluded = self.filter(user_id__in=user_ids, setting__backend=notification_backend, setting__enabled=False).values_list('user_id', flat=True)
        return [n for n in notifications if n.user.pk not in excluded]


class NotificationSettings(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='notification_settings')

    objects = NotificationSettingsManager()

    def __str__(self):
        return 'Notification settings: {}'.format(self.user.__str__())

    def __unicode__(self):
        return self.__str__()


class NotificationSettingManager(models.Manager):
    def change(self, notification_settings, backend_type, enabled):
        ns, created = self.get_or_create(notification_settings=notification_settings, backend=backend_type)
        ns.enabled = enabled
        ns.save()
        return ns

    def get_or_default(self, notification_settings, backend):
        notification_setting, created = self.get_or_create(notification_settings=notification_settings, backend=backend)
        return notification_setting


class NotificationSetting(models.Model):
    notification_settings = models.ForeignKey(NotificationSettings, related_name='setting')
    backend = models.CharField(max_length=100)
    enabled = models.BooleanField(default=True)

    objects = NotificationSettingManager()

    def __str__(self):
        return '{} {} enabled: {}'.format(self.notification_settings.user.__str__(), self.backend, self.enabled)

    def __unicode__(self):
        return self.__str__()
