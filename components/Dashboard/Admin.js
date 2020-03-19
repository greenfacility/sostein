import {
	Archive,
	Bell,
	Bookmark,
	Edit,
	GitCommit,
	MessageCircle,
	MoreHorizontal,
	PhoneCall,
	Printer,
	Save,
	Activity,
	Trash,
	TrendingDown,
	TrendingUp,
	CheckCircle,
	AlertCircle,
	Clock,
} from 'react-feather';
import { Avatar, Card, Col, DatePicker, Dropdown, List, Menu, Message, Progress, Row, Timeline } from 'antd';
import {
	DiscreteColorLegend,
	FlexibleWidthXYPlot,
	HorizontalGridLines,
	VerticalBarSeries,
	VerticalGridLines,
	LineSeries,
	XAxis,
	YAxis,
} from 'react-vis';

import { curveCatmullRom } from 'd3-shape';

import NoSSR from 'react-no-ssr';
import PostCard from '../shared/PostCard';
import StatCard from '../shared/StatCard';
import WeatherCard from '../shared/WeatherCard';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import ServiceTable from '../DataPage/ServiceTable';
import RequestTable from '../DataPage/RequestTable';
import { useState } from 'react';
import { connect } from 'react-redux';
import { getDayRequestNo } from '../../redux/actions';

const { MonthPicker, WeekPicker } = DatePicker;

const Legend = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 0;
	.rv-discrete-color-legend {
		display: inline-block;
		width: auto !important;
	}
	.rv-discrete-color-legend-item {
		padding-top: 0;
		padding-bottom: 0;
	}
`;

const menu = (
	<Menu>
		<Menu.Item>
			<Row type="flex" align="middle">
				<Archive size={16} strokeWidth={1} className="mr-3" /> <span>Archive</span>
			</Row>
		</Menu.Item>
		<Menu.Item>
			<Row type="flex" align="middle">
				<Edit size={16} strokeWidth={1} className="mr-3" /> <span>Edit</span>
			</Row>
		</Menu.Item>
		<Menu.Item>
			<Row type="flex" align="middle">
				<Trash size={16} strokeWidth={1} className="mr-3" /> <span>Delete</span>
			</Row>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item>
			<Row type="flex" align="middle">
				<Save size={16} strokeWidth={1} className="mr-3" /> <span>Save as</span>
			</Row>
		</Menu.Item>
		<Menu.Item>
			<Row type="flex" align="middle">
				<Printer size={16} strokeWidth={1} className="mr-3" /> <span>Print</span>
			</Row>
		</Menu.Item>
	</Menu>
);

const data = [
	{
		title: 'Total Work Done',
		subtitle: (
			<span>
				<span className="mr-1">580</span>
				<TrendingUp size={20} strokeWidth={1} className="text-success" />
			</span>
		),
	},
	{
		title: 'Total Work Completed',
		subtitle: (
			<span>
				<span className="mr-1">570</span>
				<TrendingUp size={20} strokeWidth={1} className="text-success" />
			</span>
		),
	},
	{
		title: 'Total Down Feedback',
		subtitle: (
			<span>
				<span className="mr-1">10</span>
				<TrendingDown size={20} strokeWidth={1} className="text-error" />
			</span>
		),
	},
];

const TimelinePeriod = ({ content }) => (
	<small
		className="text-muted"
		css={`
      display: block;
    `}
	>
		{content}
	</small>
);

const getWeekNumber = (d) => {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	return [ d.getUTCFullYear(), weekNo, d.getMonth() + 1 ];
};

const Overview = (props) => {
	const [ days, setstate ] = useState(getWeekNumber(new Date()));

	const axes = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat' ];

	const generate = () => {
		let arr = [];
		axes.map((x) => {
			const y = getDayRequestNo(props.requests.requests, days[1], x);
			arr.push({ x, y });
		});
		return arr;
	};

	const generateFilter = () => {
		let arr = [];
		let Completed = props.requests.requests.filter((dt) => dt.status === 'done');
		axes.map((x) => {
			const y = getDayRequestNo(Completed, days[1], x);
			arr.push({ x, y });
		});
		// console.log(y)
		return arr;
	};

	const series = [
		{
			title: 'Total Request',
			data: generate(),
			color: '#007bff',
		},
		{
			title: 'Work Finished',
			data: generateFilter(),
			color: 'green',
		},
	];

	const handleChange = (e) => {
		if (e == null) return;
		let date = getWeekNumber(new Date(e._d));
		// console.log(e)
		// console.log(new Date(e._d), new Date())
		setstate(date);
		// generate()
	};
	return (
		<div>
			<Card title="Team Member Statistics" bodyStyle={{ padding: '1rem' }} className="mb-4">
				<NoSSR>
					<Legend>
						<DiscreteColorLegend width={180} height={20} items={series} />
					</Legend>
					<Legend>
						<h4>Week:</h4>
						<WeekPicker onChange={handleChange} format={'WW-YYYY'} placeholder="Select a week" />
					</Legend>
					<FlexibleWidthXYPlot xType="ordinal" height={340} xDistance={100}>
						<VerticalGridLines style={{ strokeWidth: 0.5 }} />
						<HorizontalGridLines style={{ strokeWidth: 0.5 }} />
						<XAxis style={{ strokeWidth: 0.5 }} />
						<YAxis style={{ strokeWidth: 0.5 }} />
						<VerticalBarSeries color={series[0].color} data={series[0].data} />
						<VerticalBarSeries color={series[1].color} data={series[1].data} />
					</FlexibleWidthXYPlot>
				</NoSSR>
			</Card>

			<Row gutter={16}>
				<Col sm={24} md={12} className="mb-4">
					<Card bodyStyle={{ padding: 0 }}>
						<Row type="flex" align="middle" justify="center" gutter={16} className="py-4">
							<Progress
								type="dashboard"
								percent={90}
								width={181}
								format={(percent) => (
									<span className="text-center">
										<div
											css={`
                        display: block;
                        color: #007bff;
                        margin: auto;
                      `}
										>
											<GitCommit size={20} strokeWidth={2} />
										</div>
										<div
											className="h5 mb-0"
											css={`
                        display: block;
                      `}
										>
											{percent}
										</div>
										<div className="h6">
											<small>User Rating</small>
										</div>
									</span>
								)}
							/>
						</Row>

						<List
							itemLayout="horizontal"
							dataSource={data}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										title={
											<a
												href="javascript:;"
												className="px-4"
												css={`
                          display: flex;
                        `}
											>
												{item.title}
												<span className="mr-auto" />
												<small>{item.subtitle}</small>
											</a>
										}
									/>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
				{/* For Work in Progress or Notifications*/}
				<Col sm={24} md={12} className="mb-4">
					<ServiceTable />
				</Col>
				<Col sm={24} md={24} className="mb-4">
					<RequestTable />
				</Col>
			</Row>
		</div>
	);
};

export default connect((state) => state, {})(Overview);
