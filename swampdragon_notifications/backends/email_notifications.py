from .. import send_mail


class EmailNotification(object):
    def notify(self, notifications):
        for notification in notifications:
            send_mail.send_notification_email(notification)
