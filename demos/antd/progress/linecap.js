import { Progress } from 'antd';

const Component = () => (
  <div>
    <Progress strokeLinecap="square" percent={75} />
    <Progress strokeLinecap="square" type="circle" percent={75} />
    <Progress strokeLinecap="square" type="dashboard" percent={75} />
  </div>
);
export default Component;
