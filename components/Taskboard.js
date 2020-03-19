import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import reorder, { reorderQuoteMap } from './shared/taskboard/reorder';

import Column from './shared/taskboard/Column';
import MockTaskboard from '../demos/mock/taskboard';
import { useState } from 'react';

const Taskboard = () => {
  const [columns, setColumn] = useState(MockTaskboard);
  const [ordered, setOrder] = useState(Object.keys(columns));

  const onDragEnd = result => {
    if (!result.destination) return;

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === 'COLUMN') {
      const ordered = reorder(ordered, source.index, destination.index);

      setOrder(ordered);

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination
    });

    setColumn(data.quoteMap);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="taskboard" type="COLUMN">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="full-workspace scroll-x text-nowrap px-2"
          >
            {ordered.map((key, index) => (
              <Column
                key={key}
                index={index}
                title={key}
                tasks={columns[key]}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Taskboard;
