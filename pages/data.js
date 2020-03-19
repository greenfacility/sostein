import Data from '../components/Data';
import Router from 'next/router';
import { Fragment } from 'react';
// import AppProvider from '../components/shared/AppProvider';

const DataPage = () => <Data />;

DataPage.getInitialProps = (ctx) => {
	// const [ state, dispatch ] = useAppState();
	// 	dispatch({ type: 'user' });

	// 	let user = {
	// 		userType: 'manager',
	// 	};

	// 	if (ctx.req) {
	// 		if (user.userType === 'admin' && ctx.req.pathname === '/data') {
	// 			ctx.res.redirect('/dashboard');
	// 		}
	// 	} else {
	// 		if (this.props.user.userType === 'admin' && Router.pathname === '/data') {
	// 			Router.push('/dashboard');
	// 		}
	// 	}
	// if (res) {
	// 	res.redirect('/dashboard');
	// } else {
	// 	Router.push('/dashboard');
	// }
	return { data: 'hello' };
};

export default DataPage;
