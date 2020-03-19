import { Card, Divider } from 'antd';

import Basic from './basic';
import CardDemo from './card';
import CardTop from './card-top';
import Disabled from './disabled';
import Editable from './editable-card';
import Extra from './extra';
import Icon from './icon';
import Position from './position';
import Size from './size';
import Slide from './slide';
import TabBar from './custom-tab-bar';
import Trigger from './custom-add-trigger';

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
          <small>Card top</small>
        </Divider>
        <div className="p-4">
          <CardTop />
        </div>

        <Divider orientation="left">
          <small>Card</small>
        </Divider>
        <div className="p-4">
          <CardDemo />
        </div>

        <Divider orientation="left">
          <small>Custom add trigger</small>
        </Divider>
        <div className="p-4">
          <Trigger />
        </div>

        <Divider orientation="left">
          <small>Custom tab bar</small>
        </Divider>
        <div className="p-4">
          <TabBar />
        </div>

        <Divider orientation="left">
          <small>Disabled</small>
        </Divider>
        <div className="p-4">
          <Disabled />
        </div>

        <Divider orientation="left">
          <small>Editable card</small>
        </Divider>
        <div className="p-4">
          <Editable />
        </div>

        <Divider orientation="left">
          <small>Extra</small>
        </Divider>
        <div className="p-4">
          <Extra />
        </div>

        <Divider orientation="left">
          <small>Icon</small>
        </Divider>
        <div className="p-4">
          <Icon />
        </div>

        <Divider orientation="left">
          <small>Position</small>
        </Divider>
        <div className="p-4">
          <Position />
        </div>

        <Divider orientation="left">
          <small>Size</small>
        </Divider>
        <div className="p-4">
          <Size />
        </div>

        <Divider orientation="left">
          <small>Slide</small>
        </Divider>
        <div className="p-4">
          <Slide />
        </div>
      </Card>
    );
  }
}

export default Demo;
