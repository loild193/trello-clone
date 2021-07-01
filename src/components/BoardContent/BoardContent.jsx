import React, { useEffect, useState, useRef } from 'react'

import './BoardContent.scss'
import Column from 'components/Column/Column'
import { initData } from 'actions/inititalData';
import { isEmpty } from 'lodash';
import { mapOrder } from 'utilities/sorts';
import { applyDrag } from 'utilities/dnd';
import { Container, Draggable } from 'react-smooth-dnd';
import { Container as BootstrapContainer } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function BoardContent(props) {
	const [board, setBoard] = useState({});
	const [columns, setColumns] = useState([]);
	const [addNewColumnButtonVisible, setAddNewColumnButtonVisible] = useState(true);
	const [newColumnTitle, setNewColumnTitle] = useState('');

	const addNewColumnInputRef = useRef(null);

	useEffect(() => {
		const boardFromDB = initData.boards.find(board => board.id === 'board-1');

		if (boardFromDB) {
			setBoard(boardFromDB);
			setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'));
		}
	}, []);

	useEffect(() => {
		if (addNewColumnInputRef && addNewColumnInputRef.current) {
			addNewColumnInputRef.current.focus();
			addNewColumnInputRef.current.select();
		}
	}, [addNewColumnButtonVisible]);

	if (isEmpty(board)) {
		return <div className="not-found" style={{ 'padding': '10px', 'color': '#fff' }}>Board not found</div>
	}

	const onColumnDrop = (dropResult) => {
		let newBoard = {...board};
		let newColumns = [...columns];

		newColumns = applyDrag(newColumns, dropResult);
		newBoard.columnOrder = newColumns.map(column => column.id);
		newBoard.columns = newColumns;

		setColumns(newColumns);
		setBoard(newBoard);
	}

	const handleOnCardDrop = (dropResult, columnId) => {
		if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
			let newColumns = [...columns];
			let currentColumn = newColumns.find(column => column.id === columnId);

			currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
			currentColumn.cardOrder = currentColumn.cards.map(card => card.id);

			setColumns(newColumns);
		}
	}

	const handleAddNewColumnVisible = () => {
		setAddNewColumnButtonVisible(prev => !prev);
	}

	const handleAddNewColumn = () => {
		if (newColumnTitle) {
			const newColumn = {
				id: Math.random().toString(36).substring(2, 5),
				boardId: board.id,
				title: newColumnTitle.trim(),
				cardOrder: [],
				cards: [],
			};
			const newColumns = [...columns, newColumn];
			setColumns(newColumns);
			setBoard(prevBoard => {
				return {
					...prevBoard,
					columnOrder: [...prevBoard.columnOrder, newColumn.id],
					columns: newColumns,
				}
			});
			setNewColumnTitle('');
		}

		addNewColumnInputRef.current.focus();
	}

	const handleOnChangeAddColumnTitleInput = (e) => {
		setNewColumnTitle(e.target.value);
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
			<BootstrapContainer className="bootstrap-container">
				{
					addNewColumnButtonVisible
						? <Row>
								<Col className="add-new-column" onClick={handleAddNewColumnVisible}>
									<span><i className="fa fa-plus icon" /></span>
									<span>Add another column</span>
								</Col>
							</Row>
						: <Row>
								<Col className="enter-new-column">
									<Form.Control
										ref={addNewColumnInputRef} 
										size="sm"
										type="text"
										placeholder="Enter column title"
										className="input-enter-new-column"
										value={newColumnTitle}
										onChange={handleOnChangeAddColumnTitleInput}
										onKeyDown={e => (e.key === 'Enter') && handleAddNewColumn()}
									/>
									<Button 
										variant="success"
										size="sm"
										className="button-enter-new-column"
										onClick={handleAddNewColumn}
									>
										Add column
									</Button>
									<span className="remove-icon" onClick={handleAddNewColumnVisible}>
										<i className="fa fa-remove icon" />
									</span>
								</Col>
							</Row>
				}
			</BootstrapContainer>
		</div>
	)
}

export default BoardContent

