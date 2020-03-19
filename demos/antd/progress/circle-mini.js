import { Progress } from 'antd';

const Component = () => (
  <div>
    <Progress type="circle" percent={30} width={80} />
    <Progress type="circle" percent={70} width={80} status="exception" />
    <Progress type="circle" percent={100} width={80} />
  </div>
);
export default Component;
