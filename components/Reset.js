import React, { Component } from 'react';
import { Button, Form, Input, Message, Row } from 'antd';
import { connect } from 'react-redux';
import { Mail, Eye } from 'react-feather';

import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import styled from 'styled-components';

import { inProgress, notInProgress } from '../redux/actions';

const FormItem = Form.Item;

const Content = styled.div`
	max-width: 400px;
	z-index: 2;
	min-width: 300px;
`;

class Reset extends Component {
	state = {
		user: {},
	};
	async componentDidMount() {
		axios
			.get(`/api/user`, {
				headers: {
					Authorization: `${this.props.token}`,
				},
			})
			.then((response) => {
				// console.log(response.data);
				return this.setState({ user: response.data });
			})
			.catch((err) => Message.error(err.response.data.msg).then(() => Router.push('/signin')));
	}
	render() {
		const form = this.props.form;
		const token = this.props.token;
		return (
			<Row type="flex" align="middle" justify="center" className="px-3 bg-white" style={{ minHeight: '100vh' }}>
				<Content>
					<div className="text-center mb-5">
						<Link href="/">
							<a className="brand mr-0">
								{/* <Triangle size={32} strokeWidth={1} /> */}
								<img src="/images/logo.png" alt="green facilities ltd" width="100%" />
							</a>
						</Link>
						<h5 className="mb-0 mt-3">Reset your password</h5>
					</div>

					{this.state.user._id && (
						<div>
							<h3>Email: {this.state.user.email}</h3>
							<Form
								layout="vertical"
								onSubmit={(e) => {
									e.preventDefault();
									form.validateFields((err, values) => {
										if (!err) {
											this.props.inProgress();
											var data = {
												id: this.state.user._id,
												password: values.password,
											};
											axios
												.patch(`/api/user/forgotpassword`, data, {
													headers: {
														Accept: 'application/json',
														'Content-Type': 'application/json',
														Authorization: `${token}`,
													},
												})
												.then((response) => {
													if (response.data.success) {
														Message.success('Password Changed Successfully').then(() =>
															Router.push('/signin'),
														);
														this.props.notInProgress();
														return;
													}
													Message.error(response.data.msg);
													this.props.notInProgress();

													return;
													// .then(() => Router.push('/dashboard'));
												})
												.catch((err) => {
													console.log(err);
													this.props.notInProgress();

													return Message.error(err.response.data.msg);
												});
										}
									});
								}}
							>
								<FormItem label="New Password">
									{form.getFieldDecorator('password', {
										rules: [ { required: true, message: 'Please input your Password!' } ],
									})(
										<Input
											prefix={
												<Eye size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />
											}
											type="password"
											placeholder="Password"
										/>,
									)}
								</FormItem>

								<FormItem label="Confirm password">
									{form.getFieldDecorator('confirm', {
										rules: [
											{
												required: true,
												message: 'Please confirm your password!',
											},
											{
												validator: (rule, value, callback) => {
													if (value && value !== form.getFieldValue('password')) {
														callback("Passwords don't match!");
													} else {
														callback();
													}
												},
											},
										],
									})(
										<Input
											prefix={
												<Eye size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />
											}
											type="password"
											placeholder="Confirm password"
										/>,
									)}
								</FormItem>

								<FormItem>
									<Button type="primary" loading={this.props.ux.loading} htmlType="submit" block>
										Create new password
									</Button>
								</FormItem>

								<div className="text-center">
									<small className="text-muted text-center">
										<span>Don't have an account yet?</span>
										<Link href="/signup">
											<a>&nbsp;Create one now!</a>
										</Link>
									</small>
								</div>
							</Form>
						</div>
					)}
				</Content>
			</Row>
		);
	}
}

export default connect((state) => state, { inProgress, notInProgress })(Form.create()(Reset));
