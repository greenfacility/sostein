import { Card, Divider } from 'antd';

import Auto from './auto-adjust-overflow';
import Basic from './basic';
import Center from './arrow-point-at-center';
import Placement from './placement';

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
          <small>Arrow point at center</small>
        </Divider>
        <div className="p-4">
          <Center />
        </div>

        <Divider orientation="left">
          <small>Auto adjust overflow</small>
        </Divider>
        <div className="p-4">
          <Auto />
        </div>

        <Divider orientation="left">
          <small>Placement</small>
        </Divider>
        <div className="p-4">
          <Placement />
        </div>
      </Card>
    );
  }
}

export default Demo;
