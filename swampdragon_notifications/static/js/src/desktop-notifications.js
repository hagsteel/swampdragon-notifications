var isEnabled = false;

function enableDesktopNotifications() {
    if (window.Notification === undefined) {
        isEnabled = false;
        return;
    }

    window.Notification.requestPermission(function (status) {
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

    if (window.Notification && window.Notification.permission === "granted") {
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
