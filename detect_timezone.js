/* 
 * Original script by Josh Fraser (http://www.onlineaspect.com)
 * Continued by Jon Nylander, (jon at pageloom dot com)
 * According to both of us, you are absolutely free to do whatever 
 * you want with this code.
 * 
 * This code is  maintained at bitbucket.org as jsTimezoneDetect.
 */

var HEMISPHERE_SOUTH = 'SOUTH';
var HEMISPHERE_NORTH = 'NORTH';
var HEMISPHERE_UNKNOWN = 'N/A';
var olson = {}

/**
 * The keys in this dictionary are comma separated as such:
 * 
 * First the offset compared to UTC time in minutes.
 *  
 * Then a flag which is 0 if the timezone does not take daylight savings into account and 1 if it does.
 * Thirdly an optional 's' signifies that the timezone is in the southern hemisphere, only interesting for timezones with DST.
 * 
 * The values of the dictionary are objects of either TimeZone.
 */
olson.timezones = {
	'-720,0'   : new TimeZone('-12:00','Etc/GMT+12', false),
	'-660,0'   : new TimeZone('-11:00','Pacific/Midway', false),
	'-660,1,s' : new TimeZone('-11:00','Pacific/Apia', true),
	'-600,0'   : new TimeZone('-10:00','Pacific/Honolulu', false),
	'-540,1'   : new TimeZone('-09:00','America/Anchorage', true),
	'-480,1'   : new TimeZone('-08:00','America/Vancouver', true),
	'-420,0'   : new TimeZone('-07:00','America/Phoenix', false),
	'-420,1'   : new TimeZone('-07:00','America/Denver', true),
	'-360,0'   : new TimeZone('-06:00','America/Regina', false),
	'-360,1'   : new TimeZone('-06:00','America/Chicago', true),
	'-300,0'   : new TimeZone('-05:00','America/Atikokan', false),
	'-300,1'   : new TimeZone('-05:00','America/Montreal', true),
	'-270,0'   : new TimeZone('-04:30','America/Caracas', false),
	'-240,1'   : new TimeZone('-04:00','America/Halifax', true),
	'-240,0'   : new TimeZone('-04:00','America/Manaus', false),
	'-240,1,s' : new TimeZone('-04:00','America/Asuncion', true),
	'-210,1'   : new TimeZone('-03:30','America/St_Johns', true),
	'-180,1'   : new TimeZone('-03:00','America/Godthab', true),
	'-180,0'   : new TimeZone('-03:00','America/Argentina/Buenos_Aires,', false),
	'-180,1,s' : new TimeZone('-03:00','America/Montevideo', true),
	'-120,0'   : new TimeZone('-02:00','America/Noronha', true),
	'-120,1'   : new TimeZone('-02:00','Etc/GMT+2', true),
	'-60,1'    : new TimeZone('-01:00','Atlantic/Azores', true),
	'-60,0'    : new TimeZone('-01:00','Atlantic/Cape_Verde', false),
	'0,0'      : new TimeZone('00:00','Atlantic/Reykjavik', false),
	'0,1'      : new TimeZone('00:00','Europe/Dublin', true),
	'60,1'     : new TimeZone('+01:00','Europe/Amsterdam', true),
	'60,0'     : new TimeZone('+01:00','Africa/Porto-Novo', false),
	'60,1,s'   : new TimeZone('-01:00','Africa/Windhoek',true),
	'120,1'    : new TimeZone('+02:00','Asia/Beirut', true),
	'120,0'    : new TimeZone('+02:00','Africa/Harare', false),
	'180,1'    : new TimeZone('+03:00','Europe/Moscow', true),
	'180,0'    : new TimeZone('+03:00','Asia/Baghdad', false),
	'210,1'    : new TimeZone('+03:30','Asia/Tehran', true),
	'240,0'    : new TimeZone('+04:00','Asia/Dubai', false),
	'240,1'    : new TimeZone('+04:00','Asia/Yerevan', true),
	'270,0'    : new TimeZone('+04:30','Asia/Kabul', false),
	'300,1'    : new TimeZone('+05:00','Asia/Yekaterinburg', true),
	'300,0'    : new TimeZone('+05:00','Asia/Karachi', false),
	'330,0'    : new TimeZone('+05:30','Asia/Kolkata', false),
	'345,0'    : new TimeZone('+05:45','Asia/Kathmandu', false),
	'360,0'    : new TimeZone('+06:00','Asia/Dhaka', false),
	'360,1'    : new TimeZone('+06:00','Asia/Novosibirsk', true),
	'390,0'    : new TimeZone('+06:30','Asia/Rangoon', false),
	'420,1'    : new TimeZone('+07:00','Asia/Krasnoyarsk', true),
	'420,0'    : new TimeZone('+07:00','Asia/Bangkok', false),
	'480,0'    : new TimeZone('+08:00','Asia/Shanghai', false),
	'480,1'    : new TimeZone('+08:00','Asia/Irkutsk', true),
	'525,1,s'  : new TimeZone('+08:45','Australia/Eucla', true),
	'540,1'    : new TimeZone('+09:00','Asia/Yakutsk', true),
	'540,0'    : new TimeZone('+09:00','Asia/Seoul', false),
	'570,0'    : new TimeZone('+09:30','Australia/Darwin', false),
	'570,1,s'  : new TimeZone('+09:30','Australia/Adelaide', true),
	'600,0'    : new TimeZone('+10:00','Australia/Brisbane', false),
	'600,1'	   : new TimeZone('+10:00','Asia/Vladivostok', true),
	'600,1,s'  : new TimeZone('+10:00','Australia/Melbourne', true),
	'660,1'    : new TimeZone('+11:00','Asia/Magadan', true),
	'660,0'    : new TimeZone('+11:00','Pacific/Pohnpei', false),
	'720,1,s'  : new TimeZone('+12:00','Pacific/Auckland', true),
	'720,0'    : new TimeZone('+12:00','Pacific/Wake', false),
	'765,1,s'  : new TimeZone('+12:45','Pacific/Chatham', true),
	'780,0'    : new TimeZone('+13:00','Pacific/Tongatapu', false)		
}

