import Card from 'components/Card/Card';
import ConfirmModal from 'components/common/ConfirmModal';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { Container, Draggable } from 'react-smooth-dnd';
import { CONFIRM_MODAL } from 'utilities/constants';
import { handlePressEnter, handleSelectAllText } from 'utilities/editableContent';
import { mapOrder } from 'utilities/sorts';
import './Column.scss';

function Column({ column, onCardDrop, onUpdateColumns }) {
	const cards = mapOrder(column.cards, column.cardOrder, 'id');

	const [newTitleColumn, setNewTitleColumn] = useState('');
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const [newCardTitle, setNewCardTitle] = useState('');
	const [addNewCardButtonVisible, setAddNewCardButtonVisible] = useState(true);

	const addNewCardInputRef = useRef(null);

	useEffect(() => {
		setNewTitleColumn(column.title);
	}, [column.title]);

	useEffect(() => {
		if (addNewCardInputRef && addNewCardInputRef.current) {
			addNewCardInputRef.current.focus();
			addNewCardInputRef.current.select();
		}
	}, [addNewCardButtonVisible]);

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

	const handleNewTitleChange = e => setNewTitleColumn(e.target.value);

	const handleNewTitleBlur = e => {
		e.target.blur();
		const newColumn = {
			...column,
			title: newTitleColumn,
		};
		onUpdateColumns(newColumn);
	}

	const handlePreventDefault = e => e.preventDefault();

	const handleAddNewCardVisible = () =>	setAddNewCardButtonVisible(!addNewCardButtonVisible);

	const handleOnChangeAddCardTitleInput = e => setNewCardTitle(e.target.value);

	const handleAddNewCard = (e) => {
		if (!newCardTitle) {
			handlePreventDefault(e);
			addNewCardInputRef.current.focus();
			return;
		}

		const newCard = {
			id: Math.random().toString(36).substring(2, 5), 
			boardId: column.boardId,
			columnId: column.id, 
			title: newCardTitle.trim(),
			cover: null,
		}
		const newColumn = {
			...column,
			cardOrder: [
				...column.cardOrder,
				newCard.id,
			],
			cards: [
				...column.cards,
				newCard,
			],
		}

		onUpdateColumns(newColumn);
		setNewCardTitle('');
		setAddNewCardButtonVisible(!addNewCardButtonVisible);

		addNewCardInputRef.current.focus();
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
						onMouseDown={handlePreventDefault}
						onKeyDown={handlePressEnter}
						spellCheck='false'
					/>
				</div>
				<div className="column-dropdown-actions">
					<Dropdown>
						<Dropdown.Toggle size="sm" id="dropdown-basic" className="btn-dropdown" />

						<Dropdown.Menu>
							<Dropdown.Item onClick={handleAddNewCardVisible}>Add card</Dropdown.Item>
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
				{
					!addNewCardButtonVisible
						&&	<Form.Control
									ref={addNewCardInputRef} 
									size="sm"
									as="textarea"
									rows="3"
									placeholder="Enter new card title"
									className="input-enter-new"
									value={newCardTitle}
									onChange={handleOnChangeAddCardTitleInput}
									onKeyDown={e => (e.key === 'Enter') && handleAddNewCard(e)}
								/>
				}
			</div>
			<footer>
				{
					addNewCardButtonVisible 
						? <div className="footer-actions" onClick={handleAddNewCardVisible}>
								<span><i className="fa fa-plus icon" /></span>
								<span>Add another card</span>
							</div>
						: <div className="add-new-card-area">
								<Button 
									variant="success"
									size="sm"
									className="button-enter-new"
									onClick={handleAddNewCard}
								>
									Add column
								</Button>
								<span className="remove-icon" onClick={handleAddNewCardVisible}>
									<i className="fa fa-remove icon" />
								</span>
							</div>
				}
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

