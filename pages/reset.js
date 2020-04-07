import Reset from '../components/Reset';
import redirect from 'next-redirect';

const ResetPage = (props) => <Reset token={props.token} />;

ResetPage.getInitialProps = async (ctx, hostname) => {
	const token = ctx.query.token;
	// console.log(ctx.req);
	if (!token) {
		redirect(ctx, '/forgot');
	}
	// console.log(user);
	return { token };
};

export default ResetPage;
