import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import { Edit } from 'react-feather';
import { connect } from 'react-redux';
import { addProperty, propertyOpenAndClose } from '../../../redux/actions';
import React, { Component } from 'react';
import FormItem from 'antd/lib/form/FormItem';

class AddData1 extends Component {
	state = {
		loading: false,
		visible: false,
		name: '',
	};

	showModal = () => this.props.propertyOpenAndClose();

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		const loggedUser = this.props.authentication.user;
		let tempName = `${loggedUser.firstname} ${loggedUser.lastname}`;
		validateFields((err, values) => {
			if (!err) {
				if (loggedUser.usertype == 'user') {
					values.name = tempName;
					values.ownId = loggedUser._id;
				} else {
					values.name = this.state.name;
				}
				// setTimeout(() => {
				// 	this.setState({ loading: false, visible: false });
				// }, 3000);
				console.log(values);
				Message.warning('Loading...').then(() =>
					this.props.addProperty(values, this.props.authentication.user),
				);
			}
		});
	};

	handleCancel = () => this.props.propertyOpenAndClose();

	handleChange = (e) => {
		let user = this.props.foruser.users.find((data) => data._id === e);
		this.setState({ name: `${user.firstname} ${user.lastname}` });
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
		// const { visible, loading } = this.state;
		const { getFieldDecorator } = this.props.form;
		const { loading, propertyopen } = this.props.ux;
		// const Option = Select.Option;

		// const prefixSelector = getFieldDecorator('prefix', {
		// 	initialValue: '+234',
		// })(
		// 	<Select style={{ width: 'auto' }}>
		// 		<Option value="+234">+234</Option>
		// 	</Select>,
		// );

		let users = this.props.foruser.users;
		const loggedUser = this.props.authentication.user;
		let tempName = `${loggedUser.firstname} ${loggedUser.lastname}`;
		let ready = true;
		if (loggedUser.usertype === 'manager' || loggedUser.usertype === 'team-member') {
			tempName = `Please select name`;
			ready = false;
		} else {
			tempName = `${loggedUser.firstname} ${loggedUser.lastname}`;
			ready = true;
		}

		return (
			<div>
				<Button type="primary" onClick={this.showModal}>
					Add Site
				</Button>
				<Modal
					visible={propertyopen}
					title="Add Site"
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
							{getFieldDecorator('ownId', {
								rules: [
									{
										required: true,
										message: 'Please select name!',
									},
								],
								initialValue: tempName,
							})(
								<Select style={{ width: '100%' }} disabled={ready} onChange={this.handleChange}>
									{users.map((prop) => (
										<Option key={prop._id} value={prop._id}>
											{`${prop.firstname} ${prop.lastname}`}
										</Option>
									))}
								</Select>,
							)}
						</FormItem>

						<FormItem {...formItemLayout} label="Site">
							{getFieldDecorator('property', {
								rules: [
									{
										required: true,
										message: 'Please enter site!',
									},
								],
							})(<Input placeholder="Site" />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Location">
							{getFieldDecorator('location', {
								rules: [
									{
										required: true,
										message: 'Please select your location!',
									},
								],
							})(
								<Select style={{ width: '100%' }}>
									{this.props.locations.locations.map((prop) => (
										<Option key={prop._id} value={`${prop.state}-${prop.area}`}>
											{`${prop.state}-${prop.area}`}
										</Option>
									))}
								</Select>,
							)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect((state) => state, { addProperty, propertyOpenAndClose })(Form.create()(AddData1));
// export default Form.create()(AddData1);
