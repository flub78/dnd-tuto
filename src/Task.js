import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
        border: 1px solid lightgrey;
        padding: 8px;
        margin-bottom: 8px;
        border-radius: 2px;
        background-color: ${props => (props.is_dragging ? 'lightgreen' : 'white')};`;

const Task = (props) => {

    return (
        <Draggable draggableId={props.task.id}
            index={props.index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    is_dragging={snapshot.isDragging}
                >
                    {props.task.content}
                </Container>
            )}
        </Draggable>
    );
};

export default Task;