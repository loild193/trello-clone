import React from 'react'
import PropTypes from 'prop-types'

import parse from 'html-react-parser';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CLOSE_MODAL, CONFIRM_MODAL } from 'utilities/constants';

function ConfirmModal({ show, onConfirmModalAction, title, content }) {
  return (
    <>
      <Modal show={show} onHide={() => onConfirmModalAction(CLOSE_MODAL)}>
        <Modal.Header closeButton>
          <Modal.Title>{ parse(title) }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ parse(content) }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onConfirmModalAction(CLOSE_MODAL)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => onConfirmModalAction(CONFIRM_MODAL)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ConfirmModal.propTypes = {
	show: PropTypes.bool.isRequired,
	onConfirmModalAction: PropTypes.func,
	title: PropTypes.string,
	content: PropTypes.string,
}

ConfirmModal.defaultProps = {
	show: false,
	onConfirmModalAction: null,
	title: '',
	content: '',
};

export default ConfirmModal

