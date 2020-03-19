import { Card, Divider } from 'antd';

import Arrow from './arrow-point-at-center';
import Basic from './basic';
import Control from './control';
import Hover from './hover-with-click';
import Placement from './placement';
import Trigger from './triggerType';

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
          <small>Placement</small>
        </Divider>
        <div className="p-4">
          <Placement />
        </div>

        <Divider orientation="left">
          <small>Arrow point at center</small>
        </Divider>
        <div className="p-4">
          <Arrow />
        </div>

        <Divider orientation="left">
          <small>Three ways to trigger</small>
        </Divider>
        <div className="p-4">
          <Trigger />
        </div>

        <Divider orientation="left">
          <small>Controlling the close of the dialog</small>
        </Divider>
        <div className="p-4">
          <Control />
        </div>

        <Divider orientation="left">
          <small>Hover with click popover</small>
        </Divider>
        <div className="p-4">
          <Hover />
        </div>
      </Card>
    );
  }
}

export default Demo;
