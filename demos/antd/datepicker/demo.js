import { Card, Col, Divider, Row } from 'antd';

import Basic from './basic';
import DateRender from './date-render';
import Disabled from './disabled';
import DisabledDate from './disabled-date';
import ExtraFooter from './extra-footer';
import Format from './format';
import Mode from './mode';
import Presetted from './presetted-ranges';
import Size from './size';
import StartEnd from './start-end';
import Suffix from './suffix';
import Time from './time';

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={16} id="components-datepicker-demo">
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Basic</small>
            </Divider>
            <div className="p-4">
              <Basic />
            </div>

            <Divider orientation="left">
              <small>Date render</small>
            </Divider>
            <div className="p-4">
              <DateRender />
            </div>

            <Divider orientation="left">
              <small>Disabled date</small>
            </Divider>
            <div className="p-4">
              <DisabledDate />
            </div>

            <Divider orientation="left">
              <small>Disabled</small>
            </Divider>
            <div className="p-4">
              <Disabled />
            </div>

            <Divider orientation="left">
              <small>Extra footer</small>
            </Divider>
            <div className="p-4">
              <ExtraFooter />
            </div>

            <Divider orientation="left">
              <small>Format</small>
            </Divider>
            <div className="p-4">
              <Format />
            </div>

            <Divider orientation="left">
              <small>Mode</small>
            </Divider>
            <div className="p-4">
              <Mode />
            </div>
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Presetted ranges</small>
            </Divider>
            <div className="p-4">
              <Presetted />
            </div>

            <Divider orientation="left">
              <small>Size</small>
            </Divider>
            <div className="p-4">
              <Size />
            </div>

            <Divider orientation="left">
              <small>Start end</small>
            </Divider>
            <div className="p-4">
              <StartEnd />
            </div>

            <Divider orientation="left">
              <small>Suffix</small>
            </Divider>
            <div className="p-4">
              <Suffix />
            </div>

            <Divider orientation="left">
              <small>Time</small>
            </Divider>
            <div className="p-4">
              <Time />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
