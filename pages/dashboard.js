import Head from 'next/head';
import { Fragment } from 'react';
import Router from 'next/router';
import Overview from '../components/Overview';

const OverviewPage = () => (
	<Fragment>
		<Head>
			<link rel="stylesheet" href="/static/react-vis.css" />
		</Head>
		<Overview />
	</Fragment>
);

// OverviewPage.getInitialProps = ({ req, res, isServer }) => {
// 	if (res) {
// 		res.redirect('/');
// 	} else {
// 		Router.push('/');
// 	}
// 	return { data: 'hello' };
// };

export default OverviewPage;
