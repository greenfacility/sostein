import { Pagination } from 'antd';

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

const Component = () => (
  <Pagination
    showSizeChanger
    onShowSizeChange={onShowSizeChange}
    defaultCurrent={3}
    total={500}
  />
);

export default Component;
