/* Original script by Josh Fraser (http://www.onlineaspect.com)
   Continued by Jon Nylander jon at pageloom.com
   According to both of us, you are absolutely free to do whatever you want with this code*/

/**
 * The keys in this dictionary are comma separated as such:
 * First the offset compared to UTC time. For example -09:00 or +01:00 
 * Then a flag which is 0 if the timezone does not take daylight savings into account and 1 if it does.
 * Thirdly an optional 's' signifies that the timezone is in the southern hemisphere, only interesting for timezones with DST.
 * 
 * The values of the dictionary are objects of either TimeZone or NonOlsenTimeZone.
 */
var olsen_tz = {
	'-12:00,0'   : new NonOlsenTimeZone('-12:00','International Datetime West', false),
	'-11:00,0'   : new TimeZone('-11:00','Pacific/Midway', false),
	'-11:00,1,s'   : new TimeZone('-11:00','Pacific/Apia', true),
	'-10:00,0'   : new TimeZone('-10:00','Pacific/Honolulu', false),
	'-09:00,1'   : new TimeZone('-09:00','America/Anchorage', true),
	'-08:00,1'   : new TimeZone('-08:00','America/Vancouver', true),
	'-07:00,0'   : new TimeZone('-07:00','America/Phoenix', false),
	'-07:00,1'   : new TimeZone('-07:00','America/Denver', true),
	'-06:00,0'   : new TimeZone('-06:00','America/Regina', false),
	'-06:00,1'   : new TimeZone('-06:00','America/Chicago', true),
	'-05:00,0'   : new TimeZone('-05:00','America/Atikokan', false),
	'-05:00,1'   : new TimeZone('-05:00','America/Montreal', true),
	'-04:30,0'   : new TimeZone('-04:30','America/Caracas', false),
	'-04:00,1'   : new TimeZone('-04:00','America/Halifax', true),
	'-04:00,0'   : new TimeZone('-04:00','America/Manaus', false),
	'-04:00,1,s' : new TimeZone('-04:00','America/Asuncion', true),
	'-03:30,1'   : new TimeZone('-03:30','America/St_Johns', true),
	'-03:00,1'   : new TimeZone('-03:00','America/Godthab', true),
	'-03:00,0'   : new TimeZone('-03:00','America/Argentina/Buenos_Aires,', false),
	'-03:00,1,s' : new TimeZone('-03:00','America/Montevideo', true),
	'-02:00,0'   : new TimeZone('-02:00','America/Noronha', true),
	'-02:00,1'   : new NonOlsenTimeZone('-02:00', 'Mid Atlantic', true),
	'-01:00,1'   : new TimeZone('-01:00','Atlantic/Azores', true),
	'-01:00,0'   : new TimeZone('-01:00','Atlantic/Cape_Verde', false),
	'00:00,0'    : new TimeZone('00:00','Atlantic/Reykjavik', false),
	'00:00,1'    : new TimeZone('00:00','Europe/Dublin', true),
	'+01:00,1'   : new TimeZone('+01:00','Europe/Amsterdam', true),
	'+01:00,0'   : new TimeZone('+01:00','Africa/Porto-Novo', false),
	'+01:00,1,s' : new TimeZone('-01:00','Africa/Windhoek',true),
	'+02:00,1'   : new TimeZone('+02:00','Asia/Beirut', true),
	'+02:00,0'   : new TimeZone('+02:00','Africa/Harare', false),
	'+03:00,1'   : new TimeZone('+03:00','Europe/Moscow', true),
	'+03:00,0'   : new TimeZone('+03:00','Asia/Baghdad', false),
	'+03:30,1'   : new TimeZone('+03:30','Asia/Tehran', true),
	'+04:00,0'   : new TimeZone('+04:00','Asia/Dubai', false),
	'+04:00,1'   : new TimeZone('+04:00','Asia/Yerevan', true),
	'+04:30,0'   : new TimeZone('+04:30','Asia/Kabul', false),
	'+05:00,1'   : new TimeZone('+05:00','Asia/Yekaterinburg', true),
	'+05:00,0'   : new TimeZone('+05:00','Asia/Karachi', false),
	'+05:30,0'   : new TimeZone('+05:30','Asia/Kolkata', false),
	'+05:45,0'   : new TimeZone('+05:45','Asia/Kathmandu', false),
	'+06:00,0'   : new TimeZone('+06:00','Asia/Dhaka', false),
	'+06:00,1'   : new TimeZone('+06:00','Asia/Novosibirsk', true),
	'+06:00,1,s' : new TimeZone('+06:00','Asia/Dhaka', false),
	'+06:30,0'   : new TimeZone('+06:30','Asia/Rangoon', false),
	'+07:00,1'   : new TimeZone('+07:00','Asia/Krasnoyarsk', true),
	'+07:00,0'   : new TimeZone('+07:00','Asia/Bangkok', false),
	'+08:00,0'   : new TimeZone('+08:00','Asia/Shanghai', false),
	'+08:00,1'   : new TimeZone('+08:00','Asia/Irkutsk', true),
	'+09:00,1'   : new TimeZone('+09:00','Asia/Yakutsk', true),
	'+09:00,0'   : new TimeZone('+09:00','Asia/Seoul', false),
	'+09:30,0'   : new TimeZone('+09:30','Australia/Darwin', false),
	'+09:30,1,s' : new TimeZone('+09:30','Australia/Adelaide', true),
	'+10:00,0'   : new TimeZone('+10:00','Australia/Brisbane', false),
	'+10:00,1'	 : new TimeZone('+10:00','Asia/Vladivostok', true),
	'+10:00,1,s' : new TimeZone('+10:00','Australia/Melbourne', true),
	'+11:00,1'   : new TimeZone('+11:00','Asia/Magadan Magadan, New Caledonia', true),
	'+11:00,0'   : new TimeZone('+11:00','Pacific/Ponape', false),
	'+12:00,1,s' : new TimeZone('+12:00','Pacific/Auckland', true),
	'+12:00,0'   : new TimeZone('+12:00','Pacific/Fiji', false),
	'+13:00,0'   : new TimeZone('+13:00','Pacific/Tongatapu', false)		
}

