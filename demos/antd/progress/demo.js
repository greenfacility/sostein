import { Card, Col, Divider, Row } from 'antd';

import Circle from './circle';
import CircleDynamic from './circle-dynamic';
import CircleMini from './circle-mini';
import Dashboard from './dashboard';
import Dynamic from './dynamic';
import Format from './format';
import Line from './line';
import LineCap from './linecap';
import LineMini from './line-mini';
import Segment from './segment';

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={16} id="components-progress-demo">
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Progress bar</small>
            </Divider>
            <div className="p-4">
              <Line />
            </div>

            <Divider orientation="left">
              <small>Mini size progress bar</small>
            </Divider>
            <div className="p-4">
              <LineMini />
            </div>

            <Divider orientation="left">
              <small>Dynamic circular progress bar</small>
            </Divider>
            <div className="p-4">
              <CircleDynamic />
            </div>

            <Divider orientation="left">
              <small>Custom text format</small>
            </Divider>
            <div className="p-4">
              <Format />
            </div>

            <Divider orientation="left">
              <small>Progress bar with success segment</small>
            </Divider>
            <div className="p-4">
              <Segment />
            </div>
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Circlular progress bar</small>
            </Divider>
            <div className="p-4">
              <Circle />
            </div>

            <Divider orientation="left">
              <small>Mini size circular progress bar</small>
            </Divider>
            <div className="p-4">
              <CircleMini />
            </div>

            <Divider orientation="left">
              <small>Dynamic</small>
            </Divider>
            <div className="p-4">
              <Dynamic />
            </div>

            <Divider orientation="left">
              <small>Dashboard</small>
            </Divider>
            <div className="p-4">
              <Dashboard />
            </div>

            <Divider orientation="left">
              <small>Square linecaps</small>
            </Divider>
            <div className="p-4">
              <LineCap />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
