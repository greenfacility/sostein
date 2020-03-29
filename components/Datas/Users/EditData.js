import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser, getEditUser, userOpenAndClose2 } from '../../../redux/actions';
import { Edit, Eye } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditData extends Component {
	state = {
		loading: false,
		visible: false,
		isdisabled: true,
		status: [ 'pending', 'done', 'active' ],
	};

	showModal = (id) => {
		this.props.getEditUser(id);
		this.props.userOpenAndClose2();
	};

	makeEnabled = () => {
		this.setState({ isdisabled: !this.state.isdisabled });
	};

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		validateFields((err, values) => {
			if (!err) {
				// this.setState({ loading: false, visible: false });
				Message.warning('Loading...').then(() =>
					this.props.editUser(values, this.props.authentication.edit._id),
				);
			}
		});
	};

	handleCancel = () => this.props.userOpenAndClose2();

	componentDidMount() {
		const { usertype } = this.props.authentication.user;
		let status = this.state.status;
		if (usertype === 'user' || usertype === 'team-member') {
			status.filter((status) => status == 'pending');
		}
		this.setState({ status });
	}

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
		const { loading, useropen2 } = this.props.ux;
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { usertype } = this.props.authentication.user;
		const { _id, firstname, lastname, email, phonenumber, picture, about, address } = this.props.foruser.edit;

		const Option = Select.Option;

		const prefixSelector = getFieldDecorator('prefix', {
			initialValue: '+234',
		})(
			<Select style={{ width: 'auto' }}>
				<Option value="+234">+234</Option>
			</Select>,
		);
		return (
			<div>
				<Button type="primary" onClick={(e) => this.showModal(this.props.id)}>
					Edit User
				</Button>
				<Modal
					visible={useropen2}
					title="Change User Info"
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
						<FormItem {...formItemLayout} label="First name">
							{getFieldDecorator('firstname', {
								rules: [
									{
										// required: true,
										message: 'Please input your First name!',
									},
								],
								initialValue: firstname,
							})(<Input />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Last name">
							{getFieldDecorator('lastname', {
								rules: [
									{
										// required: true,
										message: 'Please input your Last name!',
									},
								],
								initialValue: lastname,
							})(<Input />)}
						</FormItem>

						<FormItem {...formItemLayout} label="E-mail">
							{getFieldDecorator('email', {
								rules: [
									{
										type: 'email',
										message: 'The input is not valid E-mail!',
									},
									{
										// required: true,
										message: 'Please input your E-mail!',
									},
								],
								initialValue: email,
							})(
								<Input
									addonAfter={
										<Edit size={22} onClick={this.makeEnabled} style={{ cursor: 'pointer' }} />
									}
									disabled={this.state.isdisabled}
								/>,
							)}
						</FormItem>

						<FormItem {...formItemLayout} label="Phone Number">
							{getFieldDecorator('phonenumber', {
								rules: [
									{
										// required: true,
										message: 'Please input your phone number!',
									},
								],
								initialValue: JSON.stringify(phonenumber),
							})(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
						</FormItem>

						<Divider />

						<FormItem {...formItemLayout} label="Address">
							{getFieldDecorator('address', {
								rules: [
									{
										// required: true,
										message: 'Please input your address',
									},
								],
								initialValue: address,
							})(<Input placeholder="Street Name, Area, City, State" />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Type">
							{getFieldDecorator('usertype', {
								rules: [
									{
										// required: true,
										message: 'Please select a User type!',
									},
								],
								initialValue: this.props.foruser.edit.usertype,
							})(
								<Select style={{ width: '100%' }}>
									<Option value={'user'}>User</Option>
									<Option value={'team-member'}>Team Member</Option>
									<Option value={'manager'}>Manager</Option>
								</Select>,
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="About">
							{getFieldDecorator('about', {
								rules: [
									{
										message: 'Please input info about yourself!',
									},
								],
								initialValue: about,
							})(<TextArea />)}
						</FormItem>

						<Divider />

						<FormItem label="Password">
							{getFieldDecorator('password', {
								rules: [ { message: 'Please input your Password!' } ],
								onChange: this.handleChange,
							})(
								<Input
									prefix={<Eye size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password"
									name="password"
									placeholder="Password"
								/>,
							)}
						</FormItem>

						<FormItem label="Confirm password">
							{getFieldDecorator('confirm', {
								rules: [
									{
										message: 'Please confirm your password!',
									},
									{
										validator: (rule, value, callback) => {
											if (value && value !== getFieldValue('password')) {
												callback("Passwords don't match!");
											} else {
												callback();
											}
										},
									},
								],
							})(
								<Input
									prefix={<Eye size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password"
									placeholder="Confirm password"
								/>,
							)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect((state) => state, { editUser, getEditUser, userOpenAndClose2 })(Form.create()(EditData));
