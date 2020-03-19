import { Card, Col, Divider, Row } from 'antd';

import Basic from './basic';
import Changer from './changer';
import Controlled from './controlled';
import ItemRender from './itemRender';
import Jump from './jump';
import Mini from './mini';
import More from './more';
import Simple from './simple';
import Total from './total';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }}>
        <Row gutter={16} id="components-pagination-demo">
          <Col lg={24} md={24}>
            <div className="p-4">
              <Basic />
            </div>

            <Divider orientation="left">
              <small>Changer</small>
            </Divider>
            <div className="p-4">
              <Changer />
            </div>

            <Divider orientation="left">
              <small>Controlled</small>
            </Divider>
            <div className="p-4">
              <Controlled />
            </div>

            <Divider orientation="left">
              <small>Item render</small>
            </Divider>
            <div className="p-4">
              <ItemRender />
            </div>

            <Divider orientation="left">
              <small>Jump</small>
            </Divider>
            <div className="p-4">
              <Jump />
            </div>

            <Divider orientation="left">
              <small>Mini</small>
            </Divider>
            <div className="p-4">
              <Mini />
            </div>

            <Divider orientation="left">
              <small>More</small>
            </Divider>
            <div className="p-4">
              <More />
            </div>

            <Divider orientation="left">
              <small>Simple</small>
            </Divider>
            <div className="p-4">
              <Simple />
            </div>

            <Divider orientation="left">
              <small>Total</small>
            </Divider>
            <div className="p-4">
              <Total />
            </div>
          </Col>
          <Col lg={12} md={24} />
        </Row>
      </Card>
    );
  }
}

export default Demo;
