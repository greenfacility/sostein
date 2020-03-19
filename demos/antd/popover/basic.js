import { Popover, Button } from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const Component = () => (
  <Popover content={content} title="Title">
    <Button>Hover me</Button>
  </Popover>
);
export default Component;
