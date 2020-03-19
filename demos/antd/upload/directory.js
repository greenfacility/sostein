import { Upload, Button, Icon } from 'antd';

const Component = () => (
  <Upload action="//jsonplaceholder.typicode.com/posts/" directory>
    <Button>
      <Icon type="upload" /> Upload Directory
    </Button>
  </Upload>
);
export default Component;
