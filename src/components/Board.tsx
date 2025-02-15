import React from "react";
import styled from "styled-components";

import { Square } from "./Square";

const BoardContainer = styled.div`
	border: 4px solid darkblue;
	border-radius: 10px;
	min-width: 250px;
	min-height: 250px;
	margin: 0 auto;
	display: grid;
	grid-template: repeat(3, 1fr) / repeat(3, 1fr);
`;


interface BoardProps {
    squares: Array<any>,
    onClick: Function;
}

export const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
    return (
        <BoardContainer>
            {squares.map((square, i) => (
                <Square key={i} value={square} onClick={() => onClick(i)} />
            ))}
        </BoardContainer>
    );
};