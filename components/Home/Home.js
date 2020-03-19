import React, { Component } from 'react';
import { Card, Dropdown, Menu, Row } from 'antd';
import { Activity, Link, Home } from 'react-feather';
import Router from 'next/router';
import Linky from 'next/link';

export default class HomePage extends Component {
	componentDidMount() {
		Router.push('/dashboard');
	}
	render() {
		return (
			<div style={{ textAlign: 'center', paddingTop: '35vh', display: 'block', justifyContent: 'center' }}>
				<img src="/images/logo.png" alt="green facilities ltd" />
				<style jsx>{`
					@media only screen and (min-width: 600px) {
						img {
							width: 50%;
						}
					}
					@media only screen and (min-width: 900px) {
						img {
							width: 40%;
						}
					}
					img {
						width: 70%;
					}
				`}</style>
			</div>
		);
	}
}
