from .models import Notification
from .backends.backends import get_backends


DEFAULT_NOTIFICATIONS = {
    'default': {
        'template': 'default_notification',  # Only used by email backend,
        'subject': 'Dear {}, you have a new notification',  # Only used by email backend
        'title': 'Notification',
    }
}


def notify_users(users, subject, notification_type, **kwargs):
    notifications = Notification.objects.new_notifications(users, subject, notification_type)
    backends = get_backends()
    for name, backend in backends:
        backend(name).send_notifications(notifications, notification_type, **kwargs)
