import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const Component = () => <Spin indicator={antIcon} />;
export default Component;
