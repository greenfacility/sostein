import { Table, Input, Button, Icon, Card, Divider, Dropdown, Menu, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MoreVertical, Edit, Trash, PlusCircle } from 'react-feather';
import AddData from '../Datas/Requests/AddData';
import EditData from '../Datas/Requests/EditData';
import AssignMember from '../Datas/Requests/AssignMember';
import { deleteRequest } from '../../redux/actions';
import Rater from '../Rating/Rater';

class RequestTable extends Component {
	state = {
		searchText: '',
		searchedColumn: '',
		activeTab: '1',
		services: this.props.requests.requests,
	};

	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
				</Button>
			</div>
		),
		filterIcon: (filtered) => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: (text) => text,
	});

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		});
	};

	setActiveTab = (active) => {
		this.setState({ activeTab: active });
	};

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: '' });
	};

	render() {
		const { usertype } = this.props.authentication.user;
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				width: '30%',
				...this.getColumnSearchProps('name'),
			},
			{
				title: 'Date',
				dataIndex: 'date',
				key: 'date',
				width: '20%',
				...this.getColumnSearchProps('date'),
			},
			{
				title: 'Type',
				dataIndex: 'type',
				key: 'type',
				width: '20%',
				...this.getColumnSearchProps('type'),
			},
			{
				title: 'From',
				dataIndex: 'from',
				key: 'from',
				width: '20%',
				...this.getColumnSearchProps('from'),
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status',
				width: '10%',
				...this.getColumnSearchProps('status'),
			},
			{
				title: 'Assigned',
				dataIndex: 'assigned',
				key: 'assigned',
				width: '10%',
				...this.getColumnSearchProps('assigned'),
			},
			{
				title: 'Rating',
				dataIndex: 'rating',
				key: 'rating',
				width: '30%',
				// ...this.getColumnSearchProps('rating'),
				render: (text, record) => <Rater rate={record.rating} data={record} />,
			},
			{
				title: 'Action',
				key: 'action',
				width: '10%',
				render: (text, record) => {
					// console.log(record);
					return (
						<Dropdown
							overlay={
								<Menu>
									<EditData id={record._id} />
									<AssignMember id={record._id} />
									{usertype !== 'user' && (
										<Menu.Item
											onClick={(e) =>
												this.props.deleteRequest(record._id, this.props.authentication.user)}
										>
											<Row type="flex" align="middle">
												{' '}
												<span>Delete</span>
											</Row>
										</Menu.Item>
									)}
								</Menu>
							}
						>
							<MoreVertical size={20} strokeWidth={1} />
						</Dropdown>
					);
				},
			},
		];

		var data = columns;
		// console.log(data);
		if (usertype !== 'manager') {
			if (usertype !== 'team-member') {
				// data = columns.filter((cols) => cols.key !== 'action');
				data = data.filter((cols) => cols.key !== 'from');
				// console.log(data);
			}
		}

		var requests = this.props.requests.requests;

		var pendingReq = requests.filter((dt) => dt.status === 'pending');
		var ongoingReq = requests.filter((dt) => dt.status === 'on-going');
		var holdReq = requests.filter((dt) => dt.status === 'hold');
		var parkReq = requests.filter((dt) => dt.status === 'pack');
		var doneReq = requests.filter((dt) => dt.status === 'done');

		return (
			<Card title="Work Order Lists" style={{ padding: '0 !important', overflow: 'auto' }} extra={<AddData />}>
				<Menu
					onClick={(tab) => {
						if (this.state.activeTab !== tab.key) this.setActiveTab(tab.key);
					}}
					selectedKeys={[ this.state.activeTab ]}
					mode="horizontal"
					className="border-bottom-0"
				>
					<Menu.Item key="1">Pending</Menu.Item>
					<Menu.Item key="2">On-going</Menu.Item>
					<Menu.Item key="3">Pack</Menu.Item>
					<Menu.Item key="4">Hold</Menu.Item>
					<Menu.Item key="5">Done</Menu.Item>
				</Menu>
				{this.state.activeTab === '1' && <Table columns={data} dataSource={pendingReq} />}
				{this.state.activeTab === '2' && <Table columns={data} dataSource={ongoingReq} />}
				{this.state.activeTab === '3' && <Table columns={data} dataSource={parkReq} />}
				{this.state.activeTab === '4' && <Table columns={data} dataSource={holdReq} />}
				{this.state.activeTab === '5' && <Table columns={data} dataSource={doneReq} />}
			</Card>
		);
	}
}

export default connect((state) => state, { deleteRequest })(RequestTable);
