from django.test import TestCase
from swampdragon_notifications.online import user_manager


class TestOnlineUsers(TestCase):
    def setUp(self):
        user_manager.clear()
        user_manager.add_user(1)
        user_manager.add_user(2)

    def test_exclude(self):
        self.assertListEqual(user_manager.get_users(exclude_ids=2), [1])
        self.assertListEqual(user_manager.get_users(exclude_ids=[2]), [1])

    def test_count(self):
        self.assertEqual(user_manager.user_count(), 2)

    def test_remove(self):
        user_manager.remove_user(1)
        self.assertEqual(user_manager.user_count(), 1)

    def test_clear(self):
        user_manager.clear()
        self.assertEqual(user_manager.user_count(), 0)
