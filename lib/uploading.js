import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import DropzoneComponent from 'react-dropzone-component';
import crypto from 'crypto';
// import 'react-dropzone-component/styles/filepicker.css';
// import 'dropzone/dist/min/dropzone.min.css';
const API = {
	cloudinary: {
		key: '777168823277823',
		secret: 'ixrU8tIZcx23EsWfsm9VZchTnhM',
		name: 'duen4u7rr',
	},

	serialize: (data) => {
		var body = [];
		for (var key in data)
			if (data.hasOwnProperty(key)) body.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));

		return body.join('&');
	},
};

const dropzoneConfig = {
	thumbnailHeight: 160,
	maxFilesize: 2,
	width: '100%',
	height: '10px',
	headers: { 'My-Awesome-Header': 'header value' },
};

const dropzoneComponentConfig = {
	postUrl: 'https://httpbin.org/post',
};

function uploadFile(file){
	if (!file || !(file instanceof Blob)) {
		if (!file) console.log(file, 'No file was selected');
		return;
	}

	var onload = (e) => {
		var dataURL = e.target.result;

		var time = new Date().getTime();
		var data = {
			file: dataURL,
			api_key: API.cloudinary.key,
			timestamp: time,
			signature: crypto.createHash('sha1').update('timestamp=' + time + '' + API.cloudinary.secret).digest('hex'),
		};

		var body = API.serialize(data);

		fetch(`https://api.cloudinary.com/v1_1/${API.cloudinary.name}/image/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			body: body,
		})
			.then((res) => res.json())
			.then((response) => {
				// console.log(response);
				// this.setState({ picture: response.data.secure_url, uploading: false });
				var data = {
					picture: response.secure_url,
					uploading: false,
				};
				this.props.uploadResponse(data);
			})
			.catch((message) => {
				console.log('Cloudinary Request Error: ', message);
				var data = {
					message,
					uploading: false,
				};
				this.props.uploadResponse(data);
				// this.setState({ uploading: false });
			});
	};

	var f = new FileReader();
	f.readAsDataURL(file);
	f.onload = onload;

	// this.setState({ uploading: true });
	this.props.uploadResponse({ uploading: true });
}

export default class ImageUploader extends Component {
	state = {
		dropzone: '',
	};
	static propTypes = {
		uploadResponse: PropTypes.func,
		uploadRemove: PropTypes.func,
	};
	render() {
		return (
			<div>
				<DropzoneComponent
					config={dropzoneComponentConfig}
					djsConfig={dropzoneConfig}
					eventHandlers={{
						init: (dropzone) => this.setState({ dropzone }),
						addedfile: (file) => uploadFile.call(this, file),
						removedfile: () => {
							if (this.state.dropzone) this.state.dropzone.removeFile();
							this.props.uploadRemove({ picture: '' });
							this.setState({ dropzone: null });
						},
					}}
				/>
			</div>
		);
	}
}
