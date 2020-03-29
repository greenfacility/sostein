import { Modal, Button, Form, Input, Divider, Select, Menu, Row, Message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editLocation, getLocation, locationOpenAndClose2 } from '../../../redux/actions';
import { Edit } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditData extends Component {
	state = {
		loading: false,
		visible: false,
	};

	showModal = (id) => {
		this.props.getLocation(id);
		this.props.locationOpenAndClose2();
	};

	handleOk = () => {
		const { validateFields } = this.props.form;
		// this.setState({ loading: true });
		validateFields((err, values) => {
			if (!err) {
				// this.setState({ loading: false, visible: false });
				Message.warning('Loading...').then(() =>
					this.props.editLocation(values, this.props.locations.location._id),
				);
			}
		});
	};

	handleCancel = () => this.props.locationOpenAndClose2();

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
		const { loading, locationopen2 } = this.props.ux;
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
					Edit Location
				</Button>
				<Modal
					visible={locationopen2}
					title="Edit Location"
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
								initialValue: this.props.locations.location.state,
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
								initialValue: this.props.locations.location.area,
							})(<Input placeholder="Area" />)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default connect((state) => state, { editLocation, getLocation, locationOpenAndClose2 })(Form.create()(EditData));
