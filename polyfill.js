var any = require('./any');

if (!Promise.any) {
	Promise.any = any;
}
