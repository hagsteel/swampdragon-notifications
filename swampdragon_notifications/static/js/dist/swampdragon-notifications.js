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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXNrdG9wLW5vdGlmaWNhdGlvbnMuanMiLCJzd2FtcGRyYWdvbi1ub3RpZmljYXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgaXNFbmFibGVkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGVuYWJsZURlc2t0b3BOb3RpZmljYXRpb25zKCkge1xuICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiAoc3RhdHVzKSB7XG4gICAgICAgIGlzRW5hYmxlZCA9IHN0YXR1cyA9PT0gXCJncmFudGVkXCI7XG4gICAgfSk7XG59XG5cblxuZnVuY3Rpb24gZGlzYWJsZURlc2t0b3BOb3RpZmljYXRpb25zKCkge1xuICAgIGlzRW5hYmxlZCA9IGZhbHNlO1xufVxuXG5cbmZ1bmN0aW9uIHNob3dEZXNrdG9wTm90aWZpY2F0aW9uKHRpdGxlLCBhcmdzLCBvbkNsaWNrKSB7XG4gICAgaWYgKGlzRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuOyAvLyBEZXNrdG9wIG5vdGlmaWNhdGlvbnMgYXJlIGRpc2FibGVkLCBkbyBub3RoaW5nXG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5Ob3RpZmljYXRpb24gJiYgTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09IFwiZ3JhbnRlZFwiKSB7XG4gICAgICAgIHZhciBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKHRpdGxlLCBhcmdzKTtcbiAgICAgICAgaWYgKG9uQ2xpY2spIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5vbmNsaWNrID0gb25DbGlja1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlbmFibGVEZXNrdG9wTm90aWZpY2F0aW9uczogZW5hYmxlRGVza3RvcE5vdGlmaWNhdGlvbnMsXG4gICAgZGlzYWJsZURlc2t0b3BOb3RpZmljYXRpb25zOiBkaXNhYmxlRGVza3RvcE5vdGlmaWNhdGlvbnMsXG4gICAgc2hvd0Rlc2t0b3BOb3RpZmljYXRpb246IHNob3dEZXNrdG9wTm90aWZpY2F0aW9uXG59O1xuIiwidmFyIGRlc2t0b3BOb3RpZmljYXRpb25zID0gcmVxdWlyZSgnLi9kZXNrdG9wLW5vdGlmaWNhdGlvbnMnKTtcblxudmFyIG9ubGluZUNvdW50Q2hhbmdlQ2FsbGJhY2tzID0gW107XG52YXIgbm90aWZpY2F0aW9uQ2FsbGJhY2tzID0gW107XG5cblxuc3dhbXBkcmFnb24ucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHN3YW1wZHJhZ29uLnN1YnNjcmliZSgnc3dhbXBkcmFnb24tbm90aWZpY2F0aW9ucycsICdub3RpZmljYXRpb25zJywge30sIGZ1bmN0aW9uICgpIHsgfSk7XG4gICAgc3dhbXBkcmFnb24uc3Vic2NyaWJlKCdzd2FtcGRyYWdvbi1vbmxpbmUnLCAndXNlcnMtb25saW5lJywge30sIGZ1bmN0aW9uICgpIHsgfSk7XG59KTtcblxuXG5zd2FtcGRyYWdvbi5vbkNoYW5uZWxNZXNzYWdlKGZ1bmN0aW9uIChjaGFubmVscywgbWVzc2FnZSwgZGF0YSkge1xuICAgIHZhciBjaGFubmVsID0gbnVsbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5uZWxzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNoYW5uZWwgPSBjaGFubmVsc1tpXTtcbiAgICAgICAgaWYgKGNoYW5uZWwgPT09IFwidXNlcnMtb25saW5lXCIpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb25saW5lQ291bnRDaGFuZ2VDYWxsYmFja3MubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICBvbmxpbmVDb3VudENoYW5nZUNhbGxiYWNrc1tqXShtZXNzYWdlLmRhdGEudXNlcnNfb25saW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFubmVsID09PSBcIm5vdGlmaWNhdGlvbnNcIikge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBub3RpZmljYXRpb25DYWxsYmFja3MubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb25DYWxsYmFja3Nbal0obWVzc2FnZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbmZ1bmN0aW9uIG9ubGluZUNvdW50KGZuKSB7XG4gICAgc3dhbXBkcmFnb24ucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2FtcGRyYWdvbi5jYWxsUm91dGVyKCdnZXRfb25saW5lX2NvdW50JywgJ3N3YW1wZHJhZ29uLW9ubGluZScsIHt9LCBmdW5jdGlvbiAoY29udGV4dCwgZGF0YSkge1xuICAgICAgICAgICAgZm4oZGF0YS5vbmxpbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuXG5mdW5jdGlvbiBtYXJrQXNSZWFkKG5vdGlmaWNhdGlvbiwgZm4pIHtcbiAgICBzd2FtcGRyYWdvbi5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3YW1wZHJhZ29uLmNhbGxSb3V0ZXIoJ21hcmtfcmVhZCcsICdzd2FtcGRyYWdvbi1ub3RpZmljYXRpb25zJywge25vdGlmaWNhdGlvbl9pZDpub3RpZmljYXRpb24uaWR9LCBmdW5jdGlvbiAoY29udGV4dCwgZGF0YSkge1xuICAgICAgICAgICAgZm4obm90aWZpY2F0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn1cblxuXG5mdW5jdGlvbiBvbk5vdGlmaWNhdGlvbihmbikge1xuICAgIG5vdGlmaWNhdGlvbkNhbGxiYWNrcy5wdXNoKGZuKTtcbn1cblxuXG5mdW5jdGlvbiBvbmxpbmVDb3VudENoYW5nZShmbikge1xuICAgIG9ubGluZUNvdW50Q2hhbmdlQ2FsbGJhY2tzLnB1c2goZm4pO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG9ubGluZUNvdW50OiBvbmxpbmVDb3VudCxcbiAgICBvbmxpbmVDb3VudENoYW5nZTogb25saW5lQ291bnRDaGFuZ2UsXG4gICAgb25Ob3RpZmljYXRpb246IG9uTm90aWZpY2F0aW9uLFxuICAgIGVuYWJsZURlc2t0b3BOb3RpZmljYXRpb25zOiBkZXNrdG9wTm90aWZpY2F0aW9ucy5lbmFibGVEZXNrdG9wTm90aWZpY2F0aW9ucyxcbiAgICBkaXNhYmxlRGVza3RvcE5vdGlmaWNhdGlvbnM6IGRlc2t0b3BOb3RpZmljYXRpb25zLmRpc2FibGVEZXNrdG9wTm90aWZpY2F0aW9ucyxcbiAgICBkZXNrdG9wTm90aWZpY2F0aW9uOiBkZXNrdG9wTm90aWZpY2F0aW9ucy5zaG93RGVza3RvcE5vdGlmaWNhdGlvbixcbiAgICBtYXJrQXNSZWFkOiBtYXJrQXNSZWFkXG59O1xuIl19
