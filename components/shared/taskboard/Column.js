import { Inner, Wrapper } from '../../styles/Taskboard';

import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import TaskList from './TaskList';

const Column = ({ title, tasks, index }) => (
  <Draggable draggableId={title} index={index}>
    {provided => (
      <Wrapper key={index}>
        <Inner>
          <h6 className="mx-2 mt-2 text-capitalize">{title}</h6>
          <div
            className="p-1 scroll-y"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <TaskList listId={title} tasks={tasks} />
          </div>
        </Inner>
      </Wrapper>
    )}
  </Draggable>
);

Column.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      color: PropTypes.oneOf([
        'primary',
        'success',
        'error',
        'info',
        'normal',
        'warning'
      ]),
      tags: PropTypes.array,
      images: PropTypes.array
    })
  ).isRequired
};

export default Column;
