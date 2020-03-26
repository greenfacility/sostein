import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProperty, getProperty } from '../../../redux/actions';
import { Edit } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditData extends Component {
	state = {
		loading: false,
		visible: false,
	};

	showModal = (id) => {
		this.props.getProperty(id);
		this.setState({
			visible: true,
		});
	};

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		validateFields((err, values) => {
			if (!err) {
				// this.setState({ loading: false, visible: false });
				Message.warning('Loading...').then(() =>
					this.props.editProperty(values, this.props.properties.property._id),
				);
			}
		});
	};

	handleCancel = () => {
		this.setState({ visible: false });
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
				<Button type="primary" onClick={(e) => this.showModal(this.props.id)}>
					Edit Property
				</Button>
				<Modal
					visible={visible}
					title="Edit Property"
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
										message: 'Please enter property name',
									},
								],
								initialValue: this.props.properties.property.name,
							})(<Input placeholder="Name" />)}
						</FormItem>

						<FormItem {...formItemLayout} label="Property">
							{getFieldDecorator('property', {
								rules: [
									{
										required: true,
										message: 'Please input property!',
									},
								],
								initialValue: this.props.properties.property.property,
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

export default connect((state) => state, { editProperty, getProperty })(Form.create()(EditData));
