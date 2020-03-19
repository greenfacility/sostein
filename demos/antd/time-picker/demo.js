import { Card, Divider } from 'antd';

import Addon from './addon';
import Basic from './basic';
import Disabled from './disabled';
import HideColumn from './hide-column';
import Hours from './12hours';
import Interval from './interval-options';
import Size from './size';
import Suffix from './suffix';
import Value from './value';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-timepicker-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>12 hours</small>
        </Divider>
        <div className="p-4">
          <Hours />
        </div>

        <Divider orientation="left">
          <small>Addon</small>
        </Divider>
        <div className="p-4">
          <Addon />
        </div>

        <Divider orientation="left">
          <small>Disabled</small>
        </Divider>
        <div className="p-4">
          <Disabled />
        </div>

        <Divider orientation="left">
          <small>Hide column</small>
        </Divider>
        <div className="p-4">
          <HideColumn />
        </div>

        <Divider orientation="left">
          <small>Interval options</small>
        </Divider>
        <div className="p-4">
          <Interval />
        </div>

        <Divider orientation="left">
          <small>Size</small>
        </Divider>
        <div className="p-4">
          <Size />
        </div>

        <Divider orientation="left">
          <small>Suffix</small>
        </Divider>
        <div className="p-4">
          <Suffix />
        </div>

        <Divider orientation="left">
          <small>Value</small>
        </Divider>
        <div className="p-4">
          <Value />
        </div>
      </Card>
    );
  }
}

export default Demo;
