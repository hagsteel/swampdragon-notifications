# SwampDragon notifications

Notify your users in real time.

**Note** Since notifications isn't always an essential part of a system, only signed in users receive notifications.  

# TODO

*  Document subject processor 
*  Make sure subject processor doesn't have a default! (we can't anticipate this) 
*  Write desktop notifications docs 


# Prerequisites

*  Redis 2.8+


# Installation

    `pip install swampdragon-notifications`
    

# Setup

    :::html
    {% load swampdragon_tags static %}
    ...
    <!-- Swamp dragon -->
    {% swampdragon_settings %}
    <script type="text/javascript" src="{% static 'swampdragon/js/dist/swampdragon.min.js' %}"></script>
    
    <!-- Swamp dragon notifications -->
    <script type="text/javascript" src="{% static 'js/dist/swampdragon-notifications.js' %}"></script>


# JavaScript API

## Get number of users online:

    :::javascript
    notifications.onlineCount(function (count) {
        console.log(count);
    });


## User count onChange event:

Triggered when a new user comes online or someone goes offline

    :::javascript
    notifications.onlineCountChange(function (count) {
        setUserCount(count);
    });


## Desktop notifications

To enable desktop notifications: `notifications.enableDesktopNotifications();`.

To disable desktop notifications: `notifications.disableDesktopNotifications();`.

To trigger a desktop notifications:

    :::javascript
    var payload = {
        body:notification.some_value,
        icon: notification.icon // assuming an icon url is available,
        tag: 'foo'
    }
    notifications.desktopNotification('New foo', payload);



# Example setup (settings.py)

The following example setup will send both email notifications and realtime notifications.
To disable the email notifications: remove `'swampdragon_notifications.backends.realtime_notifications.RealtimeNotification'` from `SWAMP_DRAGON_NOTIFICATION_BACKENDS`.

    :::python
    SWAMP_DRAGON_NOTIFICATION_BACKENDS = [
        'swampdragon_notifications.backends.realtime_notifications.RealtimeNotification',
        'swampdragon_notifications.backends.email_notifications.EmailNotification',
    ]
    
    
    SWAMP_DRAGON_NOTIFICATIONS = {
        'foo': {
            'processor': 'app.subject_renderer.foo_to_dict',
            'icon': 'http://placekitten.com/g/64/64'
            'subject': 'A new foo',
            'template': 'new_foo_notification'
        }
    }
    
    SWAMP_DRAGON_HEARTBEAT_ENABLED = True
    SWAMP_DRAGON_HEARTBEAT_FREQUENCY = 1000 * 60 * 5  # Five minutes


Create a file called subject_renderer.py in your project, and add a new function:

    :::python
    def foo_to_dict(notification, **kwargs):
        return {
            ...
        }

The function `foo_to_dict` should return a dictionary with any data you want to pass on to the client.


## Subject processors

A subject processor belongs to a notification type (defined in `SWAMP_DRAGON_NOTIFICATIONS`).

The processor is a function, and takes a `notification` and `**kwargs` as arguments, and returns a dictionary.

Example processor:

    :::python
    def foo_processor(notification, **kwargs):
        return {
            'foo_id': notification.subject.pk,
            'timestamp': now(),
            'extra_value:' kwargs.get('extra_value')
        }


## Settings

Enable heart beat if you are using realtime notifications.
This helps keep track on who is online.


    :::python
    SWAMP_DRAGON_HEARTBEAT_ENABLED = True
    SWAMP_DRAGON_HEARTBEAT_FREQUENCY = 1000 * 60 * 5  # Five minutes


### `SWAMP_DRAGON_NOTIFICATIONS`

To customise notification, add `SWAMP_DRAGON_NOTIFICATIONS` to settings.
This is a dictionary:


    :::python
    SWAMP_DRAGON_NOTIFICATIONS = {
        'foo': {
            'processor': 'app.subject_renderer.foo_to_dict'
            'template': 'standard_email',  # Only used by email backend,
            'subject': 'Dear {}, you have a new notification',  # Only used by email backend 
            'title': 'Notification', 
            'icon': 'http://placekitten.com/g/64/64'
        }
    }

`template` and `subject` only concern the default email backend.


### Notification backends

There are two notification backends: email and realtime.

Set notification backends:


    :::python
    SWAMP_DRAGON_NOTIFICATION_BACKENDS = [
        'swampdragon_notifications.backends.realtime_notifications.RealtimeNotification',
        'swampdragon_notifications.backends.email_notifications.EmailNotification',
    ]

`'swampdragon_notifications.backends.realtime_notifications.RealtimeNotification'` is enabled by default.



### Email notification backend

The emails will, by default, be sent from `settings.SERVER_EMAIL`.
To change the sender email address specify `NOTIFICATION_SENDER` in settings.


#### Creating a custom notification backend

Add a new file to your project `foo_notification_backend.py`.

Add a class `FooNotificationBackend`

implement the function `def notify(notification):` in your custom notification backend


    :::python
    class FooNotificationBackend(object):
        def notify(self, notification):
            pass
            
            
3.  Add the new backend to your settings


    :::python
    SWAMP_DRAGON_NOTIFICATION_BACKENDS = [
        ...
        'myproj.foo_notification_backend.FooNotificationBackend'
    ]
