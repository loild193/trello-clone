import React from 'react'
import PropTypes from 'prop-types'

import './BoardContent.scss'
import Column from 'components/Column/Column'

function BoardContent(props) {
	return (
		<div className="board-content">
			<Column />
			<Column />
		</div>
	)
}

BoardContent.propTypes = {

}

export default BoardContent

