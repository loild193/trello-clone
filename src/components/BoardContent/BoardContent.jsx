import React, { useEffect, useState } from 'react'

import './BoardContent.scss'
import Column from 'components/Column/Column'
import { initData } from 'actions/inititalData';
import { isEmpty } from 'lodash';
import { mapOrder } from 'utilities/sorts';

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

	return (
		<div className="board-content">
			{
				columns.map(column => <Column key={column.id} column={column} />)
			}
		</div>
	)
}

export default BoardContent

