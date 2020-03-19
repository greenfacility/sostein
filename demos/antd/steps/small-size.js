import { Steps } from 'antd';

const Step = Steps.Step;

const Component = () => (
  <Steps size="small" current={1}>
    <Step title="Finished" />
    <Step title="In Progress" />
    <Step title="Waiting" />
  </Steps>
);

export default Component;
