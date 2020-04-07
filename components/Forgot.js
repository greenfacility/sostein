import { Button, Form, Input, Message, Row } from 'antd';
import { Mail, Triangle } from 'react-feather';

import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { inProgress, notInProgress } from '../redux/actions';

const FormItem = Form.Item;

const Content = styled.div`
	max-width: 400px;
	z-index: 2;
	min-width: 300px;
`;

const Forgot = (props) => (
	<Row type="flex" align="middle" justify="center" className="px-3 bg-white" style={{ minHeight: '100vh' }}>
		<Content>
			<div className="text-center mb-5">
				<Link href="/">
					<a className="brand mr-0">
						{/* <Triangle size={32} strokeWidth={1} /> */}
						<img src="/images/logo.png" alt="green facilities ltd" width="100%" />
					</a>
				</Link>
				<h5 className="mb-0 mt-3">Recover your password</h5>

				<p className="text-muted">receive password reset instructions.</p>
			</div>

			<Form
				layout="vertical"
				onSubmit={(e) => {
					e.preventDefault();
					props.form.validateFields((err, values) => {
						if (!err) {
							props.inProgress();
							axios
								.post(`/api/user/forgotpassword`, { email: values.email })
								.then((reset) => {
									Message.success('Reset email sent. Please check your inbox!');
									props.notInProgress();
								})
								.catch((error) => {
									if (error.response.data.msg) {
										Message.error(error.response.data.msg);
									}
									props.notInProgress();
								});
						}
					});
				}}
			>
				<FormItem label="Email">
					{props.form.getFieldDecorator('email', {
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

				<FormItem>
					<Button type="primary" loading={props.ux.loading} htmlType="submit" block>
						Reset password
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
		</Content>
	</Row>
);

export default connect((state) => state, { inProgress, notInProgress })(Form.create()(Forgot));
