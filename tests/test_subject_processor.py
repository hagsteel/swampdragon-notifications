from django.contrib.auth.models import User
from django.test import TestCase, override_settings
from swampdragon_notifications import subject_processors
from swampdragon_notifications.models import Notification
from swampdragon_notifications.subject_processors import get_processor
from tests.models import Foo


def custom_process_foo(foo):
    return {'name': foo.name, 'bar': 'baz'}


class SubjectProcessorTest(TestCase):
    def setUp(self):
        # Unload processors
        subject_processors.unload()

    def test_process_subject(self):
        """
        Process a Foo model into a dictionary
        """
        self.user_a = User.objects.create(first_name='Veronica', username='veronica')
        foo = Foo.objects.create(name='foo', description='foo object')
        notifications = Notification.objects.new_notifications(User.objects.all(), subject=foo, notification_type='foo')
        processor = get_processor('foo')
        self.assertEqual(processor(notifications[0])['name'], foo.name)


    @override_settings(SWAMP_DRAGON_NOTIFICATIONS = { 'foo': { 'processor': 'tests.test_subject_processor.custom_process_foo' } })
    def test_load_processor(self):
        processor = get_processor('foo')
        self.assertEqual(processor, custom_process_foo)
