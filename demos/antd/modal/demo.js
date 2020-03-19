import { Card, Col, Divider, Row } from 'antd';

import AsyncDemo from './async';
import Basic from './basic';
import ButtonProps from './button-props';
import Confirm from './confirm';
import ConfirmPromise from './confirm-promise';
import Footer from './footer';
import Info from './info';
import Locale from './locale';
import Manual from './manual';
import Position from './position';

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={16} id="components-button-demo">
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <div className="p-4">
              <Basic />
            </div>

            <Divider orientation="left">
              <small>Customized footer</small>
            </Divider>
            <div className="p-4">
              <Footer />
            </div>

            <Divider orientation="left">
              <small>Confirmation modal dialog</small>
            </Divider>
            <div className="p-4">
              <ConfirmPromise />
            </div>

            <Divider orientation="left">
              <small>Internationalization</small>
            </Divider>
            <div className="p-4">
              <Locale />
            </div>

            <Divider orientation="left">
              <small>Customize the position of the modal</small>
            </Divider>
            <div className="p-4">
              <Position />
            </div>
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Asynchronously close</small>
            </Divider>
            <div className="p-4">
              <AsyncDemo />
            </div>

            <Divider orientation="left">
              <small>Confirmation modal dialog</small>
            </Divider>
            <div className="p-4">
              <Confirm />
            </div>

            <Divider orientation="left">
              <small>Infomation modal dialog</small>
            </Divider>
            <div className="p-4">
              <Info />
            </div>

            <Divider orientation="left">
              <small>Manual to update destroy</small>
            </Divider>
            <div className="p-4">
              <Manual />
            </div>

            <Divider orientation="left">
              <small>Customize footer buttons props</small>
            </Divider>
            <div className="p-4">
              <ButtonProps />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
