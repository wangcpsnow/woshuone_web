export function parseTime (time) {
	time = new Date(time);
	var year = time.getFullYear(),
		month = time.getMonth() + 1,
		day = time.getDate(),
		h = time.getHours(),
		m = time.getMinutes();
	return year + '-' + numHandler(month) + '-' + numHandler(day) + ' ' + numHandler(h) + ":" + numHandler(m);
}

function numHandler (num) {
	if(num < 10) {
		return "0" + num;
	}
	return num;
}