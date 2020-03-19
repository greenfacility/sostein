import { Dropdown, Icon, Menu } from 'antd';

const SubMenu = Menu.SubMenu;

const menu = (
  <Menu>
    <Menu.Item>1st menu item</Menu.Item>
    <Menu.Item>2nd menu item</Menu.Item>
    <SubMenu title="sub menu">
      <Menu.Item>3rd menu item</Menu.Item>
      <Menu.Item>4th menu item</Menu.Item>
    </SubMenu>
    <SubMenu title="disabled sub menu" disabled>
      <Menu.Item>5d menu item</Menu.Item>
      <Menu.Item>6th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

const Component = () => (
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" href="#">
      Cascading menu <Icon type="down" />
    </a>
  </Dropdown>
);

export default Component;
