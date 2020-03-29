import { Table, Input, Button, Icon, Card, Divider, Dropdown, Menu, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MoreVertical, Edit, Trash, PlusCircle } from 'react-feather';
import AddData from '../Datas/Services/AddData';
import EditData from '../Datas/Services/EditData';
import { deleteService } from '../../redux/actions';

const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		name: 'Joe Black',
		age: 42,
		address: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		name: 'Jim Green',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
	},
	{
		key: '4',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
];

class ServiceTable extends Component {
	state = {
		searchText: '',
		searchedColumn: '',
		services: this.props.services.services,
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

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: '' });
	};

	render() {
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				width: '40%',
				...this.getColumnSearchProps('name'),
			},
			{
				title: 'Type',
				dataIndex: 'type',
				key: 'type',
				width: '40%',
				...this.getColumnSearchProps('type'),
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
									<Menu.Item onClick={(e) => this.props.deleteService(record._id)}>
										<Row type="flex" align="middle">
											{' '}
											<span>Delete</span>
										</Row>
									</Menu.Item>
								</Menu>
							}
						>
							<MoreVertical size={20} strokeWidth={1} />
						</Dropdown>
					);
				},
			},
		];
		let col = columns;
		if (this.props.authentication.user.usertype !== 'manager') {
			col = columns.filter((dt) => dt.key !== 'action');
		}
		return (
			<Card
				title="Services"
				style={{ padding: '0 !important', overflow: 'auto' }}
				extra={this.props.authentication.user.usertype === 'manager' && <AddData />}
			>
				<Table columns={col} dataSource={this.props.services.services} />
			</Card>
		);
	}
}

export default connect((state) => state, { deleteService })(ServiceTable);
