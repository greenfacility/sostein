import { Card, Divider } from 'antd';

import Alternate from './alternate';
import Basic from './basic';
import Color from './color';
import Custom from './custom';
import Pending from './pending';
import Right from './right';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-timeline-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Color</small>
        </Divider>
        <div className="p-4">
          <Color />
        </div>

        <Divider orientation="left">
          <small>Custom</small>
        </Divider>
        <div className="p-4">
          <Custom />
        </div>

        <Divider orientation="left">
          <small>Pending</small>
        </Divider>
        <div className="p-4">
          <Pending />
        </div>

        <Divider orientation="left">
          <small>Right</small>
        </Divider>
        <div className="p-4">
          <Right />
        </div>

        <Divider orientation="left">
          <small>Alternate</small>
        </Divider>
        <div className="p-4">
          <Alternate />
        </div>
      </Card>
    );
  }
}

export default Demo;
