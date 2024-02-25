import React from 'react';
import styled from 'styled-components';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
        margin: 8px;
        border: 1px solid lightgrey;
        border-radius: 2px;
        background-color: ;
        font-family: Arial, Helvetica, sans-serif;
        `;

const Title = styled.h3`
        padding: 8px;
        font-weight: bold;
        font-size: 1.2em;`;

const TaskList = styled.div`
        padding: 8px;
        background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
        `;

const Column = (props) => {

    return (
        <Container>
            <Title>{props.column.title}</Title>
            <Droppable droppableId={props.column.id}>
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}>
                        {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                        {provided.placeholder}

                    </TaskList>
                )
                }
            </Droppable>
        </Container>
    );
};

export default Column;