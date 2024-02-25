import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Column = (props) => {

    const Container = styled.div`
        margin: 8px;
        border: 1px solid lightgrey;
        border-radius: 2px;`;
    const Title = styled.h3`
        padding: 8px;`;
    const TaskList = styled.div`
        padding: 8px;`;

    return (
        <Container>
            <Title>{props.column.title}</Title>
            <Droppable droppableId={props.column.id}>
                {(provided) => (
                    <TaskList
                        innerRef={provided.innerRef}
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