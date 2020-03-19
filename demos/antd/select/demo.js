import { Card, Divider } from 'antd';

import Automatic from './automatic-tokenization';
import Basic from './basic';
import Coordinate from './coordinate';
import Label from './label-in-value';
import Multiple from './multiple';
import Optgroup from './optgroup';
//import Searchbox from './search-box';
import Search from './search';
import SelectUsers from './select-users';
import Size from './size';
import Suffix from './suffix';
import Tags from './tags';

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
          <small>Automatic tokenization</small>
        </Divider>
        <div className="p-4">
          <Automatic />
        </div>

        <Divider orientation="left">
          <small>Coordinate</small>
        </Divider>
        <div className="p-4">
          <Coordinate />
        </div>

        <Divider orientation="left">
          <small>Label in value</small>
        </Divider>
        <div className="p-4">
          <Label />
        </div>

        <Divider orientation="left">
          <small>Multiple</small>
        </Divider>
        <div className="p-4">
          <Multiple />
        </div>

        <Divider orientation="left">
          <small>Optgroup</small>
        </Divider>
        <div className="p-4">
          <Optgroup />
        </div>

        {/*<Divider orientation="left"><small>Search box</small></Divider>
          <div className="p-4">
            <Searchbox />
          </div>*/}

        <Divider orientation="left">
          <small>Search</small>
        </Divider>
        <div className="p-4">
          <Search />
        </div>

        <Divider orientation="left">
          <small>Select users</small>
        </Divider>
        <div className="p-4">
          <SelectUsers />
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

        <Divider orientation="left">
          <small>Tags</small>
        </Divider>
        <div className="p-4">
          <Tags />
        </div>
      </Card>
    );
  }
}

export default Demo;
