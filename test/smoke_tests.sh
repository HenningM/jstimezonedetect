#!/bin/bash

# This file is basically the documenation of the timezones that jstz
# can successfully detect. Exluding the ambigous DST zones.
#
# Goes through all basic timezones (not ambiguated) and checks that they 
# evaluate correctly. Take note that all russian timezones are excluded 
# (even though they still exist in jstz.js to be compliant with computers
# that have not been updated).
#
# Evaluates jstz.js by running it through node.js after having manually changed
# the timezone of the system by copying the timezone to /etc/localtime.
#

timezones=('Pacific/Pago_Pago'
'America/Adak'
'Pacific/Honolulu'
'Pacific/Marquesas'
'Pacific/Gambier'
'America/Anchorage'
'America/Los_Angeles'
'Pacific/Pitcairn'
'America/Phoenix'
'America/Denver'
'America/Guatemala'
'America/Chicago'
'Pacific/Easter'
'America/Bogota'
'America/New_York'
'America/Caracas'
'America/Halifax'
'America/Santo_Domingo'
'America/Santiago'
'America/St_Johns'
'America/Godthab'
'America/Argentina/Buenos_Aires'
'America/Montevideo'
'America/Noronha'
'Atlantic/Azores'
'Atlantic/Cape_Verde'
'UTC'
'Europe/London'
'Europe/Berlin'
'Africa/Lagos'
'Africa/Windhoek'
'Asia/Beirut'
'Africa/Johannesburg'
'Asia/Baghdad'
'Asia/Tehran'
'Asia/Dubai'
'Asia/Baku'
'Asia/Kabul'
'Asia/Karachi'
'Asia/Kolkata'
'Asia/Kathmandu'
'Asia/Dhaka'
'Asia/Rangoon'
'Asia/Jakarta'
'Asia/Shanghai'
'Australia/Eucla'
'Asia/Tokyo'
'Australia/Darwin'
'Australia/Adelaide'
'Australia/Brisbane'
'Australia/Sydney'
'Pacific/Noumea'
'Pacific/Norfolk'
'Pacific/Auckland'
'Pacific/Tarawa'
'Pacific/Chatham'
'Pacific/Tongatapu'
'Pacific/Apia'
'Pacific/Kiritimati')

ambigous_zones=('America/Mazatlan'
'America/Mexico_City'
'America/Asuncion'
'America/Campo_Grande'
'America/Sao_Paulo'
'Asia/Gaza'
'Europe/Helsinki'
'Asia/Damascus'
'Asia/Jerusalem'
'Pacific/Fiji'
'America/Santa_Isabel'
'America/Havana'
'America/Goose_Bay'
'America/Miquelon'
'Europe/Moscow'
'Asia/Yekaterinburg'
'Asia/Omsk'
'Asia/Krasnoyarsk'
'Asia/Irkutsk'
'Asia/Yakutsk'
'Asia/Vladivostok'
'Asia/Kamchatka'
'Europe/Minsk'
'Australia/Perth')

failure_count=0
for tz in "${timezones[@]}"
do
  cp "/usr/share/zoneinfo/$tz" "/etc/localtime"
  test_result=$(node run.js)
  if [[ "$test_result" != "$tz" ]] 
  then
    echo "Failure: $tz wrongly evaluates to $test_result."
    failure_count=$((failure_count + 1))
  fi
done

for tz in "${ambigous_zones[@]}"
do
  cp "/usr/share/zoneinfo/$tz" "/etc/localtime"
  test_result=$(node run.js)
  if [[ "$test_result" != "$tz" ]]
  then
  	echo "Failure: $tz wrongly evaluates to $test_result."
  	failure_count=$((failure_count +1))
  fi
done
echo "$failure_count failures"
