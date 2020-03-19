import { Modal, Button, Form, Input, Divider, Select, Menu, Row } from 'antd';
import React, { Component } from 'react';
import { Edit } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditData1 extends Component {
	state = {
		loading: false,
		visible: false,
	};

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = () => {
		this.setState({ loading: true });
		setTimeout(() => {
			this.setState({ loading: false, visible: false });
		}, 3000);
	};

	handleCancel = () => {
		this.setState({ visible: false });
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
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 8,
				},
			},
		};
		const { visible, loading } = this.state;
		const { getFieldDecorator } = this.props.form;
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
				<Menu.Item onClick={this.showModal}>
					<Row type="flex" align="middle">
						<Edit size={16} strokeWidth={1} className="mr-3" /> <span>Edit</span>
					</Row>
				</Menu.Item>
				<Modal
					visible={visible}
					title="Title"
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
							{getFieldDecorator('fname', {
								rules: [
									{
										required: true,
										message: 'Please input your First name!',
									},
								],
							})(<Input />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Last name">
							{getFieldDecorator('lname', {
								rules: [
									{
										required: true,
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
										required: true,
										message: 'Please input your E-mail!',
									},
								],
							})(<Input />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Phone Number">
							{getFieldDecorator('phone', {
								rules: [
									{
										required: true,
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
										required: true,
										message: 'Please input your address',
									},
								],
							})(<Input placeholder="Street Name, Area, City, State" />)}
						</FormItem>

						<FormItem {...formItemLayout} label="About">
							{getFieldDecorator('about', {
								rules: [
									{
										required: true,
										message: 'Please input info about yourself!',
									},
								],
							})(<TextArea />)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default Form.create()(EditData1);
