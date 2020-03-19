import { Progress } from 'antd';

const Component = () => (
  <div>
    <Progress type="circle" percent={75} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} />
  </div>
);
export default Component;
