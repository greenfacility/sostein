import { Alert } from 'antd';

const Component = () => (
  <div>
    <Alert message="Warning text" banner />

    <Alert
      message="Very long warning text warning text text text text text text text"
      banner
      closable
    />

    <Alert showIcon={false} message="Warning text without icon" banner />

    <Alert type="error" message="Error text" banner />
  </div>
);

export default Component;
