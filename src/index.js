import React from 'react';
import ReactDOM from 'react-dom/client';
import initialData from './initial-data';
import Column from './Column';
import 'reset-css';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
        `;

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

        const start = state.columns[source.droppableId]; // get the column from the state
        const finish = state.columns[destination.droppableId]; // get the column from the state

        if (start === finish) {

            const newTaskIds = Array.from(start.taskIds);  // create a new array from the old one
            newTaskIds.splice(source.index, 1); // remove the item from the old array
            newTaskIds.splice(destination.index, 0, draggableId); // add the item to the new array

            const newColumn = {
                ...start,
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

        } else {
            // Moving from one list to another
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds
            };

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds
            };

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish
                }
            };

            setState(newState);

        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <Container>
                {state.columnOrder.map(columnId => {
                    const column = state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </Container>
        </DragDropContext>
    );

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);

