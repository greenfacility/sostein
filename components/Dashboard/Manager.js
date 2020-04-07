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
import { Avatar, Button, Card, Col, DatePicker, Dropdown, List, Menu, Message, Progress, Row, Timeline } from 'antd';
import {
	DiscreteColorLegend,
	FlexibleWidthXYPlot,
	HorizontalGridLines,
	VerticalBarSeries,
	VerticalGridLines,
	RadialChart,
	Hint,
	LineSeries,
	XAxis,
	YAxis,
} from 'react-vis';

import { curveCatmullRom } from 'd3-shape';
import { connect } from 'react-redux';
// import Link from 'next/link'
import { useState } from 'react';

import NoSSR from 'react-no-ssr';
import PostCard from '../shared/PostCard';
import StatCard from '../shared/StatCard';
import WeatherCard from '../shared/WeatherCard';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import { getDayRequestNo } from '../../redux/actions';
import Router from 'next/router';

const { WeekPicker } = DatePicker;

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

const generateRating = (requests = []) => {
	let totalRate = 0;
	requests.map((data) => {
		if (data.rating != 0) {
			totalRate = totalRate + data.rating;
		} else {
			totalRate = totalRate + 5;
		}
	});
	let rpercent = totalRate / (5 * requests.length) * 100;
	return parseInt(rpercent);
};

