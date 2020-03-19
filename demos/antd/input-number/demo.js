import { Card, Divider } from 'antd';

import Basic from './basic';
import Digit from './digit';
import Disabled from './disabled';
import Formatter from './formatter';
import Size from './size';

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
          <small>Digit</small>
        </Divider>
        <div className="p-4">
          <Digit />
        </div>

        <Divider orientation="left">
          <small>Disabled</small>
        </Divider>
        <div className="p-4">
          <Disabled />
        </div>

        <Divider orientation="left">
          <small>Formatter</small>
        </Divider>
        <div className="p-4">
          <Formatter />
        </div>

        <Divider orientation="left">
          <small>Size</small>
        </Divider>
        <div className="p-4">
          <Size />
        </div>
      </Card>
    );
  }
}

export default Demo;
