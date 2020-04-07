import {
	Anchor,
	CheckCircle,
	Heart,
	Image,
	MessageCircle,
	Mic,
	RefreshCcw,
	Search as SearchIcon,
	Settings,
	Send,
	Star,
} from 'react-feather';
import { Avatar, Button, Drawer, Input, Layout, List, Menu, Row } from 'antd';

import ChatStyled from './styles/Chat';
import MockChats from '../demos/mock/chats';
import MockContacts from '../demos/mock/contacts';
import format from 'date-fns/format';
import styled from 'styled-components';
import { useAppState } from './shared/AppProvider';
import { useState } from 'react';

const { Sider, Header } = Layout;
const { TextArea, Search } = Input;
const { SubMenu } = Menu;

const Fab = styled.div`
	position: fixed;
	bottom: 0;
	z-index: 1;
	width: 40px;
	right: 2rem;
	padding: 0 2rem;
	margin-bottom: 2rem;
`;

const Chat = () => {
	const [ state, dispatch ] = useAppState();
	const [ selectedIndex, setSelectedIndex ] = useState(0);
	const [ profile, setProfile ] = useState(false);
	const [ contacts, setContacts ] = useState(false);

	const messageHeader = (
		<Menu mode="horizontal" className="border-0">
			<Menu.Item key="read">
				<a href="javascript:;">
					<CheckCircle size={20} strokeWidth={1} />
				</a>
			</Menu.Item>
			<Menu.Item key="favorite">
				<a href="javascript:;">
					<Heart size={20} strokeWidth={1} />
				</a>
			</Menu.Item>
			<Menu.Item key="star">
				<a href="javascript:;">
					<Star size={20} strokeWidth={1} />
				</a>
			</Menu.Item>
			<Menu.Item key="refresh">
				<a href="javascript:;">
					<RefreshCcw size={20} strokeWidth={1} />
				</a>
			</Menu.Item>
		</Menu>
	);

	const messageFooter = (
		<div className="py-3 px-3">
			<Search placeholder="Search contact" />
		</div>
	);

	const messagesSidebar = (
		<List
			className="scroll-y flex-1 bg-transparent"
			itemLayout="horizontal"
			dataSource={MockContacts}
			renderItem={(item, index) => (
				<List.Item
					onClick={() => setSelectedIndex(index)}
					style={{
						backgroundColor: selectedIndex === index ? '#e6f7ff' : '',
					}}
					className={`${selectedIndex === index ? '' : 'border-0'} border-0 px-4 py-3`}
				>
					<List.Item.Meta
						avatar={item.avatar}
						title={
							<small
								css={`
                  display: flex;
                  width: 100%;
                `}
							>
								<span className={`${selectedIndex === index ? 'ant-menu-item-selected' : ''} `}>
									{item.name}
								</span>
							</small>
						}
						description={<span>{item.status}</span>}
					/>
				</List.Item>
			)}
		/>
	);

	return (
		<Layout style={{}} className="fill-workspace rounded shadow-sm overflow-hidden">
			<Header
				css={`
          display: flex;
          align-items: center;
          padding: 0.3rem 2rem;
          z-index: 1;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02);
          height: auto;
          line-height: auto;
        `}
			>
				{state.mobile && (
					<Button shape="circle" size="large" onClick={() => setContacts(true)} className="mr-3">
						<MessageCircle size={20} strokeWidth={1} />
					</Button>
				)}
				<Row type="flex" align="middle">
					<Avatar shape="circle" size={40} src="/static/images/avatar.jpg" />
					{!state.mobile && (
						<span
							className="ml-3"
							css={`
								line-height: 1;
							`}
						>
							<span
								css={`
									display: block;
								`}
							>
								John Doe
							</span>
							<small className="text-muted">
								<span>Online</span>
							</small>
						</span>
					)}
				</Row>
				<span className="mr-auto" />
				{/* <Menu mode="horizontal" className="border-0">
					<Menu.Item>
						<SearchIcon size={20} strokeWidth={1} />
					</Menu.Item>
					<Menu.Item>
						<Settings size={20} strokeWidth={1} />
					</Menu.Item>
				</Menu> */}
			</Header>
			<Layout>
				{!state.mobile && (
					<Sider width={260}>
						<div
							css={`
                display: flex;
                flex: 1;
                flex-direction: column;
                height: 100%;
                border-right: 1px solid rgba(0, 0, 0, 0.05);
              `}
						>
							{messageHeader}
							{messagesSidebar}
							{messageFooter}
						</div>
					</Sider>
				)}
				<Drawer
					title={messageHeader}
					closable={false}
					width={240}
					placement="left"
					onClose={() => setContacts(false)}
					visible={contacts}
					className="chat-drawer"
				>
					<div
						css={`
              display: flex;
              flex: 1;
              flex-direction: column;
              height: 100%;
              overflow: hidden;
            `}
					>
						{messagesSidebar}
						{messageFooter}
					</div>
				</Drawer>
				<Layout>
					<div
						css={`
              display: flex;
              flex: 1;
              flex-direction: column;
              height: 100%;
              overflow: hidden;
            `}
					>
						<ChatStyled>
							<React.Fragment>
								{MockChats.map((chat, index) => (
									<div
										key={index}
										className={`conversation
                        ${chat.type === 'sent' ? 'conversation-sent' : 'conversation-received'}
                      `}
									>
										<div
											className={`
                          body shadow-sm
                          ${chat.type === 'sent' ? 'body-sent' : 'body-received text-body'}
                        `}
										>
											<p color="inherit">{chat.message}</p>
											<p
												variant="caption"
												className={`
                            date
                            ${chat.type === 'sent' ? 'date-sent' : 'date-received'}
                          `}
											>
												{format(chat.date, 'hh:mm')}
											</p>
										</div>
									</div>
								))}
							</React.Fragment>
						</ChatStyled>
						<div
							className="px-3 py-2"
							css={`
                background: #f9f9f9;
              `}
						>
							<div
								css={`
                  display: flex;
                  align-items: center;
                `}
							>
								{/* <Menu
                  mode="horizontal"
                  className="border-bottom-0 bg-transparent"
                >
                  <Menu.Item key="read">
                    <a href="javascript:;">
                      <Image size={20} strokeWidth={1} />
                    </a>
                  </Menu.Item>
                  <Menu.Item key="favorite">
                    <a href="javascript:;">
                      <Anchor size={20} strokeWidth={1} />
                    </a>
                  </Menu.Item>
                  <Menu.Item key="star">
                    <a href="javascript:;">
                      <Mic size={20} strokeWidth={1} />
                    </a>
                  </Menu.Item>
                </Menu> */}

								<TextArea placeholder="Type a message" autosize />
								<Menu mode="horizontal" className="border-bottom-0 bg-transparent">
									<Button>
										<Send size={20} strokeWidth={1} />
									</Button>
								</Menu>
							</div>
						</div>
					</div>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default Chat;
