import React from 'react'
import PropTypes from 'prop-types'

import './Card.scss'

function Card({ card }) {
	const { title } = card;

	return (
		<li className="card-item">
			{ card.cover && <img className="card-cover" src={card.cover} alt="TTH" />}
			{ title }
		</li>
	)
}

Card.propTypes = {
	id: PropTypes.string,
	boardId: PropTypes.string,
	columnId: PropTypes.string,
	title: PropTypes.string.isRequired,
	cover: PropTypes.string,
}

Card.defaultProps = {
	id: null,
	boardId: null,
	columnId: null,
	title: '',
	cover: null,
}

export default Card

