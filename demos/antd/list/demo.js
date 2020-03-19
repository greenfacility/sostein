import { Card, Col, Divider, Row } from 'antd';

import Basic from './basic';
import Grid from './grid';
import InfiniteLoad from './infinite-load';
import Loadmore from './loadmore';
import Responsive from './resposive';
import Simple from './simple';
import Vertical from './vertical';
import Virtualized from './infinite-virtualized-load';

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
              <small>Simple</small>
            </Divider>
            <div className="p-4">
              <Simple />
            </div>

            <Divider orientation="left">
              <small>Load more</small>
            </Divider>
            <div className="p-4">
              <Loadmore />
            </div>

            <Divider orientation="left">
              <small>Vertical</small>
            </Divider>
            <div className="p-4">
              <Vertical />
            </div>

            <Divider orientation="left">
              <small>Reponsive grid list</small>
            </Divider>
            <div className="p-4">
              <Responsive />
            </div>
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Grid</small>
            </Divider>
            <div className="p-4">
              <Grid />
            </div>

            <Divider orientation="left">
              <small>Infinite load</small>
            </Divider>
            <div className="p-4">
              <InfiniteLoad />
            </div>

            <Divider orientation="left">
              <small>Infinite virtualized load</small>
            </Divider>
            <div className="p-4">
              <Virtualized />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
