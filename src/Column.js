import React from 'react';
import styled from 'styled-components';
import Task from './task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
        margin: 8px;
        border: 1px solid lightgrey;
        border-radius: 2px;
        width: 220px;
        font-family: Arial, Helvetica, sans-serif;
        display: flex;
        flex-direction: column;
        `;

const Title = styled.h3`
        padding: 8px;
        font-weight: bold;
                background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};

        font-size: 1.2em;`;

const TaskList = styled.div`
        padding: 8px;
        background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
        flex-grow: 1;
        min-height: 100px;
        `;

const Column = (props) => {

    return (
        <Draggable
            draggableId={props.column.id}
            index={props.index}>
            {(provided) => {
                return (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <Title {...provided.dragHandleProps}>
                            {props.column.title}
                        </Title>

                        <Droppable droppableId={props.column.id} type="task">
                            {(provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}
                                    {...provided.droppableProps}>

                                    {props.tasks.map((task, index) =>
                                        <Task key={task.id} task={task} index={index} />
                                    )}
                                    {provided.placeholder}
                                </TaskList>
                            )
                            }
                        </Droppable>
                    </Container>
                );
            }}
        </Draggable>
    );
};

export default Column;