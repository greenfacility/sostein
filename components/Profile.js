import {
	AutoComplete,
	Avatar,
	Button,
	Card,
	Col,
	Divider,
	Form,
	Input,
	Menu,
	Message,
	Progress,
	Row,
	Select,
	Timeline,
	Tooltip,
	Dropdown,
} from 'antd';
import { theme } from './styles/GlobalStyles';
import Uploader from '../lib/uploading';

import MockActivity from '../demos/mock/activity';
import MockContacts from '../demos/mock/contacts';
import {
	Archive,
	Bell,
	Bookmark,
	Edit,
	GitCommit,
	MessageCircle,
	MoreHorizontal,
	PhoneCall,
	Printer,
	Save,
	Activity,
	Trash,
	TrendingDown,
	TrendingUp,
	CheckCircle,
	AlertCircle,
	Clock,
} from 'react-feather';
import { useAppState } from './shared/AppProvider';
import { useState } from 'react';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import { editProfile } from '../redux/actions';

const menu = (
	<Menu>
		<Menu.Item>
			<Row type="flex" align="middle">
				<Archive size={16} strokeWidth={1} className="mr-3" /> <span>Archive</span>
			</Row>
		</Menu.Item>
		<Menu.Item>
			<Row type="flex" align="middle">
				<Edit size={16} strokeWidth={1} className="mr-3" /> <span>Edit</span>
			</Row>
		</Menu.Item>
		<Menu.Item>
			<Row type="flex" align="middle">
				<Trash size={16} strokeWidth={1} className="mr-3" /> <span>Delete</span>
			</Row>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item>
			<Row type="flex" align="middle">
				<Save size={16} strokeWidth={1} className="mr-3" /> <span>Save as</span>
			</Row>
		</Menu.Item>
		<Menu.Item>
			<Row type="flex" align="middle">
				<Printer size={16} strokeWidth={1} className="mr-3" /> <span>Print</span>
			</Row>
		</Menu.Item>
	</Menu>
);

const TimelinePeriod = ({ content }) => (
	<small
		className="text-muted"
		css={`
      display: block;
    `}
	>
		{content}
	</small>
);

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const DescriptionItem = ({ title, content }) => (
	<div className="text-muted mb-2">
		<p
			className="text-body mr-3"
			css={`
        display: inline-block;
      `}
		>
			{title}:
		</p>
		<small>{content}</small>
	</div>
);

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

