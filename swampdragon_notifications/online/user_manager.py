from . import redis_user_manager, mock_user_manager
import sys


def manager():
    if 'test' in sys.argv:
        return mock_user_manager
    return redis_user_manager


def add_user(id):
    manager().add_user(id)


def remove_user(id):
    manager().remove_user(id)


def user_count():
    return manager().user_count()


def get_users(exclude_ids=None):
    users = manager().get_users()
    exclude_ids = exclude_ids or []
    if not isinstance(exclude_ids, list):
        exclude_ids = [exclude_ids]
    return [u for u in users if u not in exclude_ids]


def publish_online_users():
    manager().publish_online_users()


def clear():
    manager().clear()
