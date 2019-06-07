var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fP1HlQ8ioWE:APA91bEOm8rQmdazIzViBrRhszuwhdUdGaH9ZIoGiiaTzI48xQn1HobCdVBeRtzYZAWhfJTKucVmdPVY_Va-qkd_fhsuGq8JtFwi7at_vE885CLTGX0LSNM-dsmZz_GPr4pa0W0LlhTB",
    "keys": {
        "p256dh": "BA053/oGuAHLHshD3gOGdjxDhF9UzmIZwzG2MTtm+lp4s+ZRqM+UdrAG4OkCjhcAVf3yKovb0SsYUBFuDbfp4yA=", 
        "auth": "qUsokgkE+gkKplgSdFImbg=="
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