import { Card, Divider } from 'antd';

import Basic from './basic';
import Custom from './custom-indicator';
import Delay from './delayAndDebounce';
import Inside from './inside';
import Nested from './nested';
import Size from './size';
import Tip from './tip';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-spin-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Inside a container</small>
        </Divider>
        <div className="p-4">
          <Inside />
        </div>

        <Divider orientation="left">
          <small>Customized description</small>
        </Divider>
        <div className="p-4">
          <Tip />
        </div>

        <Divider orientation="left">
          <small>Custom spinning indicator</small>
        </Divider>
        <div className="p-4">
          <Custom />
        </div>

        <Divider orientation="left">
          <small>Size</small>
        </Divider>
        <div className="p-4">
          <Size />
        </div>

        <Divider orientation="left">
          <small>Embedded mode</small>
        </Divider>
        <div className="p-4">
          <Nested />
        </div>

        <Divider orientation="left">
          <small>Delay and debounce</small>
        </Divider>
        <div className="p-4">
          <Delay />
        </div>
      </Card>
    );
  }
}

export default Demo;
