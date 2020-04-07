import React, { Component } from 'react';
import ChatComp from '../components/Chat';
import { database } from '../lib/chat-config';

class Chat extends Component {
	state = {
		data: [],
	};
	componentDidMount() {
		database.on('value', (snap) => {
			var arr = [];
			var object = snap.val();
			for (let key in object) {
				if (object.hasOwnProperty(key)) {
					const element = object[key];
					arr.push({ ...element, id: key });
				}
			}
			this.setState({ data: arr });
		});
	}
	render() {
		return (
			<div>
				<ChatComp chats={this.state.data} />
			</div>
		);
	}
}

export default Chat;
