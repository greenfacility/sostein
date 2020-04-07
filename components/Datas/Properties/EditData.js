import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProperty, getProperty, propertyOpenAndClose2 } from '../../../redux/actions';
import { Edit } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditData extends Component {
	state = {
		loading: false,
		visible: false,
		name: this.props.properties.property.name,
	};

	showModal = (id) => {
		this.props.getProperty(id);
		this.props.propertyOpenAndClose2();
	};

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		validateFields((err, values) => {
			if (!err) {
				// this.setState({ loading: false, visible: false });
				values.name = this.state.name;

				Message.warning('Loading...').then(() =>
					this.props.editProperty(values, this.props.properties.property._id, this.props.authentication.user),
				);
			}
		});
	};

	handleCancel = () => this.props.propertyOpenAndClose2();

	handleChange = (e) => {
		let user = this.props.foruser.users.find((data) => data._id === e);
		this.setState({ name: `${user.firstname} ${user.lastname}` });
	};

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
		// const { visible, loading } = this.state;
		const { getFieldDecorator } = this.props.form;
		const { loading, propertyopen2 } = this.props.ux;

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
				<Button type="primary" onClick={(e) => this.showModal(this.props.id)}>
					Edit Site
				</Button>
				<Modal
					visible={propertyopen2}
					title="Edit Site"
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
								initialValue: this.props.properties.property.name,
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
										message: 'Please input site!',
									},
								],
								initialValue: this.props.properties.property.property,
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
								initialValue: this.props.properties.property.location,
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

export default connect((state) => state, { editProperty, getProperty, propertyOpenAndClose2 })(Form.create()(EditData));
