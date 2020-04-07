import { Table, Input, Button, Icon, Card, Divider, Dropdown, Menu, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MoreVertical, Edit, Trash, PlusCircle } from 'react-feather';
import AddData from '../Datas/Properties/AddData';
import EditData from '../Datas/Properties/EditData';
import { deleteProperty } from '../../redux/actions';

class PropertyTable extends Component {
	state = {
		searchText: '',
		searchedColumn: '',
		properties: this.props.properties.properties,
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
				title: 'Site',
				dataIndex: 'property',
				key: 'property',
				width: '30%',
				...this.getColumnSearchProps('property'),
			},
			{
				title: 'Location',
				dataIndex: 'location',
				key: 'location',
				width: '30%',
				...this.getColumnSearchProps('location'),
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
									{usertype === 'manager' && (
										<Menu.Item onClick={(e) => this.props.deleteProperty(record._id)}>
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
		return (
			<Card title="Project Site" style={{ padding: '0 !important', overflow: 'auto' }} extra={<AddData />}>
				<Table columns={columns} dataSource={this.props.properties.properties} />
			</Card>
		);
	}
}

export default connect((state) => state, { deleteProperty })(PropertyTable);
