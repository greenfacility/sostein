import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Layout,
  List,
  Menu,
  Row,
  Select
} from 'antd';
import {
  CheckCircle,
  Circle,
  Heart,
  MessageCircle,
  RefreshCcw,
  Star,
  User
} from 'react-feather';

import MOCKMESSAGES from '../demos/mock/messages';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import styled from 'styled-components';
import { useAppState } from './shared/AppProvider';
import { useState } from 'react';

const { Sider } = Layout;
const { Option } = Select;

const Fab = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 40px;
  right: 2rem;
  padding: 0 2rem;
  margin-bottom: 2rem;
`;

const Messages = ({ form } = props) => {
  const [state] = useAppState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [replyBox, setBox] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const [messages, setMessages] = useState(false);
  const selectedMessage = MOCKMESSAGES[selectedIndex];

  const createMarkup = body => {
    return { __html: body };
  };

  const navigationSidebar = (
    <div className="h-100">
      <div className="p-4">
        <Button type="primary" onClick={() => setBox(!replyBox)}>
          Compose
        </Button>
      </div>
      <div className="px-4">
        <small>
          <b>Mailboxes</b>
        </small>
      </div>
      <Menu mode="inline" className="mb-3 border-right-0">
        <Menu.Item key="1">Inbox</Menu.Item>
        <Menu.Item key="2">Sent mail</Menu.Item>
        <Menu.Item key="3">Starred</Menu.Item>
        <Menu.Item key="4">Drafts</Menu.Item>
        <Menu.Item key="5">Trash</Menu.Item>
      </Menu>

      <div className="px-4">
        <small>
          <b>Tags</b>
        </small>
      </div>
      <Menu mode="inline" className="border-0">
        <Menu.Item key="1">
          <Circle
            size={10}
            strokeWidth={1}
            fill={'currentColor'}
            className="mr-3 text-error"
          />
          Personal
        </Menu.Item>
        <Menu.Item key="2">
          <Circle
            size={10}
            strokeWidth={1}
            fill={'currentColor'}
            className="mr-3 text-success"
          />
          Clients
        </Menu.Item>
        <Menu.Item key="3">
          <Circle
            size={10}
            strokeWidth={1}
            fill={'currentColor'}
            className="mr-3 text-normal"
          />
          Family
        </Menu.Item>
        <Menu.Item key="4">
          <Circle
            size={10}
            strokeWidth={1}
            fill={'currentColor'}
            className="mr-3 text-primary"
          />
          Friends
        </Menu.Item>
      </Menu>
    </div>
  );

  const messagesSidebar = (
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
      <Menu mode="horizontal" className="border-0 m-auto">
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
      <List
        className="scroll-y flex-1 bg-transparent px-3 py-1"
        itemLayout="horizontal"
        dataSource={MOCKMESSAGES}
        renderItem={(item, index) => (
          <List.Item
            onClick={() => setSelectedIndex(index)}
            style={{
              backgroundColor: selectedIndex === index ? '#e6f7ff' : ''
            }}
            className={`${
              selectedIndex === index ? '' : 'border-0'
            } rounded border-0 p-3`}
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
                  <span>{item.from}</span>
                  <span className="mr-auto" />
                  <span>{distanceInWordsToNow(new Date(item.date))}</span>
                </small>
              }
              description={item.subject}
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <>
      <Layout className="fill-workspace rounded shadow-sm overflow-hidden">
        {!state.mobile && <Sider width={150}>{navigationSidebar}</Sider>}
        <Drawer
          closable={false}
          width={150}
          placement="left"
          onClose={() => setNavigation(false)}
          visible={navigation}
          className="chat-drawer"
        >
          {navigationSidebar}
        </Drawer>
        {!state.mobile && <Sider width={350}>{messagesSidebar}</Sider>}
        <Drawer
          closable={false}
          width={350}
          placement="left"
          onClose={() => setMessages(false)}
          visible={messages}
          className="chat-drawer"
        >
          {messagesSidebar}
        </Drawer>
        <div
          className="p-5 scroll-y"
          css={`
            background: #f5f5f5;
          `}
        >
          <div className={`${state.mobile ? 'px-1 py-3' : 'px-5 py-3'}`}>
            <div
              className="mb-3"
              css={`
                display: flex;
              `}
            >
              {selectedMessage.avatar}
              <div className="pl-3">
                <h6>{selectedMessage.from}</h6>
                <small>
                  {format(new Date(selectedMessage.date), 'MMMM Do YYYY hh:mm')}
                </small>
              </div>
            </div>
            <h5 className="my-4">{selectedMessage.subject}</h5>
            <div dangerouslySetInnerHTML={createMarkup(selectedMessage.body)} />

            {state.mobile && (
              <Fab>
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  onClick={() => setNavigation(true)}
                  className="mb-3"
                >
                  <MessageCircle size={20} strokeWidth={1} />
                </Button>
                <span className="mr-auto" />
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  onClick={() => setMessages(true)}
                >
                  <User size={20} strokeWidth={1} />
                </Button>
              </Fab>
            )}
          </div>
        </div>
      </Layout>

      <Drawer
        title="Compose"
        width={720}
        placement="right"
        onClose={() => setBox(!replyBox)}
        maskClosable={false}
        visible={replyBox}
        style={{
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: 53
        }}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Name">
                {form.getFieldDecorator('name', {
                  rules: [{ required: true, message: 'please enter user name' }]
                })(<Input placeholder="please enter user name" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Url">
                {form.getFieldDecorator('url', {
                  rules: [{ required: true, message: 'please enter url' }]
                })(
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="please enter url"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Owner">
                {form.getFieldDecorator('owner', {
                  rules: [{ required: true, message: 'Please select an owner' }]
                })(
                  <Select placeholder="Please select an owner">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Type">
                {form.getFieldDecorator('type', {
                  rules: [{ required: true, message: 'Please choose the type' }]
                })(
                  <Select placeholder="Please choose the type">
                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Approver">
                {form.getFieldDecorator('approver', {
                  rules: [
                    { required: true, message: 'Please choose the approver' }
                  ]
                })(
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="DateTime">
                {form.getFieldDecorator('dateTime', {
                  rules: [
                    { required: true, message: 'Please choose the dateTime' }
                  ]
                })(
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentNode}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Description">
                {form.getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'please enter url description'
                    }
                  ]
                })(
                  <Input.TextArea
                    rows={4}
                    placeholder="please enter url description"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px'
          }}
        >
          <Button
            style={{
              marginRight: 8
            }}
            onClick={() => setBox(!replyBox)}
          >
            Cancel
          </Button>
          <Button onClick={() => setBox(!replyBox)}>Submit</Button>
        </div>
      </Drawer>
    </>
  );
};

export default Form.create()(Messages);
