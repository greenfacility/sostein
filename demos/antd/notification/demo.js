import { Card, Divider } from 'antd';

import Basic from './basic';
import CustomIcon from './custom-icon';
import CustomStyle from './custom-style';
import Duration from './duration';
import Placement from './placement';
import Update from './update';
import WithButton from './with-btn';
import WithIcon from './with-icon';

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
          <small>Notification with icon</small>
        </Divider>
        <div className="p-4">
          <WithIcon />
        </div>

        <Divider orientation="left">
          <small>Customized icon</small>
        </Divider>
        <div className="p-4">
          <CustomIcon />
        </div>

        <Divider orientation="left">
          <small>Customized style</small>
        </Divider>
        <div className="p-4">
          <CustomStyle />
        </div>

        <Divider orientation="left">
          <small>Notification duration</small>
        </Divider>
        <div className="p-4">
          <Duration />
        </div>

        <Divider orientation="left">
          <small>Custom close button</small>
        </Divider>
        <div className="p-4">
          <WithButton />
        </div>

        <Divider orientation="left">
          <small>Placement</small>
        </Divider>
        <div className="p-4">
          <Placement />
        </div>

        <Divider orientation="left">
          <small>Update message content</small>
        </Divider>
        <div className="p-4">
          <Update />
        </div>
      </Card>
    );
  }
}

export default Demo;
