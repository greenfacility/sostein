import { Card, Divider } from 'antd';

import Basic from './basic';
import Context from './context-menu';
import DropDown from './dropdown-button';
import Event from './event';
import Item from './item';
import OverlayVisible from './overlay-visible';
import Placement from './placement';
import SubMenu from './sub-menu';
import Trigger from './trigger';

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
          <small>Other elements</small>
        </Divider>
        <div className="p-4">
          <Item />
        </div>

        <Divider orientation="left">
          <small>Click event</small>
        </Divider>
        <div className="p-4">
          <Event />
        </div>

        <Divider orientation="left">
          <small>Cascading menu</small>
        </Divider>
        <div className="p-4">
          <SubMenu />
        </div>

        <Divider orientation="left">
          <small>Context menu</small>
        </Divider>
        <div className="p-4">
          <Context />
        </div>

        <Divider orientation="left">
          <small>Placement</small>
        </Divider>
        <div className="p-4">
          <Placement />
        </div>

        <Divider orientation="left">
          <small>Trigger mode</small>
        </Divider>
        <div className="p-4">
          <Trigger />
        </div>

        <Divider orientation="left">
          <small>Button with dropdown menu</small>
        </Divider>
        <div className="p-4">
          <DropDown />
        </div>

        <Divider orientation="left">
          <small>Closing menu</small>
        </Divider>
        <div className="p-4">
          <OverlayVisible />
        </div>
      </Card>
    );
  }
}

export default Demo;