/**
 * This object contains information on when daylight savings starts for
 * different timezones.
 * 
 * The list is short for a reason. Often we do not have to be very specific
 * to single out the correct timezone. But when we do, this list comes in
 * handy.
 * 
 * Each value is an array which starts with either 's' or 'n' denoting whether
 * the timezone is in the northern or southern hemisphere. And then a date
 * used to check for whether daylight savings has started.
 */
var dst_comparators = {
		'America/Denver' : ['n', new Date(2011, 2, 13, 3, 0, 0, 0)],
		'America/Chihuahua' : ['n', new Date(2011, 3, 3, 3, 0, 0, 0)],
		'America/Chicago' : ['n', new Date(2011, 2, 13, 3, 0, 0, 0)],
		'America/Mexico_City' : ['n', new Date(2011, 3, 3, 3, 0, 0, 0)],
		'America/Asuncion' : ['s', new Date(2011, 9, 2, 3, 0, 0, 0)],
		'America/Santiago' : ['s', new Date(2011, 9, 9, 3, 0, 0, 0)],
		'America/Cuiaba' : ['s', new Date(2011, 9, 16, 5, 0, 0, 0)],
		'America/Montevideo' : ['s', new Date(2011, 9, 2, 2, 0, 0, 0)],
		'America/Sao_Paolo' : ['s', new Date(2011, 9, 16, 5, 0, 0, 0)],
		'Europe/Minsk' : ['n', new Date(2011, 2, 27, 5, 0, 0, 0)],
		'Europe/Helsinki' : ['n', new Date(2011, 2, 27, 7, 0, 0, 0)],
		'Asia/Beirut' : ['n', new Date(2011, 2, 27, 13, 0, 0, 0)],
		'Asia/Amman' : ['n', new Date(2011, 3, 1, 3, 0, 0, 0)],
		'Asia/Jerusalem' : ['n', new Date(2011, 3, 1, 23, 0, 0, 0)],
		'Africa/Cairo' : ['n', new Date(2011, 3, 29, 5, 0, 0, 0)],
		'Asia/Yerevan' : ['n', new Date(2011, 2, 27, 4, 0, 0, 0)],
		'Asia/Baku'    : ['n', new Date(2011, 2, 27, 9, 0, 0, 0)],
		'Pacific/Auckland' : ['s', new Date(2011, 8, 26, 7, 0, 0, 0)],
		'Pacific/Fiji' : ['s', new Date(2010, 11, 29, 23, 0, 0, 0)]
}

/**
 * The keys in this object are timezones that we know may be ambiguous after
 * a preliminary scan through the olsen_tz object.
 * 
 * The values are timezones to compare with as to when daylight savings time
 * starts more specifically, to be able to single out a more exact timezone
 * then the one represented by the key.
 * 
 * The array of timezones to compare must be in the order that daylight savings
 * starts for the region.
 */
