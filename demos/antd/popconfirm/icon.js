import { Popconfirm, Icon } from 'antd';

const Component = () => (
  <Popconfirm
    title="Are you sure？"
    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
  >
    <a href="#">Delete</a>
  </Popconfirm>
);
export default Component;
