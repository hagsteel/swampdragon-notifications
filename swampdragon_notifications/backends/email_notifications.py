from .. import send_mail
from .base_backend import BaseBackend


class EmailNotification(BaseBackend):
    def notify(self, notifications, **processor_kwargs):
        for notification in notifications:
            send_mail.send_notification_email(notification)
