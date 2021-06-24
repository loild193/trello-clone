import React from 'react'
import PropTypes from 'prop-types'

import './Column.scss'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts';

function Column({ column }) {
	const cards = mapOrder(column.cards, column.cardOrder, 'id');

	return (
		<div className="column">
			<header>{ column.title }</header>
			<ul className="card-list">
				{
					cards.map(card => <Card key={card.id} card={card} />)
				}
			</ul>
			<footer>Add another card</footer>
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
}

Column.defaultProps = {
	column: {
		id: null,
		boardId: null,
		title: null,
		cardOrder: [],
		cards: [],
	},
}

export default Column

