import { Card, Col, Divider, Row } from 'antd';

import Banner from './banner';
import Basic from './basic';
import Closable from './closable';
import Close from './close-text';
import Custom from './custom-icon';
import Description from './description';
import Icon from './icon';
import Smooth from './smooth-closed';
import Style from './style';

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={16} id="components-alert-demo">
        <Col lg={24} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <div className="p-4">
              <Basic />
            </div>

            <Divider orientation="left">
              <small>Banner</small>
            </Divider>
            <div className="p-4">
              <Banner />
            </div>

            <Divider orientation="left">
              <small>Closable</small>
            </Divider>
            <div className="p-4">
              <Closable />
            </div>

            <Divider orientation="left">
              <small>Close text</small>
            </Divider>
            <div className="p-4">
              <Close />
            </div>

            <Divider orientation="left">
              <small>Custom icon</small>
            </Divider>
            <div className="p-4">
              <Custom />
            </div>

            <Divider orientation="left">
              <small>Description</small>
            </Divider>
            <div className="p-4">
              <Description />
            </div>

            <Divider orientation="left">
              <small>Icon</small>
            </Divider>
            <div className="p-4">
              <Icon />
            </div>

            <Divider orientation="left">
              <small>Smooth closed</small>
            </Divider>
            <div className="p-4">
              <Smooth />
            </div>

            <Divider orientation="left">
              <small>Style</small>
            </Divider>
            <div className="p-4">
              <Style />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
