import { Pagination } from 'antd';

function showTotal(total) {
  return `Total ${total} items`;
}

const Component = () => (
  <div>
    <Pagination size="small" total={50} />
    <Pagination size="small" total={50} showSizeChanger showQuickJumper />
    <Pagination size="small" total={50} showTotal={showTotal} />
  </div>
);

export default Component;
