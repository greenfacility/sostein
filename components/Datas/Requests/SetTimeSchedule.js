import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message, Upload, Icon, DatePicker } from 'antd';
import { Edit, User } from 'react-feather';
import { connect } from 'react-redux';
import { scheduleTime, getRequest, requestOpenAndClose4 } from '../../../redux/actions';
import React, { Component } from 'react';
import FormItem from 'antd/lib/form/FormItem';

const { Dragger } = Upload;

class AddData1 extends Component {
	state = {
		loading: false,
		visible: false,
		timescheduled: this.props.requests.request.timescheduled,
	};

	showModal = (id) => {
		this.props.getRequest(id);
		this.props.requestOpenAndClose4();
	};

	handleOk = () => {
		const { validateFields } = this.props.form;
		validateFields((err, values) => {
			if (!err) {
				let timescheduled = new Date(values.timescheduled._d);
				let data = { timescheduled };
				Message.warning('Loading...').then(() =>
					this.props.scheduleTime(data, this.props.requests.request._id, this.props.authentication.user),
				);
			}
		});
	};

	handleCancel = () => this.props.requestOpenAndClose4();

	handleChange = (e) => {
		// console.log(e.target.value);
		// let user = this.props.foruser.users.find((data) => data._id === e);
		// this.setState({ assigned: `${user.firstname} ${user.lastname}` });
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
		const { loading, requestopen4 } = this.props.ux;
		const { getFieldDecorator } = this.props.form;

		return (
			<div>
				<Button type="primary" onClick={(e) => this.showModal(this.props.id)}>
					Set Time Schedule
				</Button>
				<Modal
					visible={requestopen4}
					title="Set Time Schedule"
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
					{this.props.requests.request.timescheduled && (
						<p>Old Scheduled Time: {this.props.requests.request.timescheduled}</p>
					)}
					<Form>
						<FormItem {...formItemLayout} label="Select Time & Date">
							{getFieldDecorator('timescheduled', {
								rules: [
									{
										required: true,
										message: 'Please select a Date!',
									},
								],
							})(<DatePicker showTime format="YYYY-MM-DD HH:mm" />)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect((state) => state, { scheduleTime, getRequest, requestOpenAndClose4 })(Form.create()(AddData1));
// export default Form.create()(AddData1);
