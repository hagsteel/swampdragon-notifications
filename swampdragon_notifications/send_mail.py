from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template import Context
from django.template.loader import get_template
from .notifier import DEFAULT_NOTIFICATIONS

NOTIFICATIONS_SETTINGS = getattr(settings, 'SWAMP_DRAGON_NOTIFICATIONS', DEFAULT_NOTIFICATIONS)


def send_notification_email(notification):
    notification_settings = NOTIFICATIONS_SETTINGS[notification.type]
    subject = notification_settings.get('subject') or 'Notification'
    template = notification_settings.get('template') or 'default_notification'
    email = notification.user.email
    if not email:
        return  # Don't try to send the email if email address is missing

    _send_mail(
        subject=subject,
        sender=getattr(settings, 'NOTIFICATION_SENDER', settings.SERVER_EMAIL),
        receiver=email,
        template_name=template,
        context={'notification': notification},
    )


def _send_mail(**kwargs):
    subject, from_email, to = kwargs.get('subject'), kwargs.get('sender'), kwargs.get('receiver')
    text = get_template('swampdragon_notifications/emails/%s.txt' % kwargs.get('template_name'))
    html = get_template('swampdragon_notifications/emails/%s.html' % kwargs.get('template_name'))
    context = kwargs.get('context')
    email_context = Context(context)
    text_content = text.render(email_context)
    html_content = html.render(email_context)
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()
