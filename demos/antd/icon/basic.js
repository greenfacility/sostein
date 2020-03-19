import { Icon } from 'antd';

const Component = () => (
  <div className="icons-list">
    <Icon type="home" />
    <Icon type="setting" theme="filled" />
    <Icon type="smile" theme="outlined" />
    <Icon type="sync" spin />
    <Icon type="loading" />
  </div>
);
export default Component;

/*<style>
.icons-list > .anticon {
  margin-right: 6px;
  font-size: 24px;
}
</style>*/
