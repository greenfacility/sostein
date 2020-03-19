import { Card, Divider } from 'antd';

import Addon from './addon';
import Autosize from './autosize-textarea';
import Basic from './basic';
import Group from './group';
import Presuffix from './presuffix';
import Search from './search-input';
import Size from './size';
import Textarea from './textarea';
import Tooltip from './tooltip';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-input-demo">
        <Divider orientation="left">
          <small>Addon</small>
        </Divider>
        <div className="p-4">
          <Addon />
        </div>

        <Divider orientation="left">
          <small>Autosize textarea</small>
        </Divider>
        <div className="p-4">
          <Autosize />
        </div>

        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Group</small>
        </Divider>
        <div className="p-4">
          <Group />
        </div>

        <Divider orientation="left">
          <small>Presuffix</small>
        </Divider>
        <div className="p-4">
          <Presuffix />
        </div>

        <Divider orientation="left">
          <small>Search input</small>
        </Divider>
        <div className="p-4">
          <Search />
        </div>

        <Divider orientation="left">
          <small>Size</small>
        </Divider>
        <div className="p-4">
          <Size />
        </div>

        <Divider orientation="left">
          <small>Textarea</small>
        </Divider>
        <div className="p-4">
          <Textarea />
        </div>

        <Divider orientation="left">
          <small>Tooltip</small>
        </Divider>
        <div className="p-4">
          <Tooltip />
        </div>
      </Card>
    );
  }
}

export default Demo;
