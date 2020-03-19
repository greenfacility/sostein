import { Button, notification } from 'antd';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    style: {
      width: 600,
      marginLeft: 335 - 600
    }
  });
};

const Component = () => (
  <Button onClick={openNotification}>Open the notification box</Button>
);
export default Component;
