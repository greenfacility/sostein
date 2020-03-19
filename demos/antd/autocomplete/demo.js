import { Card, Divider } from 'antd';

import Basic from './basic';
import Case from './non-case-sensitive';
import Certain from './certain-category';
import Custom from './custom';
import Options from './options';
import Uncertain from './uncertain-category';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-autocomplete-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Certain</small>
        </Divider>
        <div className="p-4">
          <Certain />
        </div>

        <Divider orientation="left">
          <small>Custom</small>
        </Divider>
        <div className="p-4">
          <Custom />
        </div>

        <Divider orientation="left">
          <small>Non case sensitive</small>
        </Divider>
        <div className="p-4">
          <Case />
        </div>

        <Divider orientation="left">
          <small>Options</small>
        </Divider>
        <div className="p-4">
          <Options />
        </div>

        <Divider orientation="left">
          <small>Uncertain</small>
        </Divider>
        <div className="p-4">
          <Uncertain />
        </div>
      </Card>
    );
  }
}

export default Demo;
