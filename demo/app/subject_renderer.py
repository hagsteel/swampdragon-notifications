from django.utils.timezone import now


def foo_to_dict(notification, **kwargs):
    return {
        'name': notification.subject.name,
        'timestamp': str(now()),
        'icon': kwargs.get('icon')
    }
