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
	RadialChart,
	LineSeries,
	Hint,
	XAxis,
	YAxis,
} from 'react-vis';

import NoSSR from 'react-no-ssr';
import styled from 'styled-components';
import RequestTable from '../DataPage/RequestTable';
import PropertyTable from '../DataPage/PropertyTable';
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
	const [ value, setValue ] = useState(false);

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
			title: 'Total Work Order',
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
		ourData;
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
			<Card title="User Statistics" bodyStyle={{ padding: '1rem' }} className="mb-4">
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
			<Col sm={24} md={24} className="mb-4">
				<RequestTable />
			</Col>
			<Col sm={24} md={24} className="mb-4">
				<PropertyTable />
			</Col>
		</div>
	);
};

export default connect((state) => state, {})(Overview);
