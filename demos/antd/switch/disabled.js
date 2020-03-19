import { Switch, Button } from 'antd';

class App extends React.Component {
  state = {
    disabled: true
  };

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };

  render() {
    return (
      <div>
        <Switch disabled={this.state.disabled} defaultChecked />
        <span className="d-block my-3 w-100" />
        <Button type="primary" onClick={this.toggle}>
          Toggle disabled
        </Button>
      </div>
    );
  }
}

export default App;
