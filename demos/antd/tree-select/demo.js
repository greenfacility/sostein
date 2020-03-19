import { Card, Divider } from 'antd';

import Basic from './basic';
import Checkable from './checkable';
import Multiple from './multiple';
import Suffix from './suffix';
import Treedata from './treeData';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-input-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Checkable</small>
        </Divider>
        <div className="p-4">
          <Checkable />
        </div>

        <Divider orientation="left">
          <small>Multiple</small>
        </Divider>
        <div className="p-4">
          <Multiple />
        </div>

        <Divider orientation="left">
          <small>Suffix</small>
        </Divider>
        <div className="p-4">
          <Suffix />
        </div>

        <Divider orientation="left">
          <small>Tree data</small>
        </Divider>
        <div className="p-4">
          <Treedata />
        </div>
      </Card>
    );
  }
}

export default Demo;
