import { Card, Divider } from 'antd';

import Async from './async';
import Avatar from './avatar';
import Basic from './basic';
import Controlled from './controlled';
import Controller from './controllder-simple';
import Custom from './custom-tag';
import Multilines from './multilines';
import Multiple from './multiple-trigger';
import Placement from './placement';
import Popup from './popupContainer';
import Readonly from './readonly';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-input-demo">
        <Divider orientation="left">
          <small>Async</small>
        </Divider>
        <div className="p-4">
          <Async />
        </div>

        <Divider orientation="left">
          <small>Avatar</small>
        </Divider>
        <div className="p-4">
          <Avatar />
        </div>

        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Controlled simple</small>
        </Divider>
        <div className="p-4">
          <Controller />
        </div>

        <Divider orientation="left">
          <small>Controlled</small>
        </Divider>
        <div className="p-4">
          <Controlled />
        </div>

        <Divider orientation="left">
          <small>Custom</small>
        </Divider>
        <div className="p-4">
          <Custom />
        </div>

        <Divider orientation="left">
          <small>Multilines</small>
        </Divider>
        <div className="p-4">
          <Multilines />
        </div>

        <Divider orientation="left">
          <small>Multiple trigger</small>
        </Divider>
        <div className="p-4">
          <Multiple />
        </div>

        <Divider orientation="left">
          <small>Placement</small>
        </Divider>
        <div className="p-4">
          <Placement />
        </div>

        <Divider orientation="left">
          <small>Popup container</small>
        </Divider>
        <div className="p-4">
          <Popup />
        </div>

        <Divider orientation="left">
          <small>Readonly</small>
        </Divider>
        <div className="p-4">
          <Readonly />
        </div>
      </Card>
    );
  }
}

export default Demo;