const Social = ({ form, authentication, requests, editProfile, loading }) => {
	const editProf = editProfile;
	const [ state ] = useAppState();
	const [ activeTab, setActiveTab ] = useState('1');
	const [ autoCompleteResult, setAutoCompleteResult ] = useState([]);
	const { getFieldDecorator } = form;

	const prefixSelector = getFieldDecorator('prefix', {
		initialValue: '+234',
	})(
		<Select style={{ width: 'auto' }}>
			<Option value="+234">+234</Option>
		</Select>,
	);
	const handleWebsiteChange = (value) => {
		let autoCompleteResult;
		if (!value) {
			autoCompleteResult = [];
		} else {
			autoCompleteResult = [ '.com', '.org', '.net' ].map((domain) => `${value}${domain}`);
		}
		setAutoCompleteResult(autoCompleteResult);
	};

	const { _id, firstname, lastname, email, phonenumber, picture, about, address, usertype } = authentication.user;

	const websiteOptions = autoCompleteResult.map((website) => (
		<AutoCompleteOption key={website}>{website}</AutoCompleteOption>
	));

	const fetchIcon = (status) => {
		let icon;
		const val = status;
		switch (val) {
			case 'pending':
				icon = <AlertCircle size={16} strokeWidth={1} color={theme.errorColor} />;
				break;
			case 'active':
				icon = <Clock size={16} strokeWidth={1} />;
				break;
			case 'done':
				icon = <CheckCircle size={16} strokeWidth={1} color="green" />;
				break;
			default:
				icon = <AlertCircle size={16} strokeWidth={1} color={theme.errorColor} />;
				break;
		}
		return icon;
	};

	return (
		<div>
			<Card
				headStyle={{
					backgroundImage: 'url(/static/images/23.jpg)',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}}
				bodyStyle={{ padding: 0 }}
				className="mb-4 overflow-hidden w-100"
				// title={
				//   <Row type="flex" align="middle">
				//     <Avatar size={64} src="/static/images/avatar.jpg" />
				//     {!state.mobile && (
				//       <div
				//         className="px-4 text-light"
				//         css={`
				//           display: inline-block;
				//         `}
				//       >
				//         <h5 className="my-0 text-white">
				//           <span>John</span>
				//           <b> Doe</b>
				//         </h5>
				//         <small>UX Developer</small>
				//       </div>
				//     )}
				//   </Row>
				// }
			>
				<Menu
					onClick={(tab) => {
						if (activeTab !== tab.key) setActiveTab(tab.key);
					}}
					selectedKeys={[ activeTab ]}
					mode="horizontal"
					className="border-bottom-0"
				>
					<Menu.Item key="1">Profile</Menu.Item>
					<Menu.Item key="2">Activity</Menu.Item>
					<Menu.Item key="4">Edit Profile</Menu.Item>
				</Menu>
			</Card>

			<Row type="flex" gutter={16}>
				<Col xl={8} lg={12} md={24} sm={24} xs={24} order={state.mobile ? 1 : 2}>
					<Card bodyStyle={{ padding: 0 }} className="mb-4">
						<div className="px-4 pt-4">
							<Row type="flex" align="top" justify="space-between">
								<Col>
									<h5 className="m-0">
										<span>{firstname}</span> <b>{lastname}</b>
									</h5>
									<p className="mb-0" style={{ textTransform: 'capitalize' }}>
										{usertype}
									</p>
									<a
										href="javascript:;"
										css={`
                      display: block;
                    `}
									>
										{email}
									</a>
									<a
										href="javascript:;"
										css={`
                      display: block;
                    `}
									>
										{phonenumber}
									</a>
								</Col>
								<Col>
									<div className="text-center">
										<Avatar
											size={80}
											src={picture !== '' ? picture : '/static/images/avatar.jpg'}
										/>
									</div>
									<div className="m-1 text-center">
										{/* <p className="mb-1">Staff Rating</p>
                    <Tooltip title="100">
                      <Progress percent={80} />
                    </Tooltip> */}
									</div>
								</Col>
							</Row>
						</div>

						{/* <Divider orientation="left">
              <small>Stats</small>
            </Divider>

            <Row
              className="text-center w-100 px-4"
              type="flex"
              align="middle"
              justify="space-between"
            >
              <Col span={8}>
                <h2 className="m-0">
                  <b>230</b>
                </h2>
                <small>Work Assigned</small>
              </Col>
              <Col span={8}>
                <h2 className="m-0">
                  <b>120</b>
                </h2>
                <small>Outstanding</small>
              </Col>
              <Col span={8}>
                <h2 className="m-0">
                  <b>67</b>
                </h2>
                <small>Work Done</small>
              </Col>
            </Row> */}

						<Divider />
						<div className="px-4 pb-4">
							<p className="text-uppercase mb-4">
								<strong>About</strong>
							</p>
							<p>{about}</p>
						</div>
					</Card>
				</Col>

				<Col xl={16} lg={12} md={24} sm={24} xs={24} order={state.mobile ? 2 : 1}>
					{activeTab === '2' && (
						<Card title="Tasks">
							<Timeline pending="Tasks pending..." className="mt-2">
								{requests.requests.map((request) => (
									<Timeline.Item key={request._id} dot={fetchIcon(request.status)}>
										<div className="text-truncate">
											<TimelinePeriod content={new Date(request.timestart).toDateString()} />
											<span>
												<a>{request.name}</a>
											</span>
										</div>
									</Timeline.Item>
								))}
							</Timeline>
						</Card>
					)}

					{activeTab === '1' && (
						<Card bodyStyle={{ padding: 0 }}>
							<div className="p-4">
								<Row>
									<Col span={24}>
										<DescriptionItem title="Full Name" content={`${firstname} ${lastname}`} />
									</Col>
								</Row>
								{/* <Row>
                  <Col span={24}>
                    <DescriptionItem
                      title="Skills"
                      content="Plumbing, Electricity"
                    />
                  </Col>
                </Row> */}
							</div>

							<Divider orientation="left">
								<small>Contacts</small>
							</Divider>

							<div className="p-4">
								<Row>
									<Col span={24}>
										<DescriptionItem title="Email" content={email} />
									</Col>
									<Col span={24}>
										<DescriptionItem title="Phone Number" content={`+234${phonenumber}`} />
									</Col>
								</Row>
							</div>
						</Card>
					)}

					{/* {activeTab === '3' && (
            <Card>
              <Row>
                {MockContacts.map((contact, index) => (
                  <Col xs={24} sm={12} lg={12} xl={8} key={index}>
                    <Row type="flex" align="middle" className="w-100 mb-4">
                      {contact.avatar}
                      <span className="ml-4">
                        <span
                          css={`
                            display: block;
                          `}
                        >
                          {contact.name}
                        </span>
                        <small className="text-muted">
                          <span>{contact.status}</span>
                        </small>
                      </span>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Card>
          )} */}

					{activeTab === '4' && (
						<Card>
							<p>Change your profile picture</p>
							<Uploader
								uploadResponse={(data) => {
									if (data.picture) return editProf({ picture: data.picture }, _id);
								}}
							/>
							<hr />
							<Form
								onSubmit={(e) => {
									e.preventDefault();
									form.validateFields((err, values) => {
										if (!err) {
											Message.warning('Loading...').then(() => editProf(values, _id));
										}
									});
								}}
							>
								<FormItem {...formItemLayout} label="First name">
									{getFieldDecorator('firstname', {
										rules: [
											{
												required: true,
												message: 'Please input your First name!',
											},
										],
										initialValue: firstname,
									})(<Input />)}
								</FormItem>

								<FormItem {...formItemLayout} label="Last name">
									{getFieldDecorator('lastname', {
										rules: [
											{
												required: true,
												message: 'Please input your Last name!',
											},
										],
										initialValue: lastname,
									})(<Input />)}
								</FormItem>

								<FormItem {...formItemLayout} label="E-mail">
									{getFieldDecorator('email', {
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
										initialValue: email,
									})(<Input disabled />)}
								</FormItem>

								<FormItem {...formItemLayout} label="Phone Number">
									{getFieldDecorator('phonenumber', {
										rules: [
											{
												required: true,
												message: 'Please input your phone number!',
											},
										],
										initialValue: phonenumber,
									})(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
								</FormItem>

								<Divider />

								<FormItem {...formItemLayout} label="Address">
									{getFieldDecorator('address', {
										rules: [
											{
												required: true,
												message: 'Please input your address',
											},
										],
										initialValue: address,
									})(<Input placeholder="Street Name, Area, City, State" />)}
								</FormItem>

								<FormItem {...formItemLayout} label="About">
									{getFieldDecorator('about', {
										rules: [
											{
												required: true,
												message: 'Please input info about yourself!',
											},
										],
										initialValue: about,
									})(<TextArea />)}
								</FormItem>

								<FormItem {...formItemLayout} label="Password">
									{getFieldDecorator('password', {
										rules: [
											{
												message: 'Please enter your password update',
											},
										],
									})(<Input type="password" placeholder="Password" />)}
								</FormItem>
								<FormItem {...formItemLayout} label="Confirm Password">
									{getFieldDecorator('confirm', {
										rules: [
											{
												message: 'Please confirm your password',
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
									})(<Input type="password" placeholder="Confirm Password" />)}
								</FormItem>
								<FormItem {...tailFormItemLayout}>
									<Button type="primary" loading={loading} htmlType="submit">
										Save information
									</Button>
								</FormItem>
							</Form>
						</Card>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default connect((state) => state, { editProfile })(Form.create()(Social));
