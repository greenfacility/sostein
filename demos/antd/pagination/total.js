import { Pagination } from 'antd';

const Component = () => (
  <div>
    <Pagination
      total={85}
      showTotal={total => `Total ${total} items`}
      pageSize={20}
      defaultCurrent={1}
    />
    <br />
    <Pagination
      total={85}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      pageSize={20}
      defaultCurrent={1}
    />
  </div>
);

export default Component;
