_users = []


def add_user(id):
    user_id = str(id).encode()
    if user_id in _users:
        return
    _users.append(str(id).encode())


def remove_user(id):
    encoded_id = str(id).encode()
    if encoded_id in _users:
        _users.remove(encoded_id)


def user_count():
    return len(_users)


def get_users():
    users = _users[:]
    return [int(u) for u in users]


def clear():
    global _users
    _users = []
