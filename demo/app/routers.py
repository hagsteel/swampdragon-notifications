from swampdragon import route_handler
from swampdragon.route_handler import BaseRouter
from django.contrib.auth.models import User
from swampdragon_notifications.notifier import notify_users
from .models import Foo


class NotifyRouter(BaseRouter):
    valid_verbs = ['subscribe', 'notify_everyone', 'notify_everyone_but_me']
    route_name = 'notifier'

    def notify_everyone(self, name):
        users = User.objects.all()
        foo = Foo.objects.create(name=name)
        notify_users(users, subject=foo, notification_type='foo')

    def notify_everyone_but_me(self, name):
        users = User.objects.exclude(pk=self.connection.user.pk)
        foo = Foo.objects.create(name=name)
        notify_users(users, subject=foo, notification_type='foo')


route_handler.register(NotifyRouter)
