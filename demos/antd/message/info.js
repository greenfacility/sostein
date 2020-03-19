import { message, Button } from 'antd';

const info = () => {
  message.info('This is a normal message');
};

const Component = () => <Button onClick={info}>Display normal message</Button>;
export default Component;
