from django.conf import settings

_imported = {}
_subject_processors = {}


def import_target(src):
    try:
        module = src.rsplit('.', 1)[0]
        target = src.rsplit('.', 1)[1]
        mod = __import__(module, fromlist=[target])
        klass = getattr(mod, target)
        return klass
    except:
        return None


def _load_processor(notification_type):
    if not hasattr(settings, 'SWAMP_DRAGON_NOTIFICATIONS'):
        raise Exception('"SWAMP_DRAGON_NOTIFICATIONS" is missing from settings')

    type_settings = settings.SWAMP_DRAGON_NOTIFICATIONS.get(notification_type)
    if not type_settings:
        raise Exception('No subject processor for the type {}'.format(notification_type))

    if notification_type not in _subject_processors:
        _subject_processors[notification_type] = import_target(type_settings['processor'])


def get_processor(notification_type):
    global _subject_processors
    if notification_type not in _subject_processors:
        _load_processor(notification_type)

    return _subject_processors[notification_type]


def unload():
    """
    Really only used in testing
    """
    global _imported
    global _subject_processors
    _imported = {}
    _subject_processors = {}
