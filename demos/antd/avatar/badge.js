import { Avatar, Badge } from 'antd';

const Component = () => (
  <div>
    <span style={{ marginRight: 24 }}>
      <Badge count={1}>
        <Avatar shape="square" icon="user" />
      </Badge>
    </span>
    <span>
      <Badge dot>
        <Avatar shape="square" icon="user" />
      </Badge>
    </span>
  </div>
);

export default Component;
