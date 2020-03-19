const express = require('express');
const auth = require('../config/auth');
const router = express.Router();

// Api Model
const Api = require('../model/Api');

// Home route
router.get('/', (req, res) => {
	Api.find({}).sort({ date: -1 }).then((item) => res.json(item));
});

router.post('/', auth, (req, res) => {
	var { username, title, post, url, image, votes, category } = req.body;
	var newpost = new Api({
		username,
		title,
		post,
		url,
		image,
		votes,
		category,
	});

	newpost
		.save()
		.then((item) => res.json(item))
		.catch((err) => res.status(404).json({ msg: `Not post due to ${err}` }));
});

router.delete('/:id', auth, (req, res) => {
	Api.findByIdAndDelete(req.params.id, (err, todo) => {
		if (err) return res.status(500).send({ success: false, err });
		return res.json({ success: true });
	});
});

router.patch('/:id', auth, (req, res) => {
	Api.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, todo) => {
		if (err) return res.status(500).send(err);
		return res.json(todo);
	});
});

module.exports = router;
