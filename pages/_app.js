import '../assets/styles.less';

// import App from 'next/app';
import { Fragment } from 'react';
import redirect from 'next-redirect';

import AppProvider from '../components/shared/AppProvider';
import { Provider } from 'react-redux';
import { GlobalStyles } from '../components/styles/GlobalStyles';
import Head from 'next/head';
import NProgress from 'nprogress';
import { makeStore } from '../redux';
import Page from '../components/Page';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import {
	getCookie,
	getUser,
	getUserLocal,
	getUsersLocal,
	getServices,
	getServicesLocal,
	getRequestLocal,
} from '../redux/actions';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// class MyApp extends App {

// componentDidUpdate() {
// 	if (this.props.user.userType === 'admin' && Router.pathname === '/data') {
// 		Router.push('/dashboard');
// 	}
// }
// componentDidMount() {
// 	if (this.props.user.userType === 'admin' && Router.pathname === '/data') {
// 		Router.push('/dashboard');
// 	}
// }

// render() {
const MyApp = ({ Component, pageProps, store }) => {
	return (
		<Fragment>
			<Provider store={store}>
				<GlobalStyles />
				<Head>
					<meta
						name="viewport"
						content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
					/>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<link rel="shortcut icon" href="/images/logo.png" />
					<title>Sostein - Green Facilities Product</title>
					<link rel="stylesheet" href="/min/dropzone.min.css" />
					<link rel="stylesheet" href="/styles/filepicker.css" />
					<link href="https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700" rel="stylesheet" />
					{pageProps.ieBrowser && (
						<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js" />
					)}
				</Head>
				<AppProvider>
					<Page>
						<Component {...pageProps} />
					</Page>
				</AppProvider>
			</Provider>
		</Fragment>
	);
};
// }

MyApp.getInitialProps = async ({ Component, ctx }) => {
	let pageProps = {};
	const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;

	let ie = false;
	if (userAgent.match(/Edge/i) || userAgent.match(/Trident.*rv[ :]*11\./i)) {
		ie = true;
	}

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	pageProps.query = ctx.query;
	pageProps.ieBrowser = ie;

	const NonDashboardRoutes = [ '/signin', '/signup', '/forgot', '/lockscreen', '/_error' ];
	var Routes = ctx.pathname || Router.pathname;
	const isNotDashboard = NonDashboardRoutes.includes(Routes);

	const token = getCookie('token', ctx.req);
	// let datas;
	if (token) {
		if (isNotDashboard) {
			{
				ctx.req ? redirect(ctx, '/dashboard') : Router.push('/dashboard');
			}
		}
		const user = await getUserLocal(token);
		const services = await getServicesLocal();
		var requests = await getRequestLocal(user);
		// console.log(dates);
		// if (user.usertype !== 'manager') {
		// 	if(user.usertype !== 'admin'){
		// 		requests.filter((result) => result.by_id === user._id);
		// 	}
		// 		requests.filter((result) => result.by_id === user._id);

		// }

		// console.log(requests);
		if (user.usertype === 'manager') {
			var users = await getUsersLocal(token);
			ctx.store.dispatch({ type: 'USERSINFO', payload: users });
		} else if (user.usertype === 'team-member') {
			await requests.filter((result) => result.by_id === user._id || result.assign_id === user._id);
		} else {
			await requests.filter((result) => result.by_id === user._id);
		}
		// console.log(requests);
		ctx.store.dispatch({ type: 'GET_REQUESTS', payload: requests });
		ctx.store.dispatch({ type: 'GET_SERVICES', payload: services });
		ctx.store.dispatch({ type: 'AUTHENTICATE', payload: user._id });
		ctx.store.dispatch({ type: 'USERINFO', payload: user });
	} else {
		if (!isNotDashboard) {
			if (Routes !== '/') {
				{
					ctx.req ? redirect(ctx, '/signin') : Router.push('/signin');
				}
			}
			// console.log(Routes);
		}
	}
	return { pageProps };
};

export default withRedux(makeStore)(MyApp);
