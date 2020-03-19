import { Card, Col, Divider, Row } from 'antd';

import Basic from './basic';
import BorderLess from './border-less';
import FlexibleContent from './flexible-content';
import GridCard from './grid-card';
import InColumn from './in-column';
import Inner from './inner';
import Loading from './loading';
import Meta from './meta';
import Simple from './simple';
import Tabs from './tabs';

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={16} id="components-button-demo">
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Basic card</small>
            </Divider>
            <div className="p-4">
              <Basic />
            </div>

            <Divider orientation="left">
              <small>No border</small>
            </Divider>
            <div className="p-4">
              <BorderLess />
            </div>

            <Divider orientation="left">
              <small>Simple card</small>
            </Divider>
            <div className="p-4">
              <Simple />
            </div>

            <Divider orientation="left">
              <small>Customized content</small>
            </Divider>
            <div className="p-4">
              <FlexibleContent />
            </div>

            <Divider orientation="left">
              <small>Card in column</small>
            </Divider>
            <div className="p-4">
              <InColumn />
            </div>

            <Divider orientation="left">
              <small>Loading card</small>
            </Divider>
            <div className="p-4">
              <Loading />
            </div>
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Grid card</small>
            </Divider>
            <div className="p-4">
              <GridCard />
            </div>

            <Divider orientation="left">
              <small>Inner card</small>
            </Divider>
            <div className="p-4">
              <Inner />
            </div>

            <Divider orientation="left">
              <small>With tabs</small>
            </Divider>
            <div className="p-4">
              <Tabs />
            </div>

            <Divider orientation="left">
              <small>Support more content configuration</small>
            </Divider>
            <div className="p-4">
              <Meta />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
