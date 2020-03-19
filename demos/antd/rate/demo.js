import { Card, Divider } from 'antd';

import Basic from './basic';
import Character from './character';
import Clear from './clear';
import Disabled from './disabled';
import Half from './half';
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
          <small>Character</small>
        </Divider>
        <div className="p-4">
          <Character />
        </div>

        <Divider orientation="left">
          <small>Clear</small>
        </Divider>
        <div className="p-4">
          <Clear />
        </div>

        <Divider orientation="left">
          <small>Disabled</small>
        </Divider>
        <div className="p-4">
          <Disabled />
        </div>

        <Divider orientation="left">
          <small>Half</small>
        </Divider>
        <div className="p-4">
          <Half />
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
