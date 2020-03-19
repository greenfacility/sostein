import { Tooltip, Button } from 'antd';

const wrapStyles = {
  overflow: 'hidden',
  background: '#e9e9e9'
};

const Component = () => (
  <div
    style={wrapStyles}
    className="p-4 border rounded bg-light position-relative"
  >
    <Tooltip
      placement="left"
      title="Prompt Text"
      getPopupContainer={trigger => trigger.parentElement}
    >
      <Button>Adjust automatically / 自动调整</Button>
    </Tooltip>
    <br />
    <Tooltip
      placement="left"
      title="Prompt Text"
      getPopupContainer={trigger => trigger.parentElement}
      autoAdjustOverflow={false}
    >
      <Button>Ingore / 不处理</Button>
    </Tooltip>
  </div>
);
export default Component;
