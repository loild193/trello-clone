export const handleSelectAllText = e => {
	e.target.focus();
	e.target.select();
}

export const handlePressEnter = e => {
	if (e.key === 'Enter') {
		e.target.blur();
	}
}