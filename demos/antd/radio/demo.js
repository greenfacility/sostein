import { Card, Divider } from 'antd';

import Basic from './basic';
import Disabled from './disable';
import Group from './radiogroup';
import More from './radiogroup-more';
import Options from './radiogroup-options';
import Radio from './radiobutton';
import Size from './size';
import Solid from './radiobutton-solid';
import WithName from './radiogroup-with-name';

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
          <small>Disabled</small>
        </Divider>
        <div className="p-4">
          <Disabled />
        </div>

        <Divider orientation="left">
          <small>Radio button solid</small>
        </Divider>
        <div className="p-4">
          <Solid />
        </div>

        <Divider orientation="left">
          <small>Radio button</small>
        </Divider>
        <div className="p-4">
          <Radio />
        </div>

        <Divider orientation="left">
          <small>Radio group more</small>
        </Divider>
        <div className="p-4">
          <More />
        </div>

        <Divider orientation="left">
          <small>Radio group options</small>
        </Divider>
        <div className="p-4">
          <Options />
        </div>

        <Divider orientation="left">
          <small>Radio group with name</small>
        </Divider>
        <div className="p-4">
          <WithName />
        </div>

        <Divider orientation="left">
          <small>Radio group</small>
        </Divider>
        <div className="p-4">
          <Group />
        </div>

        <Divider orientation="left">
          <small>Size</small>
        </Divider>
        <div className="p-4">
          <Size />
        </div>
      </Card>
    );
  }
}

export default Demo;
