import React, { useEffect, useState } from 'react'

import './BoardContent.scss'
import Column from 'components/Column/Column'
import { initData } from 'actions/inititalData';
import { isEmpty } from 'lodash';
import { mapOrder } from 'utilities/sorts';
import { applyDrag } from 'utilities/dnd';
import { Container, Draggable } from 'react-smooth-dnd';

function BoardContent(props) {
	const [board, setBoard] = useState({});
	const [columns, setColumns] = useState([]);

	useEffect(() => {
		const boardFromDB = initData.boards.find(board => board.id === 'board-1');

		if (boardFromDB) {
			setBoard(boardFromDB);
			setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'));
		}
	}, []);

	if (isEmpty(board)) {
		return <div className="not-found" style={{ 'padding': '10px', 'color': '#fff' }}>Board not found</div>
	}

	const onColumnDrop = (dropResult) => {
		let newBoard = {...board};
		let newColumns = [...columns];

		newColumns = applyDrag(newColumns, dropResult);
		newBoard.columnOrder = newColumns.map(column => column.id);
		newBoard.columns = newColumns;

		setColumns(prev => newColumns);
		setBoard(prev => newBoard);
	}

	const handleOnCardDrop = (dropResult, columnId) => {
		if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
			let newColumns = [...columns];
			let currentColumn = newColumns.find(column => column.id === columnId);

			currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
			currentColumn.cardOrder = currentColumn.cards.map(card => card.id);

			setColumns(prev => newColumns);
		}
	}

	return (
		<div className="board-content">
			<Container
				orientation="horizontal"
				onDrop={onColumnDrop}
				getChildPayload={index => columns[index]}
				dragHandleSelector=".column-header"
				dragClass="column-ghost"
				dropClass="column-ghost-drop"
				dropPlaceholder={{
					animationDuration: 150,
					showOnTop: true,
					className: 'column-drop-preview'
				}}
			>
				{
					columns.map(column => 
						<Draggable key={column.id}>
							<Column 
								column={column} 
								onCardDrop={handleOnCardDrop} 
							/>
						</Draggable>	
					)
				}
			</Container>
			<div className="add-new-column">
					<span><i className="fa fa-plus icon" /></span>
					<span>Add another column</span>
			</div>
		</div>
	)
}

export default BoardContent

