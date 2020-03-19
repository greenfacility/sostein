import { message, Button } from 'antd';

const success = () => {
  message
    .loading('Action in progress..', 2.5)
    .then(() => message.success('Loading finished', 2.5))
    .then(() => message.info('Loading finished is finished', 2.5));
};

const Component = () => (
  <Button onClick={success}>Display a sequence of message</Button>
);
export default Component;
