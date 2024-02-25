import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Task = (props) => {

    const Container = styled.div`
        border: 1px solid lightgrey;
        padding: 8px;
        margin-bottom: 8px;
        border-radius: 2px;`;

    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {provided => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                >
                    {props.task.content}
                </Container>
            )}
        </Draggable>
    );
};

export default Task;