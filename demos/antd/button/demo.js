import Basic from './basic';
import Block from './block';
import ButtonGroup from './button-group';
import Disabled from './disabled';
import Ghost from './ghost';
import Icon from './icon';
import Loading from './loading';
import Multiple from './multiple';
import Size from './size';

import { Row, Col, Card } from 'antd';

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={16} id="components-button-demo">
        <Col lg={12} md={24}>
          <p>Basic</p>
          <div className="mb-4">
            <Basic />
          </div>

          <p>Size</p>
          <div className="mb-4">
            <Size />
          </div>

          <p>Loading</p>
          <div className="mb-4">
            <Loading />
          </div>

          <p>Button group</p>
          <div className="mb-4">
            <ButtonGroup />
          </div>

          <p>Block</p>
          <div className="mb-4">
            <Block />
          </div>
        </Col>
        <Col lg={12} md={24}>
          <p>Icon</p>
          <div className="mb-4">
            <Icon />
          </div>

          <p>Disabled</p>
          <div className="mb-4">
            <Disabled />
          </div>

          <p>Multiple buttons</p>
          <div className="mb-4">
            <Multiple />
          </div>

          <p>Ghost</p>
          <div className="mb-4">
            <Ghost />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Demo;
