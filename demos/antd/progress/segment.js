import { Tooltip, Progress } from 'antd';

const Component = () => (
  <Tooltip title="3 done / 3 in progress / 4 to do">
    <Progress percent={60} successPercent={30} />
  </Tooltip>
);
export default Component;
