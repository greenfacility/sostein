import { Avatar, Badge, Layout, List, Menu } from 'antd';
import { BarChart, Bell, ChevronsDown, Maximize, Minimize, Settings, Triangle } from 'react-feather';
import DashHeader, { Notification } from './styles/Header';

import Link from 'next/link';
import MockNotifications from '../demos/mock/notifications';
import { useAppState } from './shared/AppProvider';
import { useState } from 'react';
import { connect } from 'react-redux';
import { deauthenticate } from '../redux/actions';

const { SubMenu } = Menu;
const { Header } = Layout;

const MainHeader = (props) => {
	const [ state, dispatch ] = useAppState();
	const [ notifications ] = useState(MockNotifications);
	return (
		<DashHeader>
			<Header>
				{state.mobile && (
					<a onClick={() => dispatch({ type: 'mobileDrawer' })} className="trigger">
						<BarChart size={20} strokeWidth={1} />
					</a>
				)}
				<Link href="/">
					<a className="brand">
						{/* <Triangle size={24} strokeWidth={1} fill="green" />
						<strong className="mx-1 text-black">{state.name}</strong> */}
						<img src="/images/logo.png" alt="green facilities ltd" style={{ height: '45px' }} />
					</a>
				</Link>

				<Menu mode="horizontal" className="menu-divider">
					{!state.mobile && (
						<Menu.Item>
							<Link href="/">
								<a>Home</a>
							</Link>
						</Menu.Item>
					)}

					{!state.mobile && (
						<Menu.Item>
							<Link href="/about">
								<a>About</a>
							</Link>
						</Menu.Item>
					)}

					{!state.mobile && (
						<Menu.Item>
							<Link href="/contact">
								<a>Contact</a>
							</Link>
						</Menu.Item>
					)}

					{!state.mobile && (
						<Menu.Item>
							<Link href="/service">
								<a>Service</a>
							</Link>
						</Menu.Item>
					)}
				</Menu>

				<span className="mr-auto" />

				<Menu mode="horizontal">
					{/* {!state.mobile && (
            <Menu.Item onClick={() => dispatch({ type: 'fullscreen' })}>
              {!state.fullscreen ? (
                <Maximize size={20} strokeWidth={1} />
              ) : (
                <Minimize size={20} strokeWidth={1} />
              )}
            </Menu.Item>
          )}
          <Menu.Item onClick={() => dispatch({ type: 'options' })}>
            <Settings size={20} strokeWidth={1} />
          </Menu.Item> */}
					{/* <SubMenu
						title={
							<Badge count={5}>
								<span className="submenu-title-wrapper">
									<Bell size={20} strokeWidth={1} />
								</span>
							</Badge>
						}
					>
						<Menu.Item className="p-0 bg-transparent" style={{ height: 'auto' }}>
							<List
								className="header-notifications"
								itemLayout="horizontal"
								dataSource={notifications}
								footer={<div>5 Notifications</div>}
								renderItem={(item) => (
									<Notification>
										<List.Item>
											<List.Item.Meta
												avatar={item.avatar}
												title={<a href="javascript:;">{item.title}</a>}
												description={<small>{item.description}</small>}
											/>
										</List.Item>
									</Notification>
								)}
							/>
						</Menu.Item>
					</SubMenu> */}
					{/* {state.mobile && (
						<SubMenu title={<ChevronsDown size={20} strokeWidth={1} />}>
							<Menu.Item>Home</Menu.Item>
							<Menu.Item>About</Menu.Item>
							<Menu.Item>Privacy</Menu.Item>
							<Menu.Item>Service</Menu.Item>
						</SubMenu>
					)} */}

					{props.authentication.token && (
						<SubMenu
							title={
								<Avatar
									src={
										props.authentication.user.picture !== '' ? (
											props.authentication.user.picture
										) : (
											'/static/images/avatar.jpg'
										)
									}
								/>
							}
						>
							<Menu.Item>
								<Link href="/profile">Profile</Link>
							</Menu.Item>
							<Menu.Divider />
							<Menu.Item onClick={props.deauthenticate}>Signout</Menu.Item>
						</SubMenu>
					)}
				</Menu>
			</Header>
		</DashHeader>
	);
};

export default connect((state) => state, { deauthenticate })(MainHeader);
