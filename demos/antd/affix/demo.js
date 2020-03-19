import { Col, Row } from 'antd';

import Basic from './basic';
import OnChange from './on-change';
import Target from './target';

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={16} id="components-affix-demo">
        <Col lg={12} md={24}>
          <p>Basic</p>
          <div className="mb-4">
            <Basic />
          </div>

          <p>On change</p>
          <div className="mb-4">
            <OnChange />
          </div>

          <p>Target</p>
          <div className="mb-4">
            <Target />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Demo;
