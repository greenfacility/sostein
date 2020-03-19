import { Card, Divider } from 'antd';

import Basic from './basic';
import Change from './change';
import Dot from './dot';
import LinkDemo from './link';
import NoWrapper from './no-wrapper';
import Overflow from './overflow';
import Status from './status';
import Title from './title';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-badge-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Overflow count</small>
        </Divider>
        <div className="p-4">
          <Overflow />
        </div>

        <Divider orientation="left">
          <small>Clickable</small>
        </Divider>
        <div className="p-4">
          <LinkDemo />
        </div>

        <Divider orientation="left">
          <small>Status</small>
        </Divider>
        <div className="p-4">
          <Status />
        </div>

        <Divider orientation="left">
          <small>Standalone</small>
        </Divider>
        <div className="p-4">
          <NoWrapper />
        </div>

        <Divider orientation="left">
          <small>Red badge</small>
        </Divider>
        <div className="p-4">
          <Dot />
        </div>

        <Divider orientation="left">
          <small>Dynamic</small>
        </Divider>
        <div className="p-4">
          <Change />
        </div>

        <Divider orientation="left">
          <small>Title</small>
        </Divider>
        <div className="p-4">
          <Title />
        </div>
      </Card>
    );
  }
}

export default Demo;
