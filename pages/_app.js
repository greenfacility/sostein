import '../assets/styles.less';

// import App from 'next/app';
import { Fragment, useState } from 'react';
import redirect from 'next-redirect';
import absoluteUrl from 'next-absolute-url';

import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/HashLoader';

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
	getOutRequestLocal,
	getLocationLocal,
	getPropertyLocal,
} from '../redux/actions';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps, store }) => {
	const [ active, setActive ] = useState(false);
	Router.events.on('routeChangeStart', () => setActive(true));
	Router.events.on('routeChangeComplete', () => setActive(false));
	Router.events.on('routeChangeError', () => setActive(false));
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
					<LoadingOverlay active={active} spinner={<BounceLoader color={'#ffffff'} />}>
						<Page>
							<Component {...pageProps} />
						</Page>
					</LoadingOverlay>
				</AppProvider>
			</Provider>
		</Fragment>
	);
};
// }

MyApp.getInitialProps = async ({ Component, ctx }) => {
	let pageProps = {};
	const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;
	const { origin } = absoluteUrl(ctx.req);
	const hostname = origin;

	let ie = false;
	if (userAgent.match(/Edge/i) || userAgent.match(/Trident.*rv[ :]*11\./i)) {
		ie = true;
	}

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx, hostname);
	}

	pageProps.query = ctx.query;
	pageProps.ieBrowser = ie;

	const NonDashboardRoutes = [ '/signin', '/signup', '/forgot', '/lockscreen', '/_error', '/reset' ];
	var Routes = ctx.pathname || Router.pathname;
	const isNotDashboard = NonDashboardRoutes.includes(Routes);

	const token = getCookie('token', ctx.req);
	// let datas;
	const services = await getServicesLocal(hostname);
	ctx.store.dispatch({ type: 'GET_SERVICES', payload: services });
	if (token) {
		if (isNotDashboard) {
			{
				ctx.req ? redirect(ctx, '/dashboard') : Router.push('/dashboard');
			}
		}
		const user = await getUserLocal(hostname, token);
		var requests = await getRequestLocal(hostname, user);
		var outrequests = await getOutRequestLocal(hostname, user);
		const locations = await getLocationLocal(hostname);
		const properties = await getPropertyLocal(hostname, user);

		if (user.usertype === 'manager' || user.usertype === 'team-member') {
			var users = await getUsersLocal(hostname, token);
			ctx.store.dispatch({ type: 'USERSINFO', payload: users });
			// userRequest = await requests;
		}
		// console.log(user._id, requests);
		ctx.store.dispatch({ type: 'GET_REQUESTS', payload: requests });
		ctx.store.dispatch({ type: 'GET_OUTREQUESTS', payload: outrequests });
		ctx.store.dispatch({ type: 'GET_LOCATIONS', payload: locations });
		ctx.store.dispatch({ type: 'GET_PROPERTYS', payload: properties });
		ctx.store.dispatch({ type: 'AUTHENTICATE', payload: user._id });
		ctx.store.dispatch({ type: 'USERINFO', payload: user });
	} else {
		if (!isNotDashboard) {
			if (
				Routes === '/' ||
				Routes === '/about' ||
				Routes === '/service' ||
				Routes === '/contact' ||
				Routes === '/request'
			) {
				console.log(!isNotDashboard, Routes);
			} else {
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
