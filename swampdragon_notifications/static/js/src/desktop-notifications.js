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
