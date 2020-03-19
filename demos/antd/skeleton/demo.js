import { Card, Divider } from 'antd';

import Active from './active';
import Basic from './basic';
import Children from './children';
import Complex from './complex';
import List from './list';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-skeleton-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Complex combination</small>
        </Divider>
        <div className="p-4">
          <Complex />
        </div>

        <Divider orientation="left">
          <small>Active animation</small>
        </Divider>
        <div className="p-4">
          <Active />
        </div>

        <Divider orientation="left">
          <small>Contains sub component</small>
        </Divider>
        <div className="p-4">
          <Children />
        </div>

        <Divider orientation="left">
          <small>List</small>
        </Divider>
        <div className="p-4">
          <List />
        </div>
      </Card>
    );
  }
}

export default Demo;
