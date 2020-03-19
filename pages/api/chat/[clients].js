import PubNub from 'pubnub';
import config from './config';
import { messages } from './index';

const pubnub = new PubNub({
	publishKey: config.publishKey,
	subscribeKey: config.subscribeKey,
});

export default (req, res) => {
	const message = {
		client: req.query.clients,
		content: req.body.message,
	};
	messages.push(message);
	pubnub.publish({
		channel: 'messages',
		message,
	});
	// console.log(config);
	res.json({ message });
};
