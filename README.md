# jsTimezoneDetect (jstz)

## Introduction

This is a small unintrusive JavaScript library that helps with detecting the [IANA zone info key][1] representing the time zone of a browser client.

The IANA timezone database is pretty much standard for most platforms (UNIX and Mac support it natively, and every programming language in the world either has native support or well maintained libraries that support it).

## Example Use

Include `jstz.min.js` in your HTML document. 

Invoke the script by calling

    :::javascript
        var tz = jstz.determine();
        console.log(tz.name()); 

[1]: http://www.iana.org/time-zone