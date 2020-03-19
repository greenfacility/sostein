import { Table, Input, Button, Icon, Card, Divider, Dropdown, Menu, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MoreVertical, Edit, Trash, PlusCircle } from 'react-feather';
import AddData from '../Datas/Users/AddData';
import EditData from '../Datas/Users/EditData';
import { deleteUser } from '../../redux/actions';

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

const menu = (
	<Menu>
		<EditData />
		<Menu.Item>
			<Row type="flex" align="middle">
				{' '}
				<span>Delete</span>
			</Row>
		</Menu.Item>
	</Menu>
);

class UserTable extends Component {
	state = {
		searchText: '',
		searchedColumn: '',
		activeTab: '1',
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
		const columns = [
			{
				title: 'First Name',
				dataIndex: 'firstname',
				key: 'firstname',
				...this.getColumnSearchProps('firstname'),
			},
			{
				title: 'Last Name',
				dataIndex: 'lastname',
				key: 'lastname',
				// width: '20%',
				...this.getColumnSearchProps('lastname'),
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
				...this.getColumnSearchProps('email'),
			},
			{
				title: 'Address',
				dataIndex: 'address',
				key: 'address',
				...this.getColumnSearchProps('address'),
			},
			{
				title: 'User Type',
				dataIndex: 'usertype',
				key: 'usertype',
				...this.getColumnSearchProps('usertype'),
			},
			{
				title: 'Action',
				key: 'action',
				width: '10',
				render: (text, record) => (
					<Dropdown
						overlay={
							<Menu>
								<EditData id={record._id} />
								<Menu.Item onClick={(e) => this.props.deleteUser(record._id)}>
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
				),
			},
		];

		var users = this.props.foruser.users.filter((dt) => dt.usertype === 'user');
		var teamMember = this.props.foruser.users.filter((dt) => dt.usertype === 'team-member');
		var manager = this.props.foruser.users.filter((dt) => dt.usertype === 'manager');

		return (
			<Card title="Users Lists" style={{ padding: '0 !important', overflow: 'auto' }} extra={<AddData />}>
				<Menu
					onClick={(tab) => {
						if (this.state.activeTab !== tab.key) this.setActiveTab(tab.key);
					}}
					selectedKeys={[ this.state.activeTab ]}
					mode="horizontal"
					className="border-bottom-0"
				>
					<Menu.Item key="1">Users</Menu.Item>
					<Menu.Item key="2">Team Members</Menu.Item>
					<Menu.Item key="3">Managers</Menu.Item>
				</Menu>
				{this.state.activeTab === '1' && <Table columns={columns} dataSource={users} />}
				{this.state.activeTab === '2' && <Table columns={columns} dataSource={teamMember} />}
				{this.state.activeTab === '3' && <Table columns={columns} dataSource={manager} />}
			</Card>
		);
	}
}

export default connect((state) => state, { deleteUser })(UserTable);
