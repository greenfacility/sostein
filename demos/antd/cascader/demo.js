import { Card, Divider } from 'antd';

import Basic from './basic';
import Change from './change-on-select';
import Default from './default-value';
import Disabled from './disabled-option';
import Fields from './fields-name';
import Hover from './hover';
import Lazy from './lazy';
import Render from './custom-render';
import Search from './search';
import Size from './size';
import Suffix from './suffix';
import Trigger from './custom-trigger';

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
          <small>Change</small>
        </Divider>
        <div className="p-4">
          <Change />
        </div>

        <Divider orientation="left">
          <small>Render</small>
        </Divider>
        <div className="p-4">
          <Render />
        </div>

        <Divider orientation="left">
          <small>Trigger</small>
        </Divider>
        <div className="p-4">
          <Trigger />
        </div>

        <Divider orientation="left">
          <small>Default</small>
        </Divider>
        <div className="p-4">
          <Default />
        </div>

        <Divider orientation="left">
          <small>Disabled</small>
        </Divider>
        <div className="p-4">
          <Disabled />
        </div>

        <Divider orientation="left">
          <small>Fields</small>
        </Divider>
        <div className="p-4">
          <Fields />
        </div>

        <Divider orientation="left">
          <small>Hover</small>
        </Divider>
        <div className="p-4">
          <Hover />
        </div>

        <Divider orientation="left">
          <small>Lazy</small>
        </Divider>
        <div className="p-4">
          <Lazy />
        </div>

        <Divider orientation="left">
          <small>Search</small>
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
          <small>Suffix</small>
        </Divider>
        <div className="p-4">
          <Suffix />
        </div>
      </Card>
    );
  }
}

export default Demo;
