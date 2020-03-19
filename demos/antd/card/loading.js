import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

class App extends React.Component {
  state = {
    loading: false
  };

  onChange = checked => {
    this.setState({ loading: !checked });
  };

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Switch checked={!loading} onChange={this.onChange} />

        <Card style={{ marginTop: 16 }} loading={loading}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>

        <Card
          style={{ marginTop: 16 }}
          actions={[
            <Icon type="setting" />,
            <Icon type="edit" />,
            <Icon type="ellipsis" />
          ]}
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card>
      </div>
    );
  }
}

export default App;
