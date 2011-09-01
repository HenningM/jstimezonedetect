# How do I use jsTimezoneDetect?

Include the latest minified version on a web page, then:

    var settings = {
        blocking : true,
        geoloc : false,
        ip : false,
        callback : function(timezone) {
            timezone.name(); // "Europe/Berlin"
            timezone.dst(); // true
            timezone.offset(); // 60 (minutes)
        }
    };

    jstz.determine(settings); // Starting point

# What does it do?

## 1
The script uses JavaScript to give you an Olson timezone key which represents the timezone setting of the user's computer

## 2
Optionally, it uses IP and/or geolocation to improve the precision of the timezone detected in step 1. IP and geolocation detection results have lower priority than step 1 (the client's computer setting should always win).

# How do I test this script?
To test the detection script, simply change your system timezone and refresh this page. In some browsers you will have to open a new tab, or even restart for a new timezone to take effect.

# Bugs, suggestions and praise...
...happily received by @pellepim at Bitbucket.org.

jsTimezoneDetect is open source, so feel free to contribute.

Thanks!