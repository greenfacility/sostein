import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Message, Row } from 'antd';
import { User, Mail, Triangle } from 'react-feather';
import { notInProgress, inProgress } from '../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';

import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';

const FormItem = Form.Item;

const Content = styled.div`
	max-width: 400px;
	z-index: 2;
	min-width: 300px;
`;

class Signin extends Component {
	state = {
		email: '',
		password: '',
	};
	render() {
		const { form } = this.props;
		return (
			<Row
				type="flex"
				align="middle"
				justify="center"
				className="px-3 bg-white mh-page"
				style={{ minHeight: '100vh' }}
			>
				<Content>
					<div className="text-center mb-5">
						<h5 className="mb-0 mt-3">Contact Us</h5>

						<p className="text-muted">
							The company has developed processes and standards which help to ensure that all activities
							are sustainable and deliver good results. The ultimate result which we deliver is the place
							where the customers live, work or play and we thrive to ensure that we provide comfort,
							safety and security on all our facilities.
						</p>
					</div>

					<Form
						layout="vertical"
						onSubmit={(e) => {
							e.preventDefault();
							form.validateFields((err, values) => {
								if (!err) {
									this.props.inProgress();
									Message.warning('Loading...').then(() => {
										axios
											.post('/api/contact', values)
											.then((res) => {
												this.props.notInProgress();
												Message.success('Message Submited Successfully');
												Router.push('/');
											})
											.catch((err) => Message.error('Unable to contact us this time'));
									});
								}
							});
						}}
					>
						<FormItem label="Name">
							{form.getFieldDecorator('name', {
								rules: [
									{
										required: true,
										message: 'Please input your name!',
									},
								],
							})(
								<Input
									prefix={<User size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="name"
									placeholder="Name"
								/>,
							)}
						</FormItem>
						<FormItem label="Email">
							{form.getFieldDecorator('email', {
								rules: [
									{
										type: 'email',
										message: 'The input is not valid E-mail!',
									},
									{
										required: true,
										message: 'Please input your E-mail!',
									},
								],
							})(
								<Input
									prefix={<Mail size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="email"
									placeholder="Email"
								/>,
							)}
						</FormItem>

						<FormItem label="Message">
							{form.getFieldDecorator('message', {
								rules: [ { required: true, message: 'Please input your message!' } ],
							})(<TextArea placeholder="Message" />)}
						</FormItem>
						<FormItem>
							<Button
								loading={this.props.ux.loading}
								type="primary"
								htmlType="submit"
								block
								className="mt-3"
							>
								Submit
							</Button>
						</FormItem>
					</Form>
					<div
						className="mt-5 mb-2"
						style={{ textAlign: 'center', textTransform: 'capitalize', fontSize: '12px' }}
					>
						A product of green facilities limited
					</div>
				</Content>
			</Row>
		);
	}
}

export default connect((state) => state, { notInProgress, inProgress })(Form.create()(Signin));
