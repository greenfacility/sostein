import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Message, Row } from 'antd';
import { Eye, Mail, Triangle } from 'react-feather';
import { authenticate, inProgress } from '../redux/actions';
import { connect } from 'react-redux';

import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';

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
						<Link href="/">
							<a className="brand mr-0">
								{/* <Triangle size={32} strokeWidth={1} /> */}
								<img src="/images/logo.png" alt="green facilities ltd" width="100%" />
							</a>
						</Link>
						<h5 className="mb-0 mt-3">
							Sign in or{' '}
							<Link href="/request">
								<Button
									type="primary"
									// block
									className="mt-3"
								>
									Make a request
								</Button>
							</Link>
						</h5>

						<p className="text-muted">get started with our service</p>
					</div>

					<Form
						layout="vertical"
						onSubmit={(e) => {
							e.preventDefault();
							form.validateFields((err, values) => {
								if (!err) {
									this.props.inProgress();
									Message.warning('Loading...').then(() => this.props.authenticate(values));
								}
							});
						}}
					>
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

						<FormItem label="Password">
							{form.getFieldDecorator('password', {
								rules: [ { required: true, message: 'Please input your Password!' } ],
							})(
								<Input
									prefix={<Eye size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password"
									placeholder="Password"
								/>,
							)}
						</FormItem>

						<FormItem>
							{form.getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: true,
							})(<Checkbox>Remember me</Checkbox>)}
							<Link href="/forgot">
								<a className="text-xs-right">
									<small>Forgot password</small>
								</a>
							</Link>
							<Button
								loading={this.props.ux.loading}
								type="primary"
								htmlType="submit"
								block
								className="mt-3"
							>
								Sign In
							</Button>
						</FormItem>

						<div className="text-center">
							<small className="text-muted">
								<span>Don't have an account yet?</span>{' '}
								<Link href="/signup">
									<a>&nbsp;Create one now!</a>
								</Link>
							</small>
						</div>
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

export default connect((state) => state, { authenticate, inProgress })(Form.create()(Signin));
