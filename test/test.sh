#!/bin/bash

cp "/usr/share/zoneinfo/America/Los_Angeles" "/etc/localtime"
tz=$(node run.js)
echo "$tz"
if [[ "$tz" == "America/Los_Angeles" ]]
then
  echo "YES"
else
  echo "NO"
fi