/**
 * This object contains information on when daylight savings starts for
 * different timezones.
 * 
 * The list is short for a reason. Often we do not have to be very specific
 * to single out the correct timezone. But when we do, this list comes in
 * handy.
 * 
 * Each value is a date denoting when daylight savings starts for that timezone.
 */
olson.dst_start_dates = {
	'America/Denver' : new Date(2011, 2, 13, 3, 0, 0, 0),
	'America/Chihuahua' : new Date(2011, 3, 3, 3, 0, 0, 0),
	'America/Chicago' : new Date(2011, 2, 13, 3, 0, 0, 0),
	'America/Mexico_City' : new Date(2011, 3, 3, 3, 0, 0, 0),
	'America/Asuncion' : new Date(2011, 9, 2, 3, 0, 0, 0),
	'America/Santiago' : new Date(2011, 9, 9, 3, 0, 0, 0),
	'America/Cuiaba' : new Date(2011, 9, 16, 5, 0, 0, 0),
	'America/Montevideo' : new Date(2011, 9, 2, 2, 0, 0, 0),
	'America/Sao_Paolo' : new Date(2011, 9, 16, 5, 0, 0, 0),
	'Asia/Beirut' : new Date(2011, 2, 27, 4, 0, 0, 0),
	'Europe/Minsk' : new Date(2011, 2, 27, 6, 0, 0, 0),
	'Europe/Helsinki' : new Date(2011, 2, 27, 7, 0, 0, 0),
	'Asia/Amman' : new Date(2011, 3, 1, 4, 0, 0, 0),
	'Asia/Jerusalem' : new Date(2011, 3, 1, 6, 0, 0, 0),
	'Africa/Cairo' : new Date(2011, 3, 29, 4, 0, 0, 0),
	'Asia/Yerevan' : new Date(2011, 2, 27, 8, 0, 0, 0),
	'Asia/Baku'    : new Date(2011, 2, 27, 10, 0, 0, 0),
	'Pacific/Auckland' : new Date(2011, 8, 26, 7, 0, 0, 0),
	'Pacific/Fiji' : new Date(2010, 11, 29, 23, 0, 0, 0)
}

/**
 * The keys in this object are timezones that we know may be ambiguous after
 * a preliminary scan through the olson_tz object.
 * 
 * The array of timezones to compare must be in the order that daylight savings
 * starts for the regions.
 */
olson.ambiguity_list = {
	'America/Denver' : ['America/Denver','America/Chihuahua'],
	'America/Chicago' : ['America/Chicago','America/Mexico_City'],
	'America/Asuncion' : ['America/Asuncion', 'America/Santiago','America/Cuiaba'],
	'America/Montevideo' : ['America/Montevideo', 'America/Sao_Paolo'],
	'Asia/Beirut' : ['Asia/Beirut', 'Europe/Minsk', 'Europe/Helsinki', 'Asia/Amman', 'Asia/Jerusalem','Africa/Cairo'],
	'Asia/Yerevan' : ['Asia/Yerevan', 'Asia/Baku'],
	'Pacific/Auckland' : ['Pacific/Auckland', 'Pacific/Fiji']
}

/**
 * A simple object containing information of utc_offset, which olson timezone key to use, 
 * and if the timezone cares about daylight savings or not.
 * 
 * @constructor
 * @param {string} offset - for example '-11:00'
 * @param {string} olson_tz - the olson Identifier, such as "America/Denver"
 * @param {boolean} uses_dst - flag for whether the time zone somehow cares about daylight savings.
 */
