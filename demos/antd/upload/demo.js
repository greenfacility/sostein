import { Card, Divider } from 'antd';

import Avatar from './avatar';
import Basic from './basic';
import CardDemo from './picture-card';
import Default from './defaultFileList';
import Directory from './directory';
import Drag from './drag';
import Filelist from './fileList';
import Manual from './upload-manually';
import Style from './picture-style';

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
          <small>Avatar</small>
        </Divider>
        <div className="p-4">
          <Avatar />
        </div>

        <Divider orientation="left">
          <small>Default file list</small>
        </Divider>
        <div className="p-4">
          <Default />
        </div>

        <Divider orientation="left">
          <small>Directory</small>
        </Divider>
        <div className="p-4">
          <Directory />
        </div>

        <Divider orientation="left">
          <small>Drag</small>
        </Divider>
        <div className="p-4">
          <Drag />
        </div>

        <Divider orientation="left">
          <small>File list</small>
        </Divider>
        <div className="p-4">
          <Filelist />
        </div>

        <Divider orientation="left">
          <small>Picture card</small>
        </Divider>
        <div className="p-4">
          <CardDemo />
        </div>

        <Divider orientation="left">
          <small>Picture style</small>
        </Divider>
        <div className="p-4">
          <Style />
        </div>

        <Divider orientation="left">
          <small>Upload manually</small>
        </Divider>
        <div className="p-4">
          <Manual />
        </div>
      </Card>
    );
  }
}

export default Demo;
