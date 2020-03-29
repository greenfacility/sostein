import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import { Edit } from 'react-feather';
import { connect } from 'react-redux';
import { addService, serviceOpenAndClose } from '../../../redux/actions';
import React, { Component } from 'react';
import FormItem from 'antd/lib/form/FormItem';

class AddData1 extends Component {
	state = {
		loading: false,
		visible: false,
	};

	showModal = () => this.props.serviceOpenAndClose();

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		validateFields((err, values) => {
			if (!err) {
				// setTimeout(() => {
				// 	this.setState({ loading: false, visible: false });
				// }, 3000);
				Message.warning('Loading...').then(() => this.props.addService(values));
			}
		});
	};

	handleCancel = () => this.props.serviceOpenAndClose();

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
		const { loading, serviceopen } = this.props.ux;
		const { getFieldDecorator } = this.props.form;
		// const Option = Select.Option;

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
					Add Service
				</Button>
				<Modal
					visible={serviceopen}
					title="Add Service"
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
										message: 'Please enter service name',
									},
								],
							})(<Input placeholder="Service Name" />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Type">
							{getFieldDecorator('type', {
								rules: [
									{
										required: true,
										message: 'Please enter service type!',
									},
								],
							})(<Input placeholder="Service Type" />)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect((state) => state, { addService, serviceOpenAndClose })(Form.create()(AddData1));
// export default Form.create()(AddData1);
