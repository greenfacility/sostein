import { Rate, Message } from 'antd';
import { connect } from 'react-redux';
import { changeRating } from '../../redux/actions';

const desc = [ 'terrible', 'bad', 'normal', 'good', 'wonderful' ];

class Rater extends React.Component {
	state = {
		value: this.props.rate,
	};

	handleChange = (value) => {
		if (this.props.authentication.user.usertype !== 'user')
			return Message.error("Sorry!! you can't rate a request.");
		// this.setState({ value });
		this.props.changeRating(value, this.props.data._id, this.props.authentication.user);
	};

	render() {
		const { value } = this.state;
		return (
			<span>
				<Rate tooltips={desc} onChange={this.handleChange} value={this.props.data.rating} />
				{value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
			</span>
		);
	}
}

export default connect((state) => state, { changeRating })(Rater);
