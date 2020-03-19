import { Progress } from 'antd';

const Component = () => (
  <div style={{ maxWidth: '300px' }}>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </div>
);
export default Component;
