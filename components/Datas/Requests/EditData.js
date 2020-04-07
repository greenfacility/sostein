import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeRequestStatus, getRequest, requestOpenAndClose3 } from '../../../redux/actions';
import { Edit, User } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditData extends Component {
	state = {
		loading: false,
		visible: false,
		status: [ 'pending', 'done', 'on-going', 'hold', 'park' ],
	};

	showModal = (id) => {
		this.props.getRequest(id);
		this.props.requestOpenAndClose3();
	};

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		validateFields((err, values) => {
			if (!err) {
				// this.setState({ loading: false, visible: false });
				Message.warning('Loading...').then(() =>
					this.props.changeRequestStatus(
						values,
						this.props.requests.request._id,
						this.props.authentication.user,
					),
				);
			}
		});
	};

	handleCancel = () => this.props.requestOpenAndClose3();

	render() {
		// console.log(this.props);
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
		// const tailFormItemLayout = {
		// 	wrapperCol: {
		// 		xs: {
		// 			span: 24,
		// 			offset: 0,
		// 		},
		// 		sm: {
		// 			span: 16,
		// 			offset: 8,
		// 		},
		// 	},
		// };
		var { status } = this.state;
		const { loading, requestopen3 } = this.props.ux;
		const { getFieldDecorator } = this.props.form;
		const { usertype } = this.props.authentication.user;
		var statuses = status;
		if (usertype === 'user') {
			statuses = status.filter((status) => status !== 'pending');
			statuses = statuses.filter((status) => status !== 'done');
			statuses = statuses.filter((status) => status !== 'on-going');
		}

		if (usertype === 'team-member') {
			statuses = status.filter((status) => status !== 'hold');
			statuses = statuses.filter((status) => status !== 'park');
		}

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
				{(usertype !== 'user' || usertype !== 'team-member') && (
					<Button type="primary" onClick={(e) => this.showModal(this.props.id)}>
						Change Status
					</Button>
				)}
				<Modal
					visible={requestopen3}
					title="Change Status"
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
						<img src={this.props.requests.request.picture} style={{ width: '100%' }} />
						<FormItem {...formItemLayout} label="Name">
							{getFieldDecorator('name', {
								rules: [
									{
										required: true,
										message: 'Please enter request name',
									},
								],
								initialValue: this.props.requests.request.name,
							})(<Input placeholder="Request Name" disabled />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Type">
							{getFieldDecorator('type', {
								rules: [
									{
										required: true,
										message: 'Please enter Request type!',
									},
								],
								initialValue: this.props.requests.request.type,
							})(<Input placeholder="Request Type" disabled />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Project Site">
							{getFieldDecorator('propertyId', {
								rules: [
									{
										required: true,
										message: 'Please select project site!',
									},
								],
								initialValue: this.props.requests.request.property,
							})(<Input placeholder="Project Site" disabled />)}
						</FormItem>
						<FormItem {...formItemLayout} label="Status">
							{getFieldDecorator('status', {
								rules: [
									{
										required: true,
										message: 'Please select your request status!',
									},
								],
								initialValue: this.props.requests.request.status,
							})(
								<Select style={{ width: '100%' }}>
									{statuses.map((status) => (
										<Option key={status} value={status}>
											{status}
										</Option>
									))}
								</Select>,
							)}
						</FormItem>
						<FormItem label={'Desciption'}>
							{getFieldDecorator('description', {
								rules: [
									{
										message: 'Please Describe the request in short sentence!',
										whitespace: true,
									},
								],
								initialValue: this.props.requests.request.description,
							})(
								<TextArea
									disabled
									prefix={<User size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
									// onChange={this.handleChange}
									placeholder="Request Description"
								/>,
							)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect((state) => state, { changeRequestStatus, getRequest, requestOpenAndClose3 })(
	Form.create()(EditData),
);
