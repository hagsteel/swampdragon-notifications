from django.contrib.auth.models import User
from django.test import TestCase
from swampdragon import route_handler
from swampdragon.tests.dragon_test_case import DragonTestCase
from swampdragon.tests.mock_connection import TestConnection
from swampdragon_notifications.backends import backends
from swampdragon_notifications.backends.realtime_notifications import RealtimeNotification
from swampdragon_notifications.models import Notification
from swampdragon_notifications.online import user_manager
from swampdragon_notifications.notifier import notify_users
from swampdragon_notifications.routers import NotificationRouter
from tests.models import Foo


class NotificationTest(TestCase):
    def setUp(self):
        user_manager.clear()
        self.user_a = User.objects.create(first_name='Veronica', username='veronica')
        self.user_b = User.objects.create(first_name='Jonas', username='jonas')
        user_manager.add_user(self.user_a.pk)
        user_manager.add_user(self.user_b.pk)

    def test_notify_user(self):
        """
        Send one notification to user a
        """
        foo = Foo.objects.create(name='foo', description='foo object')
        notify_users([self.user_a], foo, notification_type='foo')

        self.assertTrue(Notification.objects.filter(user=self.user_a).exists())
        self.assertFalse(Notification.objects.filter(user=self.user_b).exists())

    def test_notify_users(self):
        """
        Send a notification to each user
        """
        foo = Foo.objects.create(name='foo', description='foo object')
        notify_users(User.objects.all(), foo, notification_type='foo')

        self.assertTrue(Notification.objects.filter(user=self.user_a).exists())
        self.assertTrue(Notification.objects.filter(user=self.user_b).exists())


class RealtimeNotificationTest(DragonTestCase):
    def setUp(self):
        route_handler.register(NotificationRouter)
        backends.backends = [RealtimeNotification]
        user_manager.clear()
        self.user_a = User.objects.create(first_name='Veronica', username='veronica')
        self.user_b = User.objects.create(first_name='Jonas', username='jonas')
        self.user_c = User.objects.create(first_name='Benedicte', username='bennitrix')
        user_manager.add_user(self.user_a.pk)
        user_manager.add_user(self.user_b.pk)
        user_manager.add_user(self.user_c.pk)

    def test_realtime_notification(self):
        """
        User A creates a Foo, so should not receive a notification
        User B is online and should receive the notification
        User C is subscribed but currently showing as offline
        """
        connection_a = TestConnection(user=self.user_a)
        connection_b = TestConnection(user=self.user_b)
        connection_c = TestConnection(user=self.user_c)

        connection_a.subscribe('swampdragon-notifications', 'notifications', {})
        connection_b.subscribe('swampdragon-notifications', 'notifications', {})
        connection_c.subscribe('swampdragon-notifications', 'notifications', {})

        # User C drops offline
        user_manager.remove_user(self.user_c.pk)
        foo = Foo.objects.create(name='foo', description='foo object')
        notify_users(User.objects.exclude(pk=self.user_a.pk), foo, notification_type='foo')

        self.assertIsNotNone(connection_b.last_pub)
        self.assertIsNone(connection_a.last_pub)
        self.assertIsNone(connection_c.last_pub)

    def test_public_notifications(self):
        connection_a = TestConnection()
        connection_b = TestConnection()

        connection_a.subscribe('swampdragon-notifications', 'notifications', {})
        connection_b.subscribe('swampdragon-notifications', 'notifications', {})
