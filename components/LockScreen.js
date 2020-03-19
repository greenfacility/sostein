import { Avatar, Button, Form, Input, Row } from 'antd';

import { Eye } from 'react-feather';
import Link from 'next/link';
import styled from 'styled-components';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const LockScreen = ({ form }) => (
  <Row
    type="flex"
    align="middle"
    justify="center"
    className="px-3 bg-white"
    style={{ minHeight: '100vh' }}
  >
    <Content>
      <div className="text-center mb-4">
        <Avatar src="/static/images/avatar.jpg" size={80} />
        <h6 className="mt-3">John Doe</h6>
      </div>

      <Form layout="vertical">
        <FormItem>
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={
                <Eye
                  size={16}
                  strokeWidth={1}
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" block>
            Unlock
          </Button>
        </FormItem>

        <div className="text-center">
          <small className="text-muted text-center">
            <span>Not your account?</span>
            <Link href="/signin">
              <a>Sign in here!</a>
            </Link>
          </small>
        </div>
      </Form>
    </Content>
  </Row>
);

export default Form.create()(LockScreen);
