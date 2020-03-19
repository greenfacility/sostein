import { Badge, Calendar } from 'antd';

import CalendarStyles from './styles/Calendar';

const getListData = value => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' }
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' }
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' }
      ];
      break;
    default:
  }
  return listData || [];
};

const dateCellRender = value => {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <small>
            <Badge status={item.type} text={item.content} />
          </small>
        </li>
      ))}
    </ul>
  );
};

const getMonthData = value => {
  if (value.month() === 8) {
    return 1394;
  }
};

const monthCellRender = value => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};

const CalendarPage = () => (
  <CalendarStyles>
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  </CalendarStyles>
);

export default CalendarPage;