var olsen_ambiguity = {
		'America/Denver' : ['America/Denver','America/Chihuahua'],
		'America/Chicago' : ['America/Chicago','America/Mexico_City'],
		'America/Asuncion' : ['America/Asuncion', 'America/Santiago','America/Cuiaba'],
		'America/Montevideo' : ['America/Montevideo', 'America/Sao_Paolo'],
		'Asia/Beirut' : ['Europe/Minsk', 'Europe/Helsinki', 'Asia/Beirut', 'Asia/Amman', 'Asia/Jerusalem','Africa/Cairo'],
		'Asia/Yerevan' : ['Asia/Yerevan', 'Asia/Baku'],
		'Pacific/Auckland' : ['Pacific/Auckland', 'Pacific/Fiji']
}

/**
 * A simple object containing information of utc_offset, which olsen timezon key to use, 
 * and if the timezone cares about daylight savings or not.
 * 
 *  @param {String} offset - for example '-11:00'
 *  @param {String} olsen_tz - the olsen Identifier, such as "America/Denver"
 *  @param {Boolean} uses_dst - flag for whether the time zone somehow cares about daylight savings.
 */
function TimeZone(offset, olsen_tz, uses_dst) {
	this.utc_offset = offset;
	this.olsen_tz = olsen_tz;
	this.uses_dst = uses_dst;
}

/**
 * Prints out the result.
 * But before it does that, it calls this.ambiguity_check.
 */
TimeZone.prototype.display = function() {
	this.ambiguity_check();
	var response_text = '<b>UTC-offset</b>: ' + this.utc_offset + '<br/>';
	response_text += '<b>Olsen database name</b>: ' + this.olsen_tz + '<br/>';
	response_text += '<b>Daylight Savings</b>: ' + (this.uses_dst ? 'yes' : 'no') + '<br>'
	
	return response_text;
}

/**
 * First checks whether there is any chance that the timezone in question
 * has similar counterparts. (I.e timezones which are in the same hemisphere, and
 * use daylight savings, but start they're daylight savings on different dates).
 * 
 * If we have a timezone which may in fact be ambigous, such as 'America/Denver',
 * we check the date specified for 'America/Denver' in the dst_comparators object.
 * If that date turns out to NOT be daylight savings time, we check the next possible
 * time zone, namely 'America/Chihuahua' and its specified daylight davings start date.
 * If the dst_comparators date for 'America/Chihuahua' resolves to DST - we switch.
 */
TimeZone.prototype.ambiguity_check = function() {
	if (typeof(olsen_ambiguity[this.olsen_tz]) == 'undefined') {
		return;
	} 
	
	var local_ambiguity_list = olsen_ambiguity[this.olsen_tz];
	var length = local_ambiguity_list.length
	
	for (var i = 0; i < length; i++) {
		var tz = local_ambiguity_list[i]
		var north = (dst_comparators[tz][0]) == 'n' ? true : false;
		
		if (north) {
			if (date_is_northern_dst(dst_comparators[tz][1])) {
				this.olsen_tz = tz;
				return;
			} 
		}
		else {
			if (date_is_south_dst(dst_comparators[tz][1])) {
				this.olsen_tz = tz;
				return;
			}
		}
			
	}
}

/**
 * This function checks daylight savings for the northern hemisphere.
 * 
 * It takes any given date as a parameter and checks its offset to UTC time.
 * Then it takes a date in january and checks its offset to UTC time.
 * 
 * If these two offsets are different from each other, we have a timezone
 * in the northern hemisphere that uses daylight savings.
 */
function date_is_northern_dst(date) {
	var temp = date.toGMTString();
	var second_date = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
	var daylight_time_offset = (date - second_date) / (1000 * 60 * 60);
	
	var jan1 = new Date(2011, 0, 1, 0, 0, 0, 0);  // jan 1st 
	temp = jan1.toGMTString();
	var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
	var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
	
	if (std_time_offset == daylight_time_offset) {
	    return false;
	} 
	
	return true;
}

/**
 * This function does some basic calculations to create information about 
 * the user's timezone.
 * 
 * Basically it checks UTC offsets for both january and june. If they differ
 * we know that the timezone uses daylight savings. If it uses daylight savings
 * we also find out if the timezone is in the northern or southern hemisphere.
 * 
 * If the timezone does not use DST we do not find out whether it is to the north
 * or south, but that doesn't really matter. If the timezone skips DST we can simply
 * map to a year-round consistent time.
 * 
 * This algorithm is often enough to single out the appropriate timezone. But there are
 * ambiguos timezones and that is handled later with the help of the olsen_ambiguity object
 * and the dst_comparators object.
 * 
 * Finally we return an object with an the following attributes
 *    # offset - is a string on the format '+/-HH:MM'
 *    # south_hemisphere - boolean which is true if the timezone uses DST and is to the south
 *    # dst : a string which is "0" if DST is not observed, and "1" if DST is observed.
 *    
 * These three elements can then be used to create a key to be used with the olsen_tz object.
 * This is done in the function calculate_timezone. 
 */
