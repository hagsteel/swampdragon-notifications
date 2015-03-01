!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.notifications=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./src/swampdragon-notifications');

},{"./src/swampdragon-notifications":3}],2:[function(require,module,exports){
var isEnabled = false;

function enableDesktopNotifications() {
    Notification.requestPermission(function (status) {
        isEnabled = status === "granted";
    });
}


function disableDesktopNotifications() {
    isEnabled = false;
}


function showDesktopNotification(title, args, onClick) {
    if (isEnabled === false) {
        return; // Desktop notifications are disabled, do nothing
    }

    if (window.Notification && Notification.permission === "granted") {
        var notification = new Notification(title, args);
        if (onClick) {
            notification.onclick = onClick
        }
    }
}

module.exports = {
    enableDesktopNotifications: enableDesktopNotifications,
    disableDesktopNotifications: disableDesktopNotifications,
    showDesktopNotification: showDesktopNotification
};

},{}],3:[function(require,module,exports){
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

},{"./desktop-notifications":2}]},{},[1])(1)
});