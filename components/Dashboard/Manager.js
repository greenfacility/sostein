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
  Clock
} from 'react-feather';
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  List,
  Menu,
  Message,
  Progress,
  Row,
  Timeline
} from 'antd';
import {
  DiscreteColorLegend,
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  LineSeries,
  XAxis,
  YAxis
} from 'react-vis';

import { curveCatmullRom } from 'd3-shape';
import {connect} from 'react-redux'
// import Link from 'next/link'
import { useState } from "react";

import NoSSR from 'react-no-ssr';
import PostCard from '../shared/PostCard';
import StatCard from '../shared/StatCard';
import WeatherCard from '../shared/WeatherCard';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import {getDayRequestNo} from '../../redux/actions'
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

const menu = (
  <Menu>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Archive size={16} strokeWidth={1} className="mr-3" />{' '}
        <span>Archive</span>
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
        <Printer size={16} strokeWidth={1} className="mr-3" />{' '}
        <span>Print</span>
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
    )
  },
  {
    title: 'Total Work Completed',
    subtitle: (
      <span>
        <span className="mr-1">570</span>
        <TrendingUp size={20} strokeWidth={1} className="text-success" />
      </span>
    )
  },
  {
    title: 'Total Down Feedback',
    subtitle: (
      <span>
        <span className="mr-1">10</span>
      <TrendingDown size={20} strokeWidth={1} className="text-error" />
      </span>
    )
  }
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
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  return [d.getUTCFullYear(), weekNo, d.getMonth()+1 ];
}

