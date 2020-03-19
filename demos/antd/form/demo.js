import { Card, Divider } from 'antd';

import AdvancedSearch from './advanced-search';
import Coordinated from './coordinated';
import DynamicForm from './dynamic-form-item';
import DynamicRule from './dynamic-rule';
import Global from './global-state';
import Horizontal from './horizontal-login';
import Layout from './layout';
import Modal from './form-in-modal';
import Normal from './normal-login';
import Register from './register';
import Time from './time-related-controls';
import ValidateOther from './validate-other';
import WithoutFormCreate from './without-form-create';
import customized from './customized-form-controls';
import validateStatic from './validate-static';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-button-demo">
        <Divider orientation="left">
          <small>Horizontal login</small>
        </Divider>
        <div className="p-4">
          <Horizontal />
        </div>

        <Divider orientation="left">
          <small>Normal login</small>
        </Divider>
        <div className="p-4">
          <Normal />
        </div>

        <Divider orientation="left">
          <small>Register</small>
        </Divider>
        <div className="p-4">
          <Register />
        </div>

        <Divider orientation="left">
          <small>Advanced search</small>
        </Divider>
        <div className="p-4">
          <AdvancedSearch />
        </div>

        <Divider orientation="left">
          <small>Form in modal</small>
        </Divider>
        <div className="p-4">
          <Modal />
        </div>

        <Divider orientation="left">
          <small>Dynamic form item</small>
        </Divider>
        <div className="p-4">
          <DynamicForm />
        </div>

        <Divider orientation="left">
          <small>Time related controls</small>
        </Divider>
        <div className="p-4">
          <Time />
        </div>

        <Divider orientation="left">
          <small>Customized form control</small>
        </Divider>
        <div className="p-4">
          <customized />
        </div>

        <Divider orientation="left">
          <small>Layout</small>
        </Divider>
        <div className="p-4">
          <Layout />
        </div>

        <Divider orientation="left">
          <small>Coordinated</small>
        </Divider>
        <div className="p-4">
          <Coordinated />
        </div>

        <Divider orientation="left">
          <small>Dynamic rule</small>
        </Divider>
        <div className="p-4">
          <DynamicRule />
        </div>

        <Divider orientation="left">
          <small>Global state</small>
        </Divider>
        <div className="p-4">
          <Global />
        </div>

        <Divider orientation="left">
          <small>Validate other</small>
        </Divider>
        <div className="p-4">
          <ValidateOther />
        </div>

        <Divider orientation="left">
          <small>Validate static</small>
        </Divider>
        <div className="p-4">
          <validateStatic />
        </div>

        <Divider orientation="left">
          <small>Without form create</small>
        </Divider>
        <div className="p-4">
          <WithoutFormCreate />
        </div>
      </Card>
    );
  }
}

export default Demo;
