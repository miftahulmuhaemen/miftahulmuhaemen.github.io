var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/ca3Pduglj0Y:APA91bEHsSa5ChyIxi5Lt1CVQQAGsTCfYXlJ4HXBPTX82VH5vWuI3gAA0iDO0l9kjk9JoWG8jtsevis78_WtrVY9gtcfWdFRjbFi5bAGcyGS9ZtfqP333I3vWIpgvaMkIUjoZ9ytaiRp",
    "keys": {
        "p256dh": "BJII9BgfSsG0zl3wo+9HJROnUIiSrGnPOmTraO+6bDL+BRZse/+SB1rPrigkF7uPjPOFCSQxGgXyD3B9WxOZXcQ=", 
        "auth": "7jnhBlVwp3JuemFouWGtUA=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AAAAqmSWCQk:APA91bF376a16XQk3PnqQdkhYZCEx8XKbnIZpRuagfwddf8yrB6Tz4a1Do8DrbTFEcQGcuKcWOYHp8RQ6gpuu-4JZRbKgfSRtctNtGoqz3hEYAegKm1pCLFutwft-jRL3pdxMhdbvswb',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);