import React, { useEffect, useState } from 'react'

import './BoardContent.scss'
import Column from 'components/Column/Column'
import { initData } from 'actions/inititalData';
import { isEmpty } from 'lodash';
import { mapOrder } from 'utilities/sorts';
import { Container, Draggable } from 'react-smooth-dnd';

function BoardContent(props) {
	const [board, setBoard] = useState({});
	const [columns, setColumns] = useState([]);

	useEffect(() => {
		const boardFromDB = initData.boards.find(board => board.id === 'board-1');

		if (boardFromDB) {
			setBoard(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'));
			setColumns(boardFromDB.columns);
		}
	}, []);

	if (isEmpty(board)) {
		return <div className="not-found" style={{ 'padding': '10px', 'color': '#fff' }}>Board not found</div>
	}

	const onColumnDrop = (dropResult) => {
		console.log(dropResult);
	}

	return (
		<div className="board-content">
			<Container
				orientation="horizontal"
				onDrop={onColumnDrop}
				getChildPayload={index => columns[index]}
				dragHandleSelector=".column-header"
				dropPlaceholder={{
					animationDuration: 150,
					showOnTop: true,
					className: 'column-drop-preview'
				}}
			>
				{
					columns.map(column => 
						<Draggable key={column.id}>
							<Column column={column} />
						</Draggable>	
					)
				}
			</Container>
		</div>
	)
}

export default BoardContent

