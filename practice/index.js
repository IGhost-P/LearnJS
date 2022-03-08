const dayjs = require("dayjs");

const d = dayjs();

console.info(d.format()); // 2021-02-04T20:58:05+09:00
console.info(d.format("YYYY-MM-DD HH:mm:ss")); // 2021-02-04 20:58:05
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz("2014-06-01 12:00", "America/New_York");

dayjs("2014-06-01 12:00").tz("America/New_York");

dayjs.tz.guess();

dayjs.tz.setDefault("America/New_York");
console.log();
