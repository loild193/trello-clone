import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './Column.scss'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts';
import { Container, Draggable } from 'react-smooth-dnd';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import ConfirmModal from 'components/common/ConfirmModal';
import { CONFIRM_MODAL } from 'utilities/constants';
import { useEffect } from 'react';
import { handlePressEnter, handleSelectAllText } from 'utilities/editableContent';

function Column({ column, onCardDrop, onUpdateColumns }) {
	const cards = mapOrder(column.cards, column.cardOrder, 'id');

	const [newTitleColumn, setNewTitleColumn] = useState('');
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	useEffect(() => {
		setNewTitleColumn(column.title);
	}, [column.title]);

	const toogleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

	const handleOnConfirmModalAction = type => {
		if (type === CONFIRM_MODAL) {
			const newColumn = {
				...column,
				_deleted: true,
			};
			onUpdateColumns(newColumn);
		}

		toogleShowConfirmModal();
	}

	const handleNewTitleChange = e => {
		setNewTitleColumn(e.target.value);
	}

	const handleNewTitleBlur = e => {
		e.target.blur();
		const newColumn = {
			...column,
			title: newTitleColumn,
		};
		onUpdateColumns(newColumn);
	}

	const handleOnMouseDown = e => {
		e.preventDefault();
	}

	return (
		<div className="column">
			<header className="column-header">
				<div className="column-title">
					<Form.Control
						size="sm"
						type="text"
						placeholder="Enter column title"
						className="content-editable-input"
						value={newTitleColumn}
						onClick={handleSelectAllText}
						onChange={handleNewTitleChange}
						onBlur={handleNewTitleBlur}
						onMouseDown={handleOnMouseDown}
						onKeyDown={handlePressEnter}
						spellCheck='false'
					/>
				</div>
				<div className="column-dropdown-actions">
					<Dropdown>
						<Dropdown.Toggle size="sm" id="dropdown-basic" className="btn-dropdown" />

						<Dropdown.Menu>
							<Dropdown.Item>Add card</Dropdown.Item>
							<Dropdown.Item onClick={toogleShowConfirmModal}>Delete column</Dropdown.Item>
							<Dropdown.Item>Something else</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</header>
			<div className="card-list">
				<Container
					groupName="columns"
					onDrop={dropResult => onCardDrop(dropResult, column.id)}
					getChildPayload={index => cards[index]}
					dragClass="card-ghost"
					dropClass="card-ghost-drop"
					dropPlaceholder={{                      
						animationDuration: 150,
						showOnTop: true,
						className: 'card-drop-preview' 
					}}
					dropPlaceholderAnimationDuration={200}
				>
					{
						cards.map(card => 
							<Draggable key={card.id}>
								<Card card={card} />
							</Draggable>
						)
					}
				</Container>
			</div>
			<footer>
				<div className="footer-actions">
					<span><i className="fa fa-plus icon" /></span>
					<span>Add another card</span>
				</div>
			</footer>
			<ConfirmModal
				show={showConfirmModal}
				onConfirmModalAction={handleOnConfirmModalAction}
				title='Confirm delete column'
				content={`Are you sure to delete <strong>${column.title}</strong>? All cards in this column will be deleted.`}
			/>
		</div>
	)
}

Column.propTypes = {
	column: PropTypes.shape({
		id: PropTypes.string,
		boardId: PropTypes.string,
		title: PropTypes.string,
		cardOrder: PropTypes.array,
		cards: PropTypes.array,
	}),
	onCardDrop: PropTypes.func,
	onUpdateColumns: PropTypes.func,
}

Column.defaultProps = {
	column: {
		id: null,
		boardId: null,
		title: null,
		cardOrder: [],
		cards: [],
	},
	onCardDrop: null,
	onUpdateColumns: null,
}

export default Column

