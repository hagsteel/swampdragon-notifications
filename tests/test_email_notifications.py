from django.conf import settings
from django.contrib.auth.models import User
from django.core import mail
from django.test import TestCase
from swampdragon_notifications.online import user_manager
from swampdragon_notifications.notifier import notify_users
from tests.models import Foo


class NotificationTest(TestCase):
    def setUp(self):
        user_manager.clear()
        self.user_a = User.objects.create(first_name='Veronica', username='veronica', email='veronica@test.tes')
        self.user_b = User.objects.create(first_name='Jonas', username='jonas', email='jonas@test.tes')
        user_manager.add_user(self.user_a.pk)
        user_manager.add_user(self.user_b.pk)
        settings.SWAMP_DRAGON_NOTIFICATION_BACKENDS = ['swampdragon_notifications.backends.email_notifications.EmailNotification']

        # subject, notification, template

    def test_notify_user(self):
        """
        Send one email to user a
        """
        foo = Foo.objects.create(name='foo', description='foo object')
        notify_users([self.user_a], foo, notification_type='foo')
        self.assertEqual(len(mail.outbox), 1)

    def test_notify_users(self):
        """
        Send one email to user a
        """
        foo = Foo.objects.create(name='foo', description='foo object')
        notify_users(User.objects.all(), foo, notification_type='foo')
        self.assertEqual(len(mail.outbox), 2)
