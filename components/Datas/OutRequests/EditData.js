import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeOutRequestStatus, getOutRequest, requestOpenAndClose33 } from '../../../redux/actions';
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
		this.props.getOutRequest(id);
		this.props.requestOpenAndClose33();
	};

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		validateFields((err, values) => {
			if (!err) {
				// this.setState({ loading: false, visible: false });
				Message.warning('Loading...').then(() =>
					this.props.changeOutRequestStatus(
						values,
						this.props.requests.outrequest._id,
						this.props.authentication.user,
					),
				);
			}
		});
	};

	handleCancel = () => this.props.requestOpenAndClose33();

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
		const { loading, requestopen33 } = this.props.ux;
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
					visible={requestopen33}
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
						<img src={this.props.requests.outrequest.picture} style={{ width: '100%' }} />

						<FormItem {...formItemLayout} label="Type">
							{getFieldDecorator('type', {
								rules: [
									{
										required: true,
										message: 'Please enter Request type!',
									},
								],
								initialValue: this.props.requests.outrequest.type,
							})(<Input placeholder="Request Type" disabled />)}
						</FormItem>
						<FormItem {...formItemLayout} label="Status">
							{getFieldDecorator('status', {
								rules: [
									{
										required: true,
										message: 'Please select your request status!',
									},
								],
								initialValue: this.props.requests.outrequest.status,
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
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect((state) => state, { changeOutRequestStatus, getOutRequest, requestOpenAndClose33 })(
	Form.create()(EditData),
);
