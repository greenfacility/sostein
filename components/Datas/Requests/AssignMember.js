import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message, Upload, Icon } from 'antd';
import { Edit, User } from 'react-feather';
import { connect } from 'react-redux';
import { assignMember, getRequest, requestOpenAndClose2 } from '../../../redux/actions';
import React, { Component } from 'react';
import FormItem from 'antd/lib/form/FormItem';

const { Dragger } = Upload;

class AddData1 extends Component {
	state = {
		loading: false,
		visible: false,
		assigned: this.props.requests.request.assigned,
		email: '',
	};

	showModal = (id) => {
		this.props.getRequest(id);
		this.props.requestOpenAndClose2();
	};

	handleOk = () => {
		const { validateFields } = this.props.form;
		validateFields((err, values) => {
			if (!err) {
				let data = { name: this.state.assigned, id: values.assign, email: this.state.email };
				Message.warning('Loading...').then(() =>
					this.props.assignMember(data, this.props.requests.request._id, this.props.authentication.user),
				);
			}
		});
	};

	handleCancel = () => this.props.requestOpenAndClose2();

	handleChange = (e) => {
		let user = this.props.foruser.users.find((data) => data._id === e);
		this.setState({ assigned: `${user.firstname} ${user.lastname}`, email: user.email });
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
		const { loading, requestopen2 } = this.props.ux;
		const { getFieldDecorator } = this.props.form;
		const Option = Select.Option;

		var teamMember = this.props.foruser.users.filter((user) => user.usertype === 'team-member');
		return (
			<div>
				<Button type="primary" onClick={(e) => this.showModal(this.props.id)}>
					Assign Member
				</Button>
				<Modal
					visible={requestopen2}
					title="Assign Member"
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
						<FormItem {...formItemLayout} label="Assign Team Member">
							{getFieldDecorator('assign', {
								rules: [
									{
										required: true,
										message: 'Please select a Team Member!',
									},
								],
								initialValue: this.props.requests.request.assigned,
							})(
								<Select style={{ width: '100%' }} onChange={this.handleChange}>
									{teamMember.map((user) => (
										<Option key={user._id} value={user._id}>
											{user.firstname} {user.lastname}
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

export default connect((state) => state, { assignMember, getRequest, requestOpenAndClose2 })(Form.create()(AddData1));
// export default Form.create()(AddData1);
