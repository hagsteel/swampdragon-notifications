from swampdragon_auth.socketconnection import HttpDataConnection
from .online import user_manager


class Connection(HttpDataConnection):
    def __init__(self, session):
        self._user = None
        super(Connection, self).__init__(session)

    def on_heartbeat(self):
        if self.user:
            user_manager.add_user(self.user.pk)
        super(Connection, self).on_heartbeat()

    def on_open(self, request):
        super(Connection, self).on_open(request)

    def on_close(self):
        super(Connection, self).on_close()
        user_manager.remove_user(self.user.pk)
