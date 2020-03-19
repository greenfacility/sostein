import { Modal, Button } from 'antd';

function countDown() {
  let secondsToGo = 5;
  const modal = Modal.success({
    title: 'This is a notification message',
    content: `This modal will be destroyed after ${secondsToGo} second.`
  });
  setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `This modal will be destroyed after ${secondsToGo} second.`
    });
  }, 1000);
  setTimeout(() => modal.destroy(), secondsToGo * 1000);
}

const Component = () => (
  <Button onClick={countDown}>Open modal to close in 5s</Button>
);
export default Component;