function TimeZone(offset, olson_tz, uses_dst) {
	this.utc_offset = offset;
	this.olson_tz = olson_tz;
	this.uses_dst = uses_dst;
}

/**
 * Prints out the result.
 * But before it does that, it calls this.ambiguity_check.
 */
TimeZone.prototype.display = function() {
	this.ambiguity_check();
	var response_text = '<b>UTC-offset</b>: ' + this.utc_offset + '<br/>';
	response_text += '<b>Olson database name</b>: ' + this.olson_tz + '<br/>';
	response_text += '<b>Daylight Savings</b>: ' + (this.uses_dst ? 'yes' : 'no') + '<br>'
	
	return response_text;
}

/**
 * Checks if a timezone has possible ambiguities. I.e timezones that are similar.
 * 
 * If the preliminary scan determines that we're in America/Denver. We double check
 * here that we're really there and not in America/Chihuahua.
 * 
 * This is done by checking known dates for when daylight savings start for different
 * timezones.
 */
TimeZone.prototype.ambiguity_check = function() {
	var local_ambiguity_list = olson.ambiguity_list[this.olson_tz];
	
	if (typeof(local_ambiguity_list) == 'undefined') {
		return;
	}
	
	var length = local_ambiguity_list.length;
	
	for (var i = 0; i < length; i++) {
		var tz = local_ambiguity_list[i]
		
		if (date_is_dst(olson.dst_start_dates[tz])) {
			this.olson_tz = tz;
			return;
		}	
	}
}

/**
 * Checks whether a given date is in daylight savings time.
 * 
 * If the date supplied is after june, we assume that we're checking
 * for southern hemisphere DST.
 * 
 * @param {Date} date
 * @returns {boolean}
 */
function date_is_dst(date) {
	var base_offset = ( (date.getMonth() > 5 ? get_june_offset() : get_january_offset()) )
	
	var date_offset = get_date_offset(date);
	
	return (base_offset - date_offset) != 0;
}

/** 
 * Gets the offset in minutes from UTC for a certain date.
 * 
 * @param date
 * @returns {number}
 */
function get_date_offset(date) {
	var gmt_version = date.toGMTString();

	gmt_version = gmt_version.substring(0, gmt_version.lastIndexOf(" ")); 

	var date2 = new Date(gmt_version);

	return -date2.getTimezoneOffset();
}

/**
 * This function does some basic calculations to create information about 
 * the user's timezone.
 * 
 * Returns a primitive object on the format
 * {'utc_offset' : -9, 'dst': 1, hemisphere' : 'north'}
 * where dst is 1 if the region uses daylight savings.
 * 
 * @returns {Object}  
 */
function get_timezone_info() {
	var january_offset = get_january_offset();
	var june_offset = get_june_offset();
	  
	var diff = january_offset - june_offset;

	if (diff < 0) {
	    return {'utc_offset' : january_offset,
	    		'dst':	1,
	    		'hemisphere' : HEMISPHERE_NORTH}
	}
	else if (diff > 0) {
        return {'utc_offset' : june_offset,
        		'dst' : 1,
        		'hemisphere' : HEMISPHERE_SOUTH}
	}

    return {'utc_offset' : january_offset, 
    		'dst': 0, 
    		'hemisphere' : HEMISPHERE_UNKNOWN}
}

function get_january_offset() {
	return get_date_offset(new Date(2011, 0, 1, 0, 0, 0, 0));
}

function get_june_offset() {
	return get_date_offset(new Date(2011, 5, 1, 0, 0, 0, 0));
}

/**
 * Uses get_timezone_info() to formulate a key to use in the olson.timezones dictionary.
 * 
 * Returns a primitive object on the format:
 * {'timezone': TimeZone, 'key' : 'the key used to find the TimeZone object'}
 * 
 * @returns Object 
 */
function determine_timezone() {
	var timezone_key_info = get_timezone_info();
	
	var hemisphere_suffix = ''
		
	if (timezone_key_info.hemisphere == HEMISPHERE_SOUTH) {
		hemisphere_suffix = ',s';
	}
	
	var tz_key = timezone_key_info.utc_offset + ',' + timezone_key_info.dst + hemisphere_suffix
	
	return {'timezone' : olson.timezones[tz_key], 'key' : tz_key}
}

/**
 * This is the entry point of the application.
 */
function show_timezone_info() {
	var tz_info = determine_timezone();
	
	response_text = 'No timezone found for ' + tz_info.key;
	
	if (typeof(tz_info.timezone) == 'undefined') {
		response_text = 'No timezone found for ' + tz_info.key;
	}
	else {
		response_text = tz_info.timezone.display(); 
	}
	
	document.getElementById('tz_info').innerHTML = response_text
}

onload = show_timezone_info;