const Overview = (props) => {

  
  const [days, setstate] = useState(getWeekNumber(new Date()))

  const axes = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

const generate = () => {
  let arr = [];
  axes.map(x => {
    const y = getDayRequestNo(props.requests.requests, days[1], x);
    arr.push({ x, y });
  });
  return arr;
};

const generateFilter = () => {
  let arr = [];
  let Completed = props.requests.requests.filter(dt => dt.status === 'done')
  axes.map(x => {
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
    color: '#007bff'
  },
  {
    title: 'Work Finished',
    data: generateFilter(),
    color: 'green'
  }
];

  const fetchIcon = (status) => {
    let icon ;
                const val = status
                switch (val) {
                  case "pending":
                     icon = <AlertCircle size={20} strokeWidth={1} color={theme.errorColor} />
                    break;
                  case "active":
                     icon = <Clock size={20} strokeWidth={1} />
                    break;
                  case "done":
                    icon = <CheckCircle size={20} strokeWidth={1} color='green' />
                    break
                  default:
                     icon = <AlertCircle size={20} strokeWidth={1} color={theme.errorColor} />
                    break;
                }
                return icon
  }
  const handleChange = (e) => {
    if (e == null) return
  let date = getWeekNumber(new Date(e._d));
  // console.log(e)
  // console.log(new Date(e._d), new Date())
    setstate(date)
  // generate()
}
  return (
    <div>
      <Card
        title="Manager Statistics"
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"
      >
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
            <VerticalBarSeries
              color={series[1].color}
              data={series[1].data}
            />
          </FlexibleWidthXYPlot>
        </NoSSR>
      </Card>

      {/* <Card
        title="User Statistics"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"
      >
        <NoSSR>    
          <Legend>
            <DiscreteColorLegend width={180} height={20} items={series} />
          </Legend>
          <Legend>
            <WeekPicker onChange={handleChange} placeholder="Select a week" />
          </Legend>
          <FlexibleWidthXYPlot height={300}>
          <HorizontalGridLines style={{ stroke: '#B7E9ED', strokeWidth: 0.5 }} />
          <VerticalGridLines style={{ stroke: '#B7E9ED', strokeWidth: 0.5 }} />
          <XAxis
            title="Days Of Month"
            style={{
              strokeWidth: 0.5,
              line: { stroke: '#ADDDE1' },
              ticks: { stroke: '#ADDDE1' },
              text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
            }}
          />
          <YAxis title="Work Done" style={{ strokeWidth: 0.5 }} />
          <LineSeries
            className="first-series"
            color="#007bff"
            curve={curveCatmullRom.alpha(0.5)}
            data={series[1].data}
            style={{
              strokeLinejoin: 'round',
              strokeWidth: 4
            }}
          />
          <LineSeries
            className="first-series"
            color="#f5222d"
            curve={curveCatmullRom.alpha(0.5)}
            data={series[0].data}
            style={{
              strokeLinejoin: 'round',
              strokeWidth: 4
            }}
          /> */}
      {/* <LineSeries className="second-series" color="#52c41a" data={null} />
      <LineSeries
        className="third-series"
        color="#f5222d"
        curve={'curveMonotoneX'}
        data={[
          { x: 1, y: 10 },
          { x: 2, y: 4 },
          { x: 3, y: 2 },
          { x: 4, y: 15 }
        ]}
        strokeDasharray="7, 3"
      />
      <LineSeries
        className="fourth-series"
        color="#faad14"
        curve={curveCatmullRom.alpha(0.5)}
        data={[{ x: 1, y: 7 }, { x: 2, y: 11 }, { x: 3, y: 9 }, { x: 4, y: 2 }]}
      /> */}
    {/* </FlexibleWidthXYPlot>
</NoSSR>
</Card> */}

      <Row gutter={16}>
        <Col sm={24} md={8} className="mb-4">
          <Card bodyStyle={{ padding: 0 }}>
            <Row
              type="flex"
              align="middle"
              justify="center"
              gutter={16}
              className="py-4"
            >
              <Progress
                type="dashboard"
                percent={90}
                width={181}
                format={percent => (
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
              renderItem={item => (
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
        <Col sm={24} md={8} className="mb-4">
          <Card
            title="Tasks"
            extra={
              <Button onClick={() => Router.push('/data')}>
                <Edit
                    size={20}
                    strokeWidth={1}
                    fill={theme.textColor}
                    />
              </Button>
            }
          >
            <Timeline pending="Tasks pending..." className="mt-2">
              {props.requests.requests.map(request => (
              <Timeline.Item
              key={request._id}
                dot={
                  fetchIcon(request.status)
                }
              >
                <div className="text-truncate">
                  <TimelinePeriod content={new Date(request.timestart).toDateString()} />
                  <span><a>{request.name}</a></span>
                </div>
              </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
        {/* For Work in Progress or Notifications*/}
        <Col sm={24} md={8} className="mb-4">
          <Card
            title="Activity"
            extra={
              <Button onClick={() => Router.push('/data')}>
                  <Edit
                    size={20}
                    strokeWidth={1}
                    fill={theme.textColor}
                    />
              </Button>
            }
          >
            <Timeline
              pending={<div className="ml-4">Activities pending...</div>}
              className="mt-2"
            >
              <Timeline.Item
                dot={<Avatar size={24} src="/static/images/face1.jpg" />}
              >
                <div className="ml-4 text-truncate">
                  <TimelinePeriod content="9.45" />
                  <span>
                    <a>John Doe</a> Fixing the bulb
                  </span>
                </div>
              </Timeline.Item>
              <Timeline.Item
                dot={<Avatar size={24} src="/static/images/face2.jpg" />}
              >
                <div className="ml-4 text-truncate">
                  <TimelinePeriod content="11.20" />
                  <span>
                    <a>Paula Bean</a> Working on the tap
                  </span>
                </div>
              </Timeline.Item>
              <Timeline.Item
                dot={<Avatar size={24} src="/static/images/face3.jpg" />}
              >
                <div className="ml-4 text-truncate">
                  <TimelinePeriod content="13.00" />
                  <span>
                    <a>Peter Hadji</a> Fixing the Kitchen sink
                  </span>
                </div>
              </Timeline.Item>
              <Timeline.Item
                dot={<Avatar size={24} src="/static/images/face4.jpg" />}
              >
                <div className="ml-4 text-truncate">
                  <TimelinePeriod content="15.00" />
                  <span>
                    <a>Trevor Belmont</a> Assigned to a new task
                  </span>
                </div>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default connect(state=> state, {})(Overview);
