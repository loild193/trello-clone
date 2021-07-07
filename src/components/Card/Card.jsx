import PropTypes from 'prop-types';
import React from 'react';
import './Card.scss';

function Card({ card }) {
	const { title } = card;

	const handleOnMouseDown = (event) => {
		event.preventDefault();
	}

	return (
		<div className="card-item">
			{ card.cover && 
				<img 
					className="card-cover" 
					src={card.cover} 
					alt="TTH"
					onMouseDown={handleOnMouseDown} 
				/>
			}
			{ title }
		</div>
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

