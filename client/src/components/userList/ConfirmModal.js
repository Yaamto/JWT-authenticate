import React, { useEffect, useRef, useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import './ConfirmModal.css'

const ConfirmModal = ({showModal, onConfirm, onClose, nameUser}) => {

    const [show, setShow] = useState(showModal);
    const [userToDelete, setUserToDelete]= useState(nameUser)
    
    const handleClose = () => onClose();

    

    const handleConfirm = () => onConfirm();
       
       
    

    useEffect(() => {
        setShow(showModal)
    }, [showModal])
    return (
        <div>
          
            <Modal show={showModal} onHide={handleClose} className="Modal">
                <Modal.Header >
                    <Modal.Title className='modal-title'>Confirmation</Modal.Title>
                </Modal.Header>
              
                <Modal.Body className='modal-body'>Voulez-vous supprimer l'utilisateur "{userToDelete}" ?</Modal.Body>
                <Modal.Footer>
                    <button className='btn-Modal' onClick={handleClose}>
                        Fermer
                    </button>
                    <button className='btn-Modal' onClick={handleConfirm}>
                        Confirmer
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ConfirmModal;