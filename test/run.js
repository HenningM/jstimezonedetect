var jstz = require("../jstz");

function determine_current_timezone() {
  var tz = jstz.jstz.determine();
  console.log(tz.name());
}

determine_current_timezone();

