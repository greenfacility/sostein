import { Pagination } from 'antd';

function onChange(pageNumber) {
  console.log('Page: ', pageNumber);
}

const Component = () => (
  <Pagination
    showQuickJumper
    defaultCurrent={2}
    total={500}
    onChange={onChange}
  />
);

export default Component;
