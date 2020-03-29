import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import { Edit, Eye } from 'react-feather';
import { connect } from 'react-redux';
import { createUser, userOpenAndClose } from '../../../redux/actions';
import React, { Component } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import FormItem from 'antd/lib/form/FormItem';

class AddData extends Component {
	state = {
		loading: false,
		visible: false,
	};

	showModal = () => this.props.userOpenAndClose();

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		validateFields((err, values) => {
			if (!err) {
				// setTimeout(() => {
				// 	this.setState({ loading: false, visible: false });
				// }, 3000);
				Message.warning('Loading...').then(() =>
					this.props.createUser(values, this.props.authentication.user._id),
				);
			}
		});
	};

	handleCancel = () => this.props.userOpenAndClose();

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
		const { loading, useropen } = this.props.ux;
		const { getFieldDecorator, getFieldValue } = this.props.form;
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
				<Button type="primary" onClick={this.showModal}>
					Add User
				</Button>
				<Modal
					visible={useropen}
					title="Add User"
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
							})(<Input />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Phone Number">
							{getFieldDecorator('phonenumber', {
								rules: [
									{
										// required: true,
										message: 'Please input your phone number!',
									},
								],
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
							})(<Input placeholder="Street Name, Area, City, State" />)}
						</FormItem>

						<FormItem {...formItemLayout} label="About">
							{getFieldDecorator('about', {
								rules: [
									{
										// required: true,
										message: 'Please input info about yourself!',
									},
								],
							})(<TextArea />)}
						</FormItem>

						<FormItem label="Password">
							{getFieldDecorator('password', {
								rules: [ { required: true, message: 'Please input your Password!' } ],
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
										required: true,
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

export default connect((state) => state, { createUser })(Form.create()(AddData));
// export default Form.create()(AddData);
