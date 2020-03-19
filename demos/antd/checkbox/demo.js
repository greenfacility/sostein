import { Card, Divider } from 'antd';

import Basic from './basic';
import CheckAll from './check-all';
import Controller from './controller';
import Disabled from './disabled';
import Group from './group';
import Layout from './layout';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-button-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Check all</small>
        </Divider>
        <div className="p-4">
          <CheckAll />
        </div>

        <Divider orientation="left">
          <small>Controller</small>
        </Divider>
        <div className="p-4">
          <Controller />
        </div>

        <Divider orientation="left">
          <small>Disabled</small>
        </Divider>
        <div className="p-4">
          <Disabled />
        </div>

        <Divider orientation="left">
          <small>Group</small>
        </Divider>
        <div className="p-4">
          <Group />
        </div>

        <Divider orientation="left">
          <small>Layout</small>
        </Divider>
        <div className="p-4">
          <Layout />
        </div>
      </Card>
    );
  }
}

export default Demo;
