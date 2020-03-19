import { Card, Divider } from 'antd';

import Duration from './duration';
import Info from './info';
import Loading from './loading';
import Other from './other';
import Thenable from './thenable';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-button-demo">
        <Divider orientation="left">
          <small>Normal prompt</small>
        </Divider>
        <div className="p-4">
          <Info />
        </div>

        <Divider orientation="left">
          <small>Customized duration</small>
        </Divider>
        <div className="p-4">
          <Duration />
        </div>

        <Divider orientation="left">
          <small>Promise interface</small>
        </Divider>
        <div className="p-4">
          <Thenable />
        </div>

        <Divider orientation="left">
          <small>Other types of messages</small>
        </Divider>
        <div className="p-4">
          <Other />
        </div>

        <Divider orientation="left">
          <small>Loading message</small>
        </Divider>
        <div className="p-4">
          <Loading />
        </div>
      </Card>
    );
  }
}

export default Demo;
