var desktopNotifications = require('./desktop-notifications');

var onlineCountChangeCallbacks = [];
var notificationCallbacks = [];


swampdragon.open(function () {
    swampdragon.subscribe('swampdragon-notifications', 'notifications', {}, function () { });
    swampdragon.subscribe('swampdragon-online', 'users-online', {}, function () { });
});


swampdragon.onChannelMessage(function (channels, message, data) {
    var channel = null;
    for (var i = 0; i < channels.length; i += 1) {
        channel = channels[i];
        if (channel === "users-online") {
            for (var j = 0; j < onlineCountChangeCallbacks.length; j += 1) {
                onlineCountChangeCallbacks[j](message.data.users_online);
            }
        }

        if (channel === "notifications") {
            for (var j = 0; j < notificationCallbacks.length; j += 1) {
                notificationCallbacks[j](message.data);
            }
        }
    }
});


function onlineCount(fn) {
    swampdragon.ready(function () {
        swampdragon.callRouter('get_online_count', 'swampdragon-online', {}, function (context, data) {
            fn(data.online);
        });
    });
}


function markAsRead(notification, fn) {
    swampdragon.ready(function () {
        swampdragon.callRouter('mark_read', 'swampdragon-notifications', {notification_id:notification.id}, function (context, data) {
            fn(notification);
        });
    });

}


function onNotification(fn) {
    notificationCallbacks.push(fn);
}


function onlineCountChange(fn) {
    onlineCountChangeCallbacks.push(fn);
}


module.exports = {
    onlineCount: onlineCount,
    onlineCountChange: onlineCountChange,
    onNotification: onNotification,
    enableDesktopNotifications: desktopNotifications.enableDesktopNotifications,
    disableDesktopNotifications: desktopNotifications.disableDesktopNotifications,
    desktopNotification: desktopNotifications.showDesktopNotification,
    markAsRead: markAsRead
};
