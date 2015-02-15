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
