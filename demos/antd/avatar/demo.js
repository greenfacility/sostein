import { Card, Divider } from 'antd';

import Badge from './badge';
import Basic from './basic';
import Dynamic from './dynamic';
import Type from './type';

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
          <small>Autoset Font Size</small>
        </Divider>
        <div className="p-4">
          <Dynamic />
        </div>

        <Divider orientation="left">
          <small>Type</small>
        </Divider>
        <div className="p-4">
          <Type />
        </div>

        <Divider orientation="left">
          <small>With badge</small>
        </Divider>
        <div className="p-4">
          <Badge />
        </div>
      </Card>
    );
  }
}

export default Demo;
