import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message, Upload, Icon } from 'antd';
import { Edit, User } from 'react-feather';
import { connect } from 'react-redux';
import { addRequest, requestOpenAndClose } from '../../../redux/actions';
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
		property: '',
		from: '',
	};

	showModal = () => this.props.requestOpenAndClose();

	handleChange = (e) => {
		let property = this.props.properties.properties.find((data) => data._id === e);
		this.setState({
			property: `${property.property} - ${property.location} by ${property.name}`,
			from: property.ownId,
		});
	};

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		// if (this.state.picture === '') return Message.error('You have to attach a picture');
		validateFields((err, values) => {
			if (!err) {
				// setTimeout(() => {
				// 	this.setState({ loading: false, visible: false });
				// }, 3000);
				values.picture = this.state.picture;
				values.property = this.state.property;
				values.from = this.state.from;
				// console.log(values);
				Message.warning('Loading...').then(() => this.props.addRequest(values, this.props.authentication.user));
			}
		});
	};

	handleCancel = () => this.props.requestOpenAndClose();

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
		// const { visible, loading } = this.state;
		const { getFieldDecorator } = this.props.form;
		const Option = Select.Option;
		const { loading, requestopen } = this.props.ux;
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
					Add WorkOrder
				</Button>
				<Modal
					visible={requestopen}
					title="Add Work Order"
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
						<FormItem {...formItemLayout} label="Project Site">
							{getFieldDecorator('propertyId', {
								rules: [
									{
										required: true,
										message: 'Please select project site!',
									},
								],
							})(
								<Select style={{ width: '100%' }} onChange={this.handleChange}>
									{this.props.properties.properties.map((data) => (
										<Option key={data._id} value={data._id}>
											{data.property} - {data.location} by {data.name}
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
							})(<ImageUploader uploadResponse={this.uploadResponse} uploadRemove={this.uploadRemove} />)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect((state) => state, { addRequest, requestOpenAndClose })(Form.create()(AddData1));
// export default Form.create()(AddData1);
