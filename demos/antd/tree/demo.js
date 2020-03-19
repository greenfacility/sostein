import { Card, Col, Divider, Row } from 'antd';

import Basic from './basic';
import Controlled from './basic-controlled';
import Customized from './customized-icon';
import Directory from './directory';
import Draggable from './draggable';
import Dynamic from './dynamic';
import Line from './line';
import Search from './search';

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={16} id="components-button-demo">
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Basic</small>
            </Divider>
            <div className="p-4">
              <Basic />
            </div>

            <Divider orientation="left">
              <small>Draggable</small>
            </Divider>
            <div className="p-4">
              <Draggable />
            </div>

            <Divider orientation="left">
              <small>Searchable</small>
            </Divider>
            <div className="p-4">
              <Search />
            </div>

            <Divider orientation="left">
              <small>Customize icon</small>
            </Divider>
            <div className="p-4">
              <Customized />
            </div>
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Basic controlled</small>
            </Divider>
            <div className="p-4">
              <Controlled />
            </div>

            <Divider orientation="left">
              <small>Load data asynchronously</small>
            </Divider>
            <div className="p-4">
              <Dynamic />
            </div>

            <Divider orientation="left">
              <small>Tree with line</small>
            </Divider>
            <div className="p-4">
              <Line />
            </div>

            <Divider orientation="left">
              <small>Directory</small>
            </Divider>
            <div className="p-4">
              <Directory />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
