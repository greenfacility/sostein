import { Card, Divider } from 'antd';

import Basic from './basic';
import Event from './event';
import IconSlider from './icon-slider';
import InputNumber from './input-number';
import Mark from './mark';
import TipFormatter from './tip-formatter';
import Vertical from './vertical';

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
          <small>Event</small>
        </Divider>
        <div className="p-4">
          <Event />
        </div>

        <Divider orientation="left">
          <small>Icon slider</small>
        </Divider>
        <div className="p-4">
          <IconSlider />
        </div>

        <Divider orientation="left">
          <small>Input number</small>
        </Divider>
        <div className="p-4">
          <InputNumber />
        </div>

        <Divider orientation="left">
          <small>Mark</small>
        </Divider>
        <div className="p-4">
          <Mark />
        </div>

        <Divider orientation="left">
          <small>Tip formatter</small>
        </Divider>
        <div className="p-4">
          <TipFormatter />
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
