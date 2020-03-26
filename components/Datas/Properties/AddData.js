import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import { Edit } from 'react-feather';
import { connect } from 'react-redux';
import { addProperty } from '../../../redux/actions';
import React, { Component } from 'react';
import FormItem from 'antd/lib/form/FormItem';

class AddData1 extends Component {
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
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		validateFields((err, values) => {
			if (!err) {
				// setTimeout(() => {
				// 	this.setState({ loading: false, visible: false });
				// }, 3000);
				Message.warning('Loading...').then(() => this.props.addProperty(values));
			}
		});
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
					New Property
				</Button>
				<Modal
					visible={visible}
					title="New Property"
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
										message: 'Please enter name',
									},
								],
							})(<Input placeholder="Name" />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Property">
							{getFieldDecorator('property', {
								rules: [
									{
										required: true,
										message: 'Please enter property!',
									},
								],
							})(<Input placeholder="Property" />)}
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

export default connect((state) => state, { addProperty })(Form.create()(AddData1));
// export default Form.create()(AddData1);
