var requests = [
	{ timestart: '06/30/2018', timecompleted: '06/30/2020', status: 'done' },
	{ timestart: '06/30/2018', timecompleted: '06/20/2019', status: 'done' },
	{ timestart: '06/30/2018', status: 'pending' },
];

const object = { name: 'heyhey', password: '', timestart: '2018-06-29T18:00:00.000Z' };

for (let key in object) {
	if (object[key] !== '') {
		const element = object[key];
		if (key === 'timestart') {
			let date = new Date(object[key]);
			let newdate = new Date(date.getTime() - 18000000);
			console.log(newdate, date);
		}
	}
}

// console.log(requests);
