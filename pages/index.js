import Head from 'next/head';
import { Fragment } from 'react';
import redirect from 'next-redirect';
import Home from '../components/Home/Home';

const OverviewPage = () => (
	<Fragment>
		<Head>
			<link rel="stylesheet" href="/static/react-vis.css" />
		</Head>
		<Home />
	</Fragment>
);

OverviewPage.getInitialProps = (ctx) => {
	// console.log(ctx.redirect);
	redirect(ctx, '/dashboard');
	// setTimeout(() => {
	// }, 4000);
	return {};
};

export default OverviewPage;
