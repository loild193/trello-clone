import React from 'react'
import PropTypes from 'prop-types'

import './Column.scss'
import Task from 'components/Task/Task'

function Column(props) {
	return (
		<div className="column">
			<header>Brainstorm</header>
			<ul className="task-list">
				<Task />
				<li className="task-item">Love you and only you</li>
				<li className="task-item">Love you and only you</li>
				<li className="task-item">Love you and only you</li>
				<li className="task-item">Love you and only you</li>
				<li className="task-item">Love you and only you</li>
			</ul>
			<footer>Add another card</footer>
		</div>
	)
}

Column.propTypes = {

}

export default Column