const Overview = (props) => {
	const [ days, setstate ] = useState(getWeekNumber(new Date()));
	const [ rating, setRating ] = useState(generateRating(props.requests.requests) || 0);
	const [ value, setValue ] = useState(false);

	const axes = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat' ];

	const data = [
		{
			title: 'Total Work Assigned',
			subtitle: (
				<span>
					<span className="mr-1">{props.requests.requests.length}</span>
					<TrendingUp size={20} strokeWidth={1} className="text-success" />
				</span>
			),
		},
		{
			title: 'Total Work Completed',
			subtitle: (
				<span>
					<span className="mr-1">{props.requests.requests.filter((dt) => dt.status === 'done').length}</span>
					<TrendingUp size={20} strokeWidth={1} className="text-success" />
				</span>
			),
		},
	];

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

	const fetchIcon = (status) => {
		let icon;
		const val = status;
		switch (val) {
			case 'pending':
				icon = <AlertCircle size={20} strokeWidth={1} color={theme.errorColor} />;
				break;
			case 'active':
				icon = <Clock size={20} strokeWidth={1} />;
				break;
			case 'done':
				icon = <CheckCircle size={20} strokeWidth={1} color="green" />;
				break;
			default:
				icon = <AlertCircle size={20} strokeWidth={1} color={theme.errorColor} />;
				break;
		}
		return icon;
	};
	const handleChange = (e) => {
		if (e == null) return;
		let date = getWeekNumber(new Date(e._d));
		// console.log(e)
		// console.log(new Date(e._d), new Date())
		setstate(date);
		// generate()
	};

	var requests = props.requests.requests;

	var pendingReq = requests.filter((dt) => dt.status === 'pending').length;
	var ongoingReq = requests.filter((dt) => dt.status === 'on-going').length;
	var holdReq = requests.filter((dt) => dt.status === 'hold').length;
	var parkReq = requests.filter((dt) => dt.status === 'park').length;
	var doneReq = requests.filter((dt) => dt.status === 'done').length;

	const ourData = [
		{ theta: pendingReq || 0, color: '#007bff', title: 'Pending', className: 'custom-class' },
		{ theta: doneReq || 0, color: '#52c41a', title: 'Done' },
		{ theta: ongoingReq || 0, color: '#faad14', title: 'Ongoing' },
		{ theta: holdReq || 0, color: '#f5222d', title: 'Hold' },
		{ theta: parkReq || 0, color: '#52ffff', title: 'Park' },
	];

	const finalFilter = () => {
		let arr = [];
		ourData.map((dt) => {
			arr.push({ x: dt.title, y: dt.theta });
		});
		return arr;
	};

	return (
		<div>
			<Card title="Manager Statistics" bodyStyle={{ padding: '1rem' }} className="mb-4">
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
			<Col sm={24} md={24}>
				<Col sm={24} md={12} className="mb-4">
					<Card>
						<NoSSR>
							{/* <Legend>
								<DiscreteColorLegend width={180} height={20} items={ourData} />
							</Legend> */}
							<RadialChart
								className={'donut-chart-example m-auto'}
								innerRadius={80}
								radius={140}
								getAngle={(d) => d.theta}
								data={ourData}
								getLabel={(d) => d.title}
								showLabels
								onValueMouseOver={(v) => setValue(v)}
								onSeriesMouseOut={(v) => setValue(false)}
								width={300}
								height={300}
								padAngle={0.04}
							>
								{value && <Hint value={value} />}
							</RadialChart>
						</NoSSR>
					</Card>
				</Col>
				<Col sm={24} md={12} className="mb-4">
					<Card>
						<NoSSR>
							<FlexibleWidthXYPlot xType="ordinal" height={320} xDistance={100}>
								<VerticalGridLines style={{ strokeWidth: 0.5 }} />
								<HorizontalGridLines style={{ strokeWidth: 0.5 }} />
								<XAxis style={{ strokeWidth: 0.5 }} />
								<YAxis style={{ strokeWidth: 0.5 }} />
								<VerticalBarSeries color={ourData[1].color} data={finalFilter()} />
							</FlexibleWidthXYPlot>
						</NoSSR>
					</Card>
				</Col>
			</Col>

			<Row gutter={16}>
				<Col sm={24} md={12} className="mb-4">
					<Card bodyStyle={{ padding: 0 }}>
						<Row type="flex" align="middle" justify="center" gutter={16} className="py-4">
							<Progress
								type="dashboard"
								percent={rating}
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
											{percent}%
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
				{/* For Work to be assigned*/}
				<Col sm={24} md={12} className="mb-4">
					<Card
						title="Tasks"
						extra={
							<Button onClick={() => Router.push('/data')}>
								<Edit size={20} strokeWidth={1} fill={theme.textColor} />
							</Button>
						}
					>
						<Timeline pending="Tasks pending..." className="mt-2">
							{props.requests.requests.slice(0, 7).map((request) => (
								<Timeline.Item key={request._id} dot={fetchIcon(request.status)}>
									<div className="text-truncate">
										<TimelinePeriod content={new Date(request.timestart).toDateString()} />
										<span>
											<a>{request.name}</a>
										</span>
									</div>
								</Timeline.Item>
							))}
						</Timeline>
					</Card>
				</Col>
				{/* For Work in Progress or Notifications*/}
				{/* <Col sm={24} md={8} className="mb-4">
					<Card
						title="Activity"
						extra={
							<Button onClick={() => Router.push('/data')}>
								<Edit size={20} strokeWidth={1} fill={theme.textColor} />
							</Button>
						}
					>
						<Timeline pending={<div className="ml-4">Activities pending...</div>} className="mt-2">
							<Timeline.Item dot={<Avatar size={24} src="/static/images/face1.jpg" />}>
								<div className="ml-4 text-truncate">
									<TimelinePeriod content="9.45" />
									<span>
										<a>John Doe</a> Fixing the bulb
									</span>
								</div>
							</Timeline.Item>
							<Timeline.Item dot={<Avatar size={24} src="/static/images/face2.jpg" />}>
								<div className="ml-4 text-truncate">
									<TimelinePeriod content="11.20" />
									<span>
										<a>Paula Bean</a> Working on the tap
									</span>
								</div>
							</Timeline.Item>
							<Timeline.Item dot={<Avatar size={24} src="/static/images/face3.jpg" />}>
								<div className="ml-4 text-truncate">
									<TimelinePeriod content="13.00" />
									<span>
										<a>Peter Hadji</a> Fixing the Kitchen sink
									</span>
								</div>
							</Timeline.Item>
							<Timeline.Item dot={<Avatar size={24} src="/static/images/face4.jpg" />}>
								<div className="ml-4 text-truncate">
									<TimelinePeriod content="15.00" />
									<span>
										<a>Trevor Belmont</a> Assigned to a new task
									</span>
								</div>
							</Timeline.Item>
						</Timeline>
					</Card>
				</Col> */}
			</Row>
		</div>
	);
};

export default connect((state) => state, {})(Overview);
