import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import { Edit } from 'react-feather';
import { connect } from 'react-redux';
import { addLocation, locationOpenAndClose } from '../../../redux/actions';
import React, { Component } from 'react';
import FormItem from 'antd/lib/form/FormItem';

class AddData1 extends Component {
	state = {
		loading: false,
		visible: false,
	};

	showModal = () => this.props.locationOpenAndClose();

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		validateFields((err, values) => {
			if (!err) {
				// setTimeout(() => {
				// 	this.setState({ loading: false, visible: false });
				// }, 3000);
				Message.warning('Loading...').then(() => this.props.addLocation(values));
			}
		});
	};

	handleCancel = () => this.props.locationOpenAndClose();

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
		const { visible } = this.state;
		const { getFieldDecorator } = this.props.form;
		const { loading, locationopen } = this.props.ux;
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
					Add Location
				</Button>
				<Modal
					visible={locationopen}
					title="Add Location"
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
						<FormItem {...formItemLayout} label="State">
							{getFieldDecorator('state', {
								rules: [
									{
										required: true,
										message: 'Please enter state name',
									},
								],
							})(<Input placeholder="State" />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Area">
							{getFieldDecorator('area', {
								rules: [
									{
										required: true,
										message: 'Please enter area!',
									},
								],
							})(<Input placeholder="Area" />)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect((state) => state, { addLocation, locationOpenAndClose })(Form.create()(AddData1));
// export default Form.create()(AddData1);
