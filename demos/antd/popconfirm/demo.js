import { Card, Divider } from 'antd';

import Basic from './basic';
import Icon from './icon';
import Locale from './locale';
import Placement from './placement';
import Trigger from './dynamic-trigger';

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
          <small>Customize icon</small>
        </Divider>
        <div className="p-4">
          <Icon />
        </div>

        <Divider orientation="left">
          <small>Local text</small>
        </Divider>
        <div className="p-4">
          <Locale />
        </div>

        <Divider orientation="left">
          <small>Conditional trigger</small>
        </Divider>
        <div className="p-4">
          <Trigger />
        </div>
      </Card>
    );
  }
}

export default Demo;
