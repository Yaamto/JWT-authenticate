import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import "./banned.css"
import {BsExclamationOctagonFill} from "react-icons/bs"
const Banned = ({ban, onClose}) => {
   
    const handleClose = () => {
        onClose()
    }

    return (
        <div>
              <Modal show={ban} onHide={handleClose} className="Modal-banned">
                <Modal.Header >
                    <Modal.Title className='modal-banned-title'> <span className='attention'><BsExclamationOctagonFill /></span> Avertissement</Modal.Title>
                </Modal.Header>
           
                <Modal.Body className='modal-banned-body'> Votre compte est banni ! Vous ne pouvez pas vous connecter à votre compte.</Modal.Body>
                <Modal.Footer>
                    <button className='btn-Modal' onClick={handleClose}>
                        Fermer
                    </button>
                   
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Banned;