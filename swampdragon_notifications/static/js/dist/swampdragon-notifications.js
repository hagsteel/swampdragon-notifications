!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.notifications=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/jonas/Projects/Django/swampdragon-notifications/swampdragon_notifications/static/js/src/desktop-notifications.js":[function(require,module,exports){
var isEnabled = false;

function enableDesktopNotifications() {
    Notification.requestPermission(function (status) {
        isEnabled = status === "granted";
    });
}


function disableDesktopNotifications() {
    isEnabled = false;
}


function showDesktopNotification(title, args) {
    if (isEnabled === false) {
        return; // Desktop notifications are disabled, do nothing
    }

    if (window.Notification && Notification.permission === "granted") {
        new Notification(title, args);
    }
}

module.exports = {
    enableDesktopNotifications: enableDesktopNotifications,
    disableDesktopNotifications: disableDesktopNotifications,
    showDesktopNotification: showDesktopNotification
};

},{}],"/Users/jonas/Projects/Django/swampdragon-notifications/swampdragon_notifications/static/js/src/swampdragon-notifications.js":[function(require,module,exports){
var desktopNotifications = require('./desktop-notifications');

var onlineCountChangeCallbacks = [];
var notificationCallbacks = [];


swampdragon.ready(function () {
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

},{"./desktop-notifications":"/Users/jonas/Projects/Django/swampdragon-notifications/swampdragon_notifications/static/js/src/desktop-notifications.js"}]},{},["/Users/jonas/Projects/Django/swampdragon-notifications/swampdragon_notifications/static/js/src/swampdragon-notifications.js"])("/Users/jonas/Projects/Django/swampdragon-notifications/swampdragon_notifications/static/js/src/swampdragon-notifications.js")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXNrdG9wLW5vdGlmaWNhdGlvbnMuanMiLCJzd2FtcGRyYWdvbi1ub3RpZmljYXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgaXNFbmFibGVkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGVuYWJsZURlc2t0b3BOb3RpZmljYXRpb25zKCkge1xuICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiAoc3RhdHVzKSB7XG4gICAgICAgIGlzRW5hYmxlZCA9IHN0YXR1cyA9PT0gXCJncmFudGVkXCI7XG4gICAgfSk7XG59XG5cblxuZnVuY3Rpb24gZGlzYWJsZURlc2t0b3BOb3RpZmljYXRpb25zKCkge1xuICAgIGlzRW5hYmxlZCA9IGZhbHNlO1xufVxuXG5cbmZ1bmN0aW9uIHNob3dEZXNrdG9wTm90aWZpY2F0aW9uKHRpdGxlLCBhcmdzKSB7XG4gICAgaWYgKGlzRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuOyAvLyBEZXNrdG9wIG5vdGlmaWNhdGlvbnMgYXJlIGRpc2FibGVkLCBkbyBub3RoaW5nXG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5Ob3RpZmljYXRpb24gJiYgTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09IFwiZ3JhbnRlZFwiKSB7XG4gICAgICAgIG5ldyBOb3RpZmljYXRpb24odGl0bGUsIGFyZ3MpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZW5hYmxlRGVza3RvcE5vdGlmaWNhdGlvbnM6IGVuYWJsZURlc2t0b3BOb3RpZmljYXRpb25zLFxuICAgIGRpc2FibGVEZXNrdG9wTm90aWZpY2F0aW9uczogZGlzYWJsZURlc2t0b3BOb3RpZmljYXRpb25zLFxuICAgIHNob3dEZXNrdG9wTm90aWZpY2F0aW9uOiBzaG93RGVza3RvcE5vdGlmaWNhdGlvblxufTtcbiIsInZhciBkZXNrdG9wTm90aWZpY2F0aW9ucyA9IHJlcXVpcmUoJy4vZGVza3RvcC1ub3RpZmljYXRpb25zJyk7XG5cbnZhciBvbmxpbmVDb3VudENoYW5nZUNhbGxiYWNrcyA9IFtdO1xudmFyIG5vdGlmaWNhdGlvbkNhbGxiYWNrcyA9IFtdO1xuXG5cbnN3YW1wZHJhZ29uLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBzd2FtcGRyYWdvbi5zdWJzY3JpYmUoJ3N3YW1wZHJhZ29uLW5vdGlmaWNhdGlvbnMnLCAnbm90aWZpY2F0aW9ucycsIHt9LCBmdW5jdGlvbiAoKSB7IH0pO1xuICAgIHN3YW1wZHJhZ29uLnN1YnNjcmliZSgnc3dhbXBkcmFnb24tb25saW5lJywgJ3VzZXJzLW9ubGluZScsIHt9LCBmdW5jdGlvbiAoKSB7IH0pO1xufSk7XG5cblxuc3dhbXBkcmFnb24ub25DaGFubmVsTWVzc2FnZShmdW5jdGlvbiAoY2hhbm5lbHMsIG1lc3NhZ2UsIGRhdGEpIHtcbiAgICB2YXIgY2hhbm5lbCA9IG51bGw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFubmVscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjaGFubmVsID0gY2hhbm5lbHNbaV07XG4gICAgICAgIGlmIChjaGFubmVsID09PSBcInVzZXJzLW9ubGluZVwiKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9ubGluZUNvdW50Q2hhbmdlQ2FsbGJhY2tzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgb25saW5lQ291bnRDaGFuZ2VDYWxsYmFja3Nbal0obWVzc2FnZS5kYXRhLnVzZXJzX29ubGluZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbm5lbCA9PT0gXCJub3RpZmljYXRpb25zXCIpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbm90aWZpY2F0aW9uQ2FsbGJhY2tzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uQ2FsbGJhY2tzW2pdKG1lc3NhZ2UuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG5mdW5jdGlvbiBvbmxpbmVDb3VudChmbikge1xuICAgIHN3YW1wZHJhZ29uLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dhbXBkcmFnb24uY2FsbFJvdXRlcignZ2V0X29ubGluZV9jb3VudCcsICdzd2FtcGRyYWdvbi1vbmxpbmUnLCB7fSwgZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgICAgIGZuKGRhdGEub25saW5lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cblxuZnVuY3Rpb24gbWFya0FzUmVhZChub3RpZmljYXRpb24sIGZuKSB7XG4gICAgc3dhbXBkcmFnb24ucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2FtcGRyYWdvbi5jYWxsUm91dGVyKCdtYXJrX3JlYWQnLCAnc3dhbXBkcmFnb24tbm90aWZpY2F0aW9ucycsIHtub3RpZmljYXRpb25faWQ6bm90aWZpY2F0aW9uLmlkfSwgZnVuY3Rpb24gKGNvbnRleHQsIGRhdGEpIHtcbiAgICAgICAgICAgIGZuKG5vdGlmaWNhdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59XG5cblxuZnVuY3Rpb24gb25Ob3RpZmljYXRpb24oZm4pIHtcbiAgICBub3RpZmljYXRpb25DYWxsYmFja3MucHVzaChmbik7XG59XG5cblxuZnVuY3Rpb24gb25saW5lQ291bnRDaGFuZ2UoZm4pIHtcbiAgICBvbmxpbmVDb3VudENoYW5nZUNhbGxiYWNrcy5wdXNoKGZuKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBvbmxpbmVDb3VudDogb25saW5lQ291bnQsXG4gICAgb25saW5lQ291bnRDaGFuZ2U6IG9ubGluZUNvdW50Q2hhbmdlLFxuICAgIG9uTm90aWZpY2F0aW9uOiBvbk5vdGlmaWNhdGlvbixcbiAgICBlbmFibGVEZXNrdG9wTm90aWZpY2F0aW9uczogZGVza3RvcE5vdGlmaWNhdGlvbnMuZW5hYmxlRGVza3RvcE5vdGlmaWNhdGlvbnMsXG4gICAgZGlzYWJsZURlc2t0b3BOb3RpZmljYXRpb25zOiBkZXNrdG9wTm90aWZpY2F0aW9ucy5kaXNhYmxlRGVza3RvcE5vdGlmaWNhdGlvbnMsXG4gICAgZGVza3RvcE5vdGlmaWNhdGlvbjogZGVza3RvcE5vdGlmaWNhdGlvbnMuc2hvd0Rlc2t0b3BOb3RpZmljYXRpb24sXG4gICAgbWFya0FzUmVhZDogbWFya0FzUmVhZFxufTtcbiJdfQ==
