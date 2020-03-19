import { Card, Divider } from 'antd';

import Accordion from './accordion';
import Basic from './basic';
import Borderless from './borderless';
import Custom from './custom';
import Mix from './mix';
import Noarrow from './noarrow';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-button-demo">
        <Divider orientation="left">
          <small>Collapse</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Accordion</small>
        </Divider>
        <div className="p-4">
          <Accordion />
        </div>

        <Divider orientation="left">
          <small>Nested panel</small>
        </Divider>
        <div className="p-4">
          <Mix />
        </div>

        <Divider orientation="left">
          <small>Borderless</small>
        </Divider>
        <div className="p-4">
          <Borderless />
        </div>

        <Divider orientation="left">
          <small>Custom panel</small>
        </Divider>
        <div className="p-4">
          <Custom />
        </div>

        <Divider orientation="left">
          <small>No arrow</small>
        </Divider>
        <div className="p-4">
          <Noarrow />
        </div>
      </Card>
    );
  }
}

export default Demo;
