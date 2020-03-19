import { Card, Divider } from 'antd';

import Basic from './basic';
import Seperator from './separator';
import WithIcon from './withIcon';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-avatar-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Seperator</small>
        </Divider>
        <div className="p-4">
          <Seperator />
        </div>

        <Divider orientation="left">
          <small>With icon</small>
        </Divider>
        <div className="p-4">
          <WithIcon />
        </div>
      </Card>
    );
  }
}

export default Demo;
