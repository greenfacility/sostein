import { Card, Divider } from 'antd';

import Basic from './basic';
import Checkable from './checkable';
import Colorful from './colorful';
import Control from './control';
import Controlled from './controlled';
import HotTags from './hot-tags';

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
          <small>Checkable</small>
        </Divider>
        <div className="p-4">
          <Checkable />
        </div>

        <Divider orientation="left">
          <small>Colorful</small>
        </Divider>
        <div className="p-4">
          <Colorful />
        </div>

        <Divider orientation="left">
          <small>Control</small>
        </Divider>
        <div className="p-4">
          <Control />
        </div>

        <Divider orientation="left">
          <small>Controlled</small>
        </Divider>
        <div className="p-4">
          <Controlled />
        </div>

        <Divider orientation="left">
          <small>Hot tags</small>
        </Divider>
        <div className="p-4">
          <HotTags />
        </div>
      </Card>
    );
  }
}

export default Demo;
