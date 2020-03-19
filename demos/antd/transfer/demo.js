import { Card, Divider } from 'antd';

import Advanced from './advanced';
import Basic from './basic';
import Custom from './custom-item';
import Large from './large-data';
import Search from './search';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-input-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Advanced</small>
        </Divider>
        <div className="p-4">
          <Advanced />
        </div>

        <Divider orientation="left">
          <small>Custom item</small>
        </Divider>
        <div className="p-4">
          <Custom />
        </div>

        <Divider orientation="left">
          <small>Large data</small>
        </Divider>
        <div className="p-4">
          <Large />
        </div>

        <Divider orientation="left">
          <small>Search</small>
        </Divider>
        <div className="p-4">
          <Search />
        </div>
      </Card>
    );
  }
}

export default Demo;
