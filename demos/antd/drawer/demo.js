import { Card, Col, Divider, Row } from 'antd';

import Basic from './basic-right';
import FromDrawer from './from-drawer';
import MultiLevel from './multi-level-drawer';
import Placement from './placement';
import UserProfile from './user-profile';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }}>
        <Row gutter={16} id="components-drawer-demo">
          <Col lg={24} md={24}>
            <div className="p-4">
              <Basic />
            </div>

            <Divider orientation="left">
              <small>Edit item in drawer</small>
            </Divider>
            <div className="p-4">
              <FromDrawer />
            </div>

            <Divider orientation="left">
              <small>Multi level drawer</small>
            </Divider>
            <div className="p-4">
              <MultiLevel />
            </div>

            <Divider orientation="left">
              <small>Custom placement</small>
            </Divider>
            <div className="p-4">
              <Placement />
            </div>

            <Divider orientation="left">
              <small>Preview drawer</small>
            </Divider>
            <div className="p-4">
              <UserProfile />
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Demo;
