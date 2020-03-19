import { Button, notification } from 'antd';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
  });
};

const Component = () => (
  <Button onClick={openNotification}>Open the notification box</Button>
);
export default Component;