function basic_timezone_info() {
	var jan1 = new Date(2011, 0, 1, 0, 0, 0, 0);  // jan 1st
	var june1 = new Date(2011, 6, 1, 0, 0, 0, 0); // june 1st
	var temp = jan1.toGMTString();
	var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
	temp = june1.toGMTString();
	var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
	var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
	var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
	var dst;
	
	var south_hemisphere = false; 
	
	if (std_time_offset == daylight_time_offset) {
		dst = "0"; // daylight savings time is NOT observed
	} else {
		// positive is southern, negative is northern hemisphere
		south_hemisphere = (std_time_offset - daylight_time_offset >= 0 ? true : false);
		
		if (south_hemisphere >= 0) {
			std_time_offset = daylight_time_offset;
		}
		
		dst = "1"; // daylight savings time is observed
		
	}
	
	return {'offset' : convert(std_time_offset), 'south_hemisphere' : south_hemisphere, 'dst' : dst}
}

/**
 * This function checks daylight savings for the southern hemisphere.
 * 
 * It takes any given date as a parameter and checks its offset to UTC time.
 * Then it takes a date in june and checks its offset to UTC time.
 * 
 * If these two offsets are different from each other, we have a timezone
 * in the southern hemisphere that uses daylight savings.
 */
function date_is_south_dst(date) {
	var temp = date.toGMTString();
	var second_date = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
	var daylight_time_offset = (date - second_date) / (1000 * 60 * 60);
	var jun1 = new Date(2011, 5, 1, 0, 0, 0, 0);  // jan 1st 
	temp = jun1.toGMTString();
	var jun2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
	var std_time_offset = (jun1 - jun2) / (1000 * 60 * 60);
	
	if (std_time_offset == daylight_time_offset) {
	    return false;
	} 
	
	return true;
}

/**
 * Same as TimeZone but is used to signify that there really is no olsen
 * database counterpart to this timezone. Usually you would have to live
 * on a boat to be able to live in these timezones.
 */
function NonOlsenTimeZone(offset, tz_name, uses_dst) {
	this.utc_offset = offset;
	this.tz_name = tz_name;
	this.uses_dst = uses_dst;
}

/**
 *Prints out information about the NonOlsenTimeZone.
 */
NonOlsenTimeZone.prototype.display = function() {
	var response_text = '<b style="color: red;">This timezone is not mapped in the Olsen database</b><br/>'
	response_text += '<b>UTC-offset</b>: ' + this.utc_offset + '<br/>';
	response_text += '<b>Time zone name</b>: ' + this.tz_name + '<br/>';
	response_text += '<b>Daylight Savings</b>: ' + (this.uses_dst ? 'yes' : 'no') + '<br>'
	
	return response_text;
}

/**
 * This function attempts to calculate timezones, it generates a key
 * corresponding to the keys in the olsen_tz object and uses that key
 * to get hold of the corresponding TimeZone object
 */
function calculate_time_zone() {
	var timezone_key_info = basic_timezone_info();
	
	var hemisphere_suffix = ''
		
	if (timezone_key_info.south_hemisphere) {
		hemisphere_suffix = ',s';
	}
	
	var tz_key = timezone_key_info.offset + ',' + timezone_key_info.dst + hemisphere_suffix
	
	return {'timezone' : olsen_tz[tz_key], 'key' : tz_key}
}

/**
 * Takes an offset which is given in seconds and remakes it to a string on the format '+/-HH:MM'
 */
function convert(value) {
	var hours = parseInt(value);
   	value -= parseInt(value);
	value *= 60;
	
	var mins = parseInt(value);
   	value -= parseInt(value);
	value *= 60;
	
	// There's only one timezone with negative minute offset, and that is Newfoundland (-03h -30min).
	// However, we need to handle that here since we get a negative value for minutes.
	mins =  (mins < 0) ? -mins : mins;

	var display_hours = hours;
	
	// handle GMT case (00:00)
	if (hours == 0) {
		display_hours = "00";
	} else if (hours > 0) {
		// add a plus sign and perhaps an extra 0
		display_hours = (hours < 10) ? "+0"+hours : "+"+hours;
	} else {
		// add an extra 0 if needed 
		display_hours = (hours > -10) ? "-0"+Math.abs(hours) : hours;
	}
	
	mins = (mins < 10) ? "0"+mins : mins;
	
	return display_hours+":"+mins;
}

/**
 * This is the entry point of the application.
 */
function show_timezone_info() {
	var tz_info = calculate_time_zone();
	
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