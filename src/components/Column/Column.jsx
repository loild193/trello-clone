import React from 'react'
import PropTypes from 'prop-types'

import './Column.scss'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts';
import { Container, Draggable } from 'react-smooth-dnd';

function Column({ column, onCardDrop }) {
	const cards = mapOrder(column.cards, column.cardOrder, 'id');

	return (
		<div className="column">
			<header className="column-header">{ column.title }</header>
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
}

export default Column

