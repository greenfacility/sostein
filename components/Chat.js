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
import { compareId, database } from '../lib/chat-config';
// import MockContacts from '../demos/mock/contacts';
import format from 'date-fns/format';
import styled from 'styled-components';
import { useAppState } from './shared/AppProvider';
import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

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

const Chat = (props) => {
	const [ state, dispatch ] = useAppState();
	const [ selectedIndex, setSelectedIndex ] = useState(null);
	const [ profile, setProfile ] = useState(false);
	const [ newtext, setNewText ] = useState('');
	const [ contacts, setContacts ] = useState(false);
	const [ currentChat, setCurrentChat ] = useState('');

	const sendMessage = () => {
		// console.log(newtext, currentChat, props.authentication.user._id, Date.now());
		if (newtext === '') return;
		database.push(
			{
				message: newtext,
				senderId: props.authentication.user._id,
				date: Date.now(),
				chatId: currentChat,
			},
			(err) => {
				if (err) return console.log(err);
				setNewText('');
			},
		);
	};

	const myContacts = () => {
		let arr = [];
		props.authentication.users.map((cont) => {
			if (
				(cont.usertype === 'manager' || cont.usertype === 'team-member') &&
				cont._id !== props.authentication.user._id
			) {
				arr.push({
					_id: cont._id,
					name: `${cont.firstname} ${cont.lastname}`,
					status: cont.usertype,
					avatar: <Avatar size={48} src={cont.picture !== '' ? cont.picture : '/static/images/avatar.jpg'} />,
				});
			}
		});
		return arr;
	};

	const onContactClick = (item, index) => {
		const chatId = compareId(item._id, props.authentication.user._id);
		// console.log(chatId, item);
		setCurrentChat(chatId);
		setSelectedIndex(index);
	};

	const deleteChat = (cht) => {
		if (cht.senderId !== props.authentication.user._id) return;
		database.child(cht.id).remove((err) => {
			if (err) console.log(err);
		});
	};
	const chatsEndRef = useRef(null);
	const scrollToBottom = () => {
		chatsEndRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(scrollToBottom, [ props.chats ]);

	// const messageFooter = (
	// 	<div className="py-3 px-3">
	// 		<Search placeholder="Search contact" />
	// 	</div>
	// );

	const messagesSidebar = (
		<List
			className="scroll-y flex-1 bg-transparent"
			itemLayout="horizontal"
			dataSource={myContacts()}
			renderItem={(item, index) => (
				<List.Item
					onClick={() => onContactClick(item, index)}
					style={{
						backgroundColor: selectedIndex === index ? '#e6f7ff' : '',
						cursor: 'pointer',
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
					<Avatar
						shape="circle"
						size={40}
						src={
							props.authentication.user.picture !== '' ? (
								props.authentication.user.picture
							) : (
								'/static/images/avatar.jpg'
							)
						}
					/>
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
								{props.authentication.user.firstname} {props.authentication.user.lastname}
							</span>
							<small className="text-muted">
								<span>Online</span>
							</small>
						</span>
					)}
				</Row>
				<span className="mr-auto" />
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
				overflow: hidden;
                border-right: 1px solid rgba(0, 0, 0, 0.05);
              `}
						>
							{/* {messageHeader} */}
							{messagesSidebar}
							{/* {messageFooter} */}
						</div>
					</Sider>
				)}
				<Drawer
					// title={messageHeader}
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
						{/* {messageFooter} */}
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
								{currentChat === '' ? (
									<div style={{ textAlign: 'center', color: 'brown' }}>Select A Contact</div>
								) : (
									props.chats.filter((dt) => dt.chatId == currentChat).map((chat, index) => (
										<div
											key={index}
											className={`conversation
                        ${chat.senderId === props.authentication.user._id
							? 'conversation-sent'
							: 'conversation-received'}
					  `}
											onDoubleClick={() => deleteChat(chat)}
										>
											<div
												className={`
                          body shadow-sm
                          ${chat.senderId === props.authentication.user._id ? 'body-sent' : 'body-received text-body'}
                        `}
											>
												<p color="inherit">{chat.message}</p>
												<p
													variant="caption"
													className={`
                            date
                            ${chat.senderId === props.authentication.user._id ? 'date-sent' : 'date-received'}
                          `}
												>
													{format(chat.date, 'hh:mm DD/MM/YYYY')}
												</p>
											</div>
										</div>
									))
								)}
							</React.Fragment>
							<div ref={chatsEndRef} />
						</ChatStyled>
						<div
							className="px-3 py-2"
							css={`
                background: #f9f9f9;
              `}
						>
							{currentChat !== '' && (
								<div
									css={`
                  display: flex;
                  align-items: center;
                `}
								>
									<TextArea
										placeholder="Type a message"
										onChange={(e) => setNewText(e.target.value)}
										value={newtext}
										autosize
									/>
									<Menu
										mode="horizontal"
										onClick={sendMessage}
										className="border-bottom-0 bg-transparent"
									>
										<Button>
											<Send size={20} strokeWidth={1} />
										</Button>
									</Menu>
								</div>
							)}
						</div>
					</div>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default connect((state) => state, {})(Chat);
