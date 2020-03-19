import { Card, Divider } from 'antd';

import Horizontal from './horizontal';
import Inline from './inline';
import InlineCollapsed from './inline-collapsed';
import SiderCurrent from './sider-current';
import SwitchMode from './switch-mode';
import Theme from './theme';
import Vertical from './vertical';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-menu-demo">
        <Divider orientation="left">
          <small>Horizontal</small>
        </Divider>
        <div className="p-4">
          <Horizontal />
        </div>

        <Divider orientation="left">
          <small>Inline collapsed</small>
        </Divider>
        <div className="p-4">
          <InlineCollapsed />
        </div>

        <Divider orientation="left">
          <small>Inline</small>
        </Divider>
        <div className="p-4">
          <Inline />
        </div>

        <Divider orientation="left">
          <small>Sider current</small>
        </Divider>
        <div className="p-4">
          <SiderCurrent />
        </div>

        <Divider orientation="left">
          <small>Switch mode</small>
        </Divider>
        <div className="p-4">
          <SwitchMode />
        </div>

        <Divider orientation="left">
          <small>Theme</small>
        </Divider>
        <div className="p-4">
          <Theme />
        </div>

        <Divider orientation="left">
          <small>Vertical</small>
        </Divider>
        <div className="p-4">
          <Vertical />
        </div>
      </Card>
    );
  }
}

export default Demo;
