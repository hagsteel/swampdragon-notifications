from django.conf import settings
from swampdragon.pubsub_providers.data_publisher import publish_data
from ..online import user_manager
from ..subject_processors import get_processor
from .backends import MissingProcessor
from .base_backend import BaseBackend


def get_processor_kwargs(notification_type):
    if not hasattr(settings, 'SWAMP_DRAGON_NOTIFICATIONS'):
        return {}
    return settings.SWAMP_DRAGON_NOTIFICATIONS.get(notification_type)


class RealtimeNotification(BaseBackend):
    def notify(self, notifications, **processor_kwargs):
        user_ids = user_manager.get_users()
        online_notifications = [n for n in notifications if n.user_id in user_ids]

        for notification in online_notifications:
            channel = 'sd_notification_user_{}'.format(notification.user.pk)
            processor = get_processor(notification.type)
            if processor is None:
                raise MissingProcessor('Missing notification processor for "{}"'.format(notification.type))
            publish_data(channel, data=processor(notification, **processor_kwargs))
