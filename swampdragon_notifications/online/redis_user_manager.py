from swampdragon.pubsub_providers.redis_publisher import get_redis_cli
from swampdragon.pubsub_providers.data_publisher import publish_data
from time import time
from tornado.ioloop import PeriodicCallback

ONLINE_USERS = 'online_users'
WINDOW_SIZE = 60 * 5  # Five minutes
USER_LIST = 'users_online'
CLEANUP_FREQUENCY = WINDOW_SIZE  # Cleanup every five minutes
CLEANUP_KEY = 'sd_online_ct'

redis_cli = get_redis_cli()


def current_timestamp_key():
    ts = int(time() / WINDOW_SIZE)
    return 'online_users.{}'.format(ts)


def past_timestamp_key():
    ts = int((time() - WINDOW_SIZE) / WINDOW_SIZE)
    return 'online_users.{}'.format(ts)


def _clean():
    # The cleanup is already running or isn't ready to run yet
    if redis_cli.exists(CLEANUP_KEY):
        return

    redis_cli.set(CLEANUP_KEY, 1, CLEANUP_FREQUENCY)
    past_key = past_timestamp_key()
    current_key = current_timestamp_key()

    users = redis_cli.hkeys(USER_LIST)
    remove_users = []
    changed = False
    for u in users:
        if not redis_cli.hexists(past_key, u) and not redis_cli.hexists(current_key, u):
            changed = True
            redis_cli.hdel(USER_LIST, u)
            remove_users.append(u)
    if changed:
        publish_online_users()


periodic_callback = PeriodicCallback(_clean, CLEANUP_FREQUENCY * 1000)
periodic_callback.start()


def add_user(id):
    """
    Check if the user is already in there first.
    """
    current_key = current_timestamp_key()

    # Check if current key already exists
    hash_exists = redis_cli.exists(current_key) != 0

    # Add user to the current key and the global user list
    redis_cli.hincrby(current_key, id, 1)
    result = redis_cli.hincrby(USER_LIST, id, 1)

    # If current key didn't exist it does now
    # and need to expire at some point
    if not hash_exists:
        redis_cli.expire(current_key, WINDOW_SIZE + 10)

    # If the user was added to the global list
    # publish the user count
    if result == 1:
        publish_online_users()


def remove_user(id):
    past_key = past_timestamp_key()
    current_key = current_timestamp_key()

    result = redis_cli.hincrby(past_key, id, -1)
    if result < 1:
        redis_cli.hdel(past_key, id)

    result = redis_cli.hincrby(current_key, id, -1)
    if result < 1:
        redis_cli.hdel(current_key, id)

    result = redis_cli.hincrby(USER_LIST, id, -1)
    if result < 1:
        redis_cli.hdel(USER_LIST, id)
        publish_online_users()


def user_count():
    return redis_cli.hlen(USER_LIST)


def get_users(exclude_ids=None):
    past_key = past_timestamp_key()
    current_key = current_timestamp_key()

    users = redis_cli.hkeys(USER_LIST)
    remove_users = []
    for u in users:
        if not redis_cli.hexists(past_key, u) and not redis_cli.hexists(current_key, u):
            redis_cli.hdel(USER_LIST, u)
            remove_users.append(u)

    return [int(u) for u in users if u not in remove_users]


def clear():
    redis_cli.delete(past_timestamp_key())
    redis_cli.delete(current_timestamp_key())
    redis_cli.delete(USER_LIST)


def publish_online_users():
    data = {
        'users_online': user_count(),
    }
    publish_data(channel='sd_online_users', data=data)
