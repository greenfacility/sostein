import { Rate } from 'antd';

const Component = () => (
  <div>
    <Rate defaultValue={3} /> allowClear: true
    <br />
    <Rate allowClear={false} defaultValue={3} /> allowClear: false
  </div>
);
export default Component;
