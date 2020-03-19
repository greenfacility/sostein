import { Switch, Icon } from 'antd';

const Component = () => (
  <div>
    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
    <span className="d-block my-3 w-100" />
    <Switch checkedChildren="1" unCheckedChildren="0" />
    <span className="d-block my-3 w-100" />
    <Switch
      checkedChildren={<Icon type="check" />}
      unCheckedChildren={<Icon type="close" />}
      defaultChecked
    />
  </div>
);

export default Component;
