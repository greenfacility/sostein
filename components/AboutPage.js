import React, { Component } from 'react';
import { Layout, Card } from 'antd';

export default class AboutPage extends Component {
	render() {
		return (
			<Layout>
				<Card>
					<h3>Who We Are?</h3>
					<p>
						SOSTEIN was incorporated as an indigenous Facilities Management Company App under GREEN
						FACILITIES LTD (GFL). Our primary focus is to provide facilities management, project management
						and real estate development consultancy, training and professional services delivery support to
						corporate organizations and private investors with major real estate assets. We pride ourselves
						in the delivery of high quality professional services while ensuring minimum total life cycle
						cost of the asset to the owner.
					</p>

					<p>
						In collaboration with our foreign technical partners Future Environments, UK and Essets Assets
						Management Company (US) we are able to access global best practices, systems and standards to
						deliver best value to our customers leveraging our knowledge and expertise of the local
						operating environment. Future Environments, UK is a leading firm in the international property
						and environmental sector with a network of offices in the UK, Europe, Middle East, South Africa
						and the Caribbean.
					</p>

					<p>
						The company has developed processes and standards which help to ensure that all activities are
						sustainable and deliver good results. The ultimate result which we deliver is the place where
						the customers live, work or play and we thrive to ensure that we provide comfort, safety and
						security on all our facilities. Our client profile includes: Ecobinder Services Limited,
						Makzeejay Ventures, Yunik Designs, etc
					</p>
					<h3>Our Vision</h3>
					<p>To be the preferred technology driven sustainable facilities management company in Nigeria.</p>
					<h3>Our Mission</h3>
					<p>
						To enable individual and organizations achieve their overall goals through the provision of
						sustainable facilities management services and customer satisfaction.
					</p>
					<h3>Our Objectives</h3>
					<ul>
						<li>
							To offer total facility management solution to clients in Nigeria and other African
							Countries.
						</li>

						<li>
							To develop and build capacity for efficient facility management services delivery in Nigeria
							and other African countries where we operate.
						</li>

						<li>
							To provide sustainable solutions driven by technology to add value to the built environment.
						</li>

						<li>
							To develop and implement a robust business model that meets international standards and
							guarantees long term growth and development of the company.
						</li>

						<li>To be recognized among the best facility management companies in the world.</li>
					</ul>
				</Card>
			</Layout>
		);
	}
}
