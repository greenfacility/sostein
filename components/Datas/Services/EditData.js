import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editService, getService, serviceOpenAndClose2 } from '../../../redux/actions';
import { Edit } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditData extends Component {
	state = {
		loading: false,
		visible: false,
	};

	showModal = (id) => {
		this.props.getService(id);
		this.props.serviceOpenAndClose2();
	};

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		validateFields((err, values) => {
			if (!err) {
				// this.setState({ loading: false, visible: false });
				Message.warning('Loading...').then(() =>
					this.props.editService(values, this.props.services.service._id),
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
		// const { visible, loading } = this.state;
		const { loading, serviceopen2 } = this.props.ux;
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
					Edit Service
				</Button>
				<Modal
					visible={serviceopen2}
					title="Edit Service"
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
								initialValue: this.props.services.service.name,
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
								initialValue: this.props.services.service.type,
							})(<Input placeholder="Service Type" />)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect((state) => state, { editService, getService, serviceOpenAndClose2 })(Form.create()(EditData));
