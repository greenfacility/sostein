import React, { Component } from 'react';
import RequestTable from './DataPage/RequestTable';
import OutRequestTable from './DataPage/OutRequestTable';
import ServiceTable from './DataPage/ServiceTable';
import LocationTable from './DataPage/OurlocationTable';
import PropertyTable from './DataPage/PropertyTable';
import UserTable from './DataPage/UserTable';

export default class Data extends Component {
	render() {
		return (
			<div>
				<div className="mb-4">
					<RequestTable />
				</div>
				<div className="mb-4">
					<OutRequestTable />
				</div>
				<div className="mb-4">
					<ServiceTable />
				</div>
				<div className="mb-4">
					<PropertyTable />
				</div>
				<div className="mb-4">
					<LocationTable />
				</div>
				<div className="mb-4">
					<UserTable />
				</div>
			</div>
		);
	}
}
