import { Card, Col, Divider, Row } from 'antd';

import Customized from './customized-progress-dot';
import Error from './error';
import Icon from './icon';
import ProgressDot from './progress-dot';
import Simple from './simple';
import SmallSize from './small-size';
import StepNext from './step-next';
import Vertical from './vertical';
import VerticalSmall from './vertical-small';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }}>
        <Row gutter={16} id="components-button-demo">
          <Col lg={24} md={24}>
            <div className="mb-4 p-4">
              <Simple />
            </div>

            <Divider orientation="left">
              <small>Customized</small>
            </Divider>
            <div className="mb-4 p-4">
              <Customized />
            </div>

            <Divider orientation="left">
              <small>Error</small>
            </Divider>
            <div className="mb-4 p-4">
              <Error />
            </div>

            <Divider orientation="left">
              <small>Icon</small>
            </Divider>
            <div className="mb-4 p-4">
              <Icon />
            </div>

            <Divider orientation="left">
              <small>Progress dot</small>
            </Divider>
            <div className="mb-4 p-4">
              <ProgressDot />
            </div>

            <Divider orientation="left">
              <small>Small size</small>
            </Divider>
            <div className="mb-4 p-4">
              <SmallSize />
            </div>

            <Divider orientation="left">
              <small>Step next</small>
            </Divider>
            <div className="mb-4 p-4">
              <StepNext />
            </div>

            <Divider orientation="left">
              <small>Vertical</small>
            </Divider>
            <div className="mb-4 p-4">
              <Vertical />
            </div>

            <Divider orientation="left">
              <small>Vertical Small</small>
            </Divider>
            <div className="mb-4 p-4">
              <VerticalSmall />
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Demo;
