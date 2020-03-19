import { Row, Col } from 'antd';

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={16} id="components-button-demo">
        <Col lg={12} md={24}>
          <p>Basic</p>
          <div className="mb-4">
            <Basic />
          </div>
        </Col>
        <Col lg={12} md={24}>
          <p>Icon</p>
          <div className="mb-4">
            <Icon />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Demo;
