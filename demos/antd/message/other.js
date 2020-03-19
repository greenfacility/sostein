import { message, Button } from 'antd';

const success = () => {
  message.success('This is a message of success');
};

const error = () => {
  message.error('This is a message of error');
};

const warning = () => {
  message.warning('This is message of warning');
};

const Component = () => (
  <div>
    <Button onClick={success}>Success</Button>
    <Button onClick={error}>Error</Button>
    <Button onClick={warning}>Warning</Button>
  </div>
);
export default Component;
