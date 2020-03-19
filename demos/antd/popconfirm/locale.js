import { Popconfirm } from 'antd';

const Component = () => (
  <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
    <a href="#">Delete</a>
  </Popconfirm>
);
export default Component;
