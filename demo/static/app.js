/**********************************
 * Notifications and online users
 **********************************/
notifications.onlineCount(function (count) {
    setUserCount(count);
});


notifications.onlineCountChange(function (count) {
    setUserCount(count);
});


function setUserCount(count) {
    document.getElementById("users-online").innerHTML = count;
}


notifications.onNotification(addNotification);

/**********************************
 * Wire up page events etc.
 **********************************/
document.getElementById("notify").addEventListener("click", function () {
    swampdragon.callRouter('notify_everyone_but_me', 'notifier', {name: 'foo'}, function () {

    })
});

document.getElementById("notify-all").addEventListener("click", function () {
    swampdragon.callRouter('notify_everyone', 'notifier', {name: 'foo'}, function () {

    })
});

document.getElementById("enable-desktop-notifications").addEventListener("change", function (e) {
    if (e.target.checked) {
        notifications.enableDesktopNotifications();
    } else {
        notifications.disableDesktopNotifications();
    }
});


function addNotification(notification) {
    var li = document.createElement("li");
    li.innerHTML = notification.name + ' - ' + notification.timestamp;
    var notificationsList = document.getElementById("notifications");
    notificationsList.insertBefore(li, notificationsList.firstChild);

    notifications.desktopNotification('New foo', {body:notification.name, icon: notification.icon, tag: 'foo'});
}