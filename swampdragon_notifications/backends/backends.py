from django.conf import settings
try:
    from django.utils.module_loading import import_by_path as import_string
except ImportError:
    from django.utils.module_loading import import_string


DEFAULT_NOTIFICATION_BACKENDS = [
    'swampdragon_notifications.backends.realtime_notifications.RealtimeNotification',
    # 'swampdragon_notifications.backends.email_notifications.EmailNotification',
]


backends = []


def load(backend):
    return import_string(backend)


def get_backends():
    if backends:
        return backends

    backend_imports = getattr(settings, 'SWAMP_DRAGON_NOTIFICATION_BACKENDS', DEFAULT_NOTIFICATION_BACKENDS)
    for bi in backend_imports:
        backends.append(load(bi))
    return backends
