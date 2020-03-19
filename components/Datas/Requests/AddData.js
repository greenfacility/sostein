import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message, Upload, Icon } from 'antd';
import { Edit, User } from 'react-feather';
import { connect } from 'react-redux';
import { addRequest } from '../../../redux/actions';
import React, { Component } from 'react';
import ImageUploader from '../../../lib/uploading';
import TextArea from 'antd/lib/input/TextArea';
import FormItem from 'antd/lib/form/FormItem';

const { Dragger } = Upload;

class AddData1 extends Component {
	state = {
		loading: false,
		visible: false,
		picture: '',
	};

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	// handleUpload = (info) => {
	// 	const { status } = info.file;
	// 	if (status !== 'uploading') {
	// 		// console.log(info.file, info.fileList);
	// 		// this.setState({ picture: info.file.response.url });
	// 		console.log(info);
	// 		return info.file.response.url;
	// 	}
	// 	if (status === 'done') {
	// 		message.success(`${info.file.name} file uploaded successfully.`);
	// 	} else if (status === 'error') {
	// 		message.error(`${info.file.name} file upload failed.`);
	// 	}
	// };
	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		if (this.state.picture === '') return Message.error('You have to attach a picture');
		validateFields((err, values) => {
			if (!err) {
				// setTimeout(() => {
				// 	this.setState({ loading: false, visible: false });
				// }, 3000);
				values.picture = this.state.picture;
				// console.log(values);
				Message.warning('Loading...').then(() => this.props.addRequest(values, this.props.authentication.user));
			}
		});
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	uploadRemove = (data) => {
		// console.log(data);
		this.setState({ picture: data.picture });
	};

	uploadResponse = (data) => {
		// console.log(data);
		this.setState({ picture: data.picture });
	};

	render() {
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		const { visible, loading } = this.state;
		const { getFieldDecorator } = this.props.form;
		const Option = Select.Option;

		// const prefixSelector = getFieldDecorator('prefix', {
		// 	initialValue: '+234',
		// })(
		// 	<Select style={{ width: 'auto' }}>
		// 		<Option value="+234">+234</Option>
		// 	</Select>,
		// );

		return (
			<div>
				<Button type="primary" onClick={this.showModal}>
					Add Request
				</Button>
				<Modal
					visible={visible}
					title="Add Request"
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={[
						<Button key="back" onClick={this.handleCancel}>
							Return
						</Button>,
						<Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
							Submit
						</Button>,
					]}
				>
					<Form>
						<FormItem {...formItemLayout} label="Name">
							{getFieldDecorator('name', {
								rules: [
									{
										required: true,
										message: 'Please enter request name',
									},
								],
							})(<Input placeholder="Request Service Name" />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Type">
							{getFieldDecorator('type', {
								rules: [
									{
										required: true,
										message: 'Please select a service type!',
									},
								],
							})(
								<Select style={{ width: '100%' }}>
									{this.props.services.services.map((service) => (
										<Option key={service._id} value={service._id}>
											{service.name}
										</Option>
									))}
								</Select>,
							)}
						</FormItem>
						<FormItem label={'Desciption'}>
							{getFieldDecorator('description', {
								rules: [
									{
										required: true,
										message: 'Please Describe the request in short sentence!',
										whitespace: true,
									},
								],
							})(
								<TextArea
									prefix={<User size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
									// onChange={this.handleChange}
									placeholder="Request Description"
								/>,
							)}
						</FormItem>
						<FormItem label="Picture">
							{getFieldDecorator('picture', {
								rules: [ { required: false, message: 'Please Upload your Profile Picture!' } ],
							})(
								// // <Dragger onChange={this.handleUpload} {...props}>
								// <div>
								// 	<p className="ant-upload-drag-icon">
								// 		<Icon type="inbox" />
								// 	</p>
								// 	<p className="ant-upload-text">Click or drag file to this area to upload</p>
								// 	<p className="ant-upload-hint">Upload your profile picture to the database</p>
								// </div>,
								// // </Dragger>,
								<ImageUploader uploadResponse={this.uploadResponse} uploadRemove={this.uploadRemove} />,
							)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect((state) => state, { addRequest })(Form.create()(AddData1));
// export default Form.create()(AddData1);
