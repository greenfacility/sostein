var requests = [
	{ timestart: '06/30/2018', timecompleted: '06/30/2020', status: 'done' },
	{ timestart: '06/30/2018', timecompleted: '06/20/2019', status: 'done' },
	{ timestart: '06/30/2018', status: 'pending' },
];

requests.map((data) => {
	var lifetime;
	var lifedays;
	var final;
	var start = new Date(data.timestart);
	if (data.status == 'done') {
		var finish = new Date(data.timecompleted);
		lifehour = finish.getHours() - start.getHours();
		lifetime = finish.getTime() - start.getTime();
		lifedays = lifetime / (1000 * 3600 * 24);
		final = `${lifehour} ${lifedays}`;
	} else {
		var finish = new Date();
		lifehour = finish.getHours() - start.getHours();
		lifetime = finish.getTime() - start.getTime();
		lifedays = lifetime / (1000 * 3600 * 24);
		final = `${lifehour} ${lifedays} Still Counting`;
	}
	data.lifetime = final;
});

console.log(requests);
