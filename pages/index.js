import Head from 'next/head';
import { Fragment } from 'react';
import redirect from 'next-redirect';
import Home from '../components/Home/Home';
import React, { Component } from 'react';
import Router from 'next/router';

class OverviewPage extends Component {
	componentDidMount() {
		Router.push('/dashboard');
	}
	render() {
		return (
			<Fragment>
				<Head>
					<link rel="stylesheet" href="/static/react-vis.css" />
				</Head>
				<Home />
			</Fragment>
		);
	}
}

export default OverviewPage;
