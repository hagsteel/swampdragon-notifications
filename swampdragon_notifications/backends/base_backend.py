from swampdragon_notifications.models import NotificationSettings


class BaseBackend(object):
    def __init__(self, name):
        self.name = name

    def send_notifications(self, notifications, notification_type, **kwargs):
        proc_kwargs = self.get_processor_kwargs(notification_type)
        proc_kwargs.update(kwargs)
        filtered_notifications = NotificationSettings.objects.filter_notifications(notifications, self.name)
        self.notify(filtered_notifications, **proc_kwargs)

    def get_processor_kwargs(self, notification_type):
        return {}

    def notify(self, notifications, **proc_kwargs):
        pass
