import { Card, Col, Divider, Row } from 'antd';

import Autoplay from './autoplay';
import Basic from './basic';
import Fade from './fade';
import Vertical from './vertical';

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={16} id="components-carousel-demo">
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Basic</small>
            </Divider>
            <div className="p-4">
              <Basic />
            </div>

            <Divider orientation="left">
              <small>Fade in</small>
            </Divider>
            <div className="p-4">
              <Fade />
            </div>
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Vertical</small>
            </Divider>
            <div className="p-4">
              <Vertical />
            </div>

            <Divider orientation="left">
              <small>Scroll automatically</small>
            </Divider>
            <div className="p-4">
              <Autoplay />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
