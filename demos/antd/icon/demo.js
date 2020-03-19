import { Card, Divider } from 'antd';

import Basic from './basic';
import Custom from './custom';
import IconFont from './iconfont';
import OldIcons from './iconfont';
import TwoTone from './two-tone';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-icon-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Custom</small>
        </Divider>
        <div className="p-4">
          <Custom />
        </div>

        <Divider orientation="left">
          <small>Icon font</small>
        </Divider>
        <div className="p-4">
          <IconFont />
        </div>

        <Divider orientation="left">
          <small>Old icons</small>
        </Divider>
        <div className="p-4">
          <OldIcons />
        </div>

        <Divider orientation="left">
          <small>Two tone</small>
        </Divider>
        <div className="p-4">
          <TwoTone />
        </div>
      </Card>
    );
  }
}

export default Demo;
