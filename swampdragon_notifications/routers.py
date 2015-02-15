from swampdragon import route_handler
from swampdragon.route_handler import BaseRouter
from .models import Notification
from .online import user_manager


class OnlineUsersRouter(BaseRouter):
    route_name = 'swampdragon-online'
    valid_verbs = ['subscribe', 'unsubscribe', 'get_online_count']

    def subscribe(self, **kwargs):
        """
        Only subscribe online users
        """
        if not self.connection.user:
            return

        super(OnlineUsersRouter, self).subscribe(**kwargs)
        if self.connection.user:
            user_manager.add_user(self.connection.user.pk)

    def get_subscription_channels(self, **kwargs):
        return ['sd_online_users']

    def get_online_count(self, **kwargs):
        self.send({'online': user_manager.user_count()})


class NotificationRouter(BaseRouter):
    route_name = 'swampdragon-notifications'
    valid_verbs = ['subscribe', 'unsubscribe', 'get_user_count', 'mark_read']

    def subscribe(self, **kwargs):
        """
        Only subscribe online users
        """
        if not self.connection.user:
            return
        super(NotificationRouter, self).subscribe(**kwargs)

    def get_subscription_channels(self, **kwargs):
        return ['sd_notification_user_{}'.format(self.connection.user.pk)]

    def mark_read(self, notification_id):
        Notification.objects.filter(user=self.connection.user, pk=notification_id).update(read=True)


route_handler.register(OnlineUsersRouter)
route_handler.register(NotificationRouter)
user_manager.clear()
