import React from 'react'
import PropTypes from 'prop-types'

import './Task.scss'

function Task(props) {
	return (
		<li className="task-item">
			<img src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/s1080x2048/155187045_1176505132801911_4373353207752044211_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=a4a2d7&_nc_ohc=NQ_Q-7E6rBgAX_QVmdm&_nc_ht=scontent-hkg4-1.xx&tp=7&oh=0066cdbd152dc2a4a2753d2a061ebd20&oe=60D40BB9" alt="TTH" />
			Love you and only you
		</li>
	)
}

Task.propTypes = {

}

export default Task

