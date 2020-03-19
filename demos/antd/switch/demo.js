import { Card, Divider } from 'antd';

import Basic from './basic';
import Disabled from './disabled';
import Loading from './loading';
import Size from './size';
import Text from './text';

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
          <small>Loading</small>
        </Divider>
        <div className="p-4">
          <Loading />
        </div>

        <Divider orientation="left">
          <small>Size</small>
        </Divider>
        <div className="p-4">
          <Size />
        </div>

        <Divider orientation="left">
          <small>Text</small>
        </Divider>
        <div className="p-4">
          <Text />
        </div>
      </Card>
    );
  }
}

export default Demo;
