import React from 'react';
import ReactDOM from 'react-dom/client';
import initialData from './initial-data';
import Column from './Column';
import 'reset-css';
import { DragDropContext } from 'react-beautiful-dnd';




const App = () => {

    // tate = initialData;
    const [state, setState] = React.useState(initialData);

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;
        console.log(source, destination, draggableId);

        if (!destination) {
            // dropped outside the list
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            // dropped in the same place
            return;
        }

        const column = state.columns[source.droppableId]; // get the column from the state
        const newTaskIds = Array.from(column.taskIds);  // create a new array from the old one
        newTaskIds.splice(source.index, 1); // remove the item from the old array
        newTaskIds.splice(destination.index, 0, draggableId); // add the item to the new array

        const newColumn = {
            ...column,
            taskIds: newTaskIds
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newColumn.id]: newColumn
            }
        };

        setState(newState);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {state.columnOrder.map(columnId => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
                return <Column key={column.id} column={column} tasks={tasks} />;
            })}
        </DragDropContext>
    );

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);

