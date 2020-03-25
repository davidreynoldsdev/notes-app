import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { GridLayout } from '../../../Common/Components/GridLayout';
import { GridModel } from '../../../Common/Models/GridModel';
import { PageHeading } from '../../../Common/Components/PageHeading';
import { useAuth0 } from '../../../contexts/auth0-context';

import './NotesPage.scss';
import { Modal, Button } from 'react-bootstrap';

export const NotesPage: React.FC = () => {

    const { getTokenSilently } = useAuth0();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToBeDeleted, setIdToBeDeleted] = useState('');
    
    async function getNotes(searchtext:string) {

        const token = await getTokenSilently();

        return await fetch(process.env.REACT_APP_API_URI + "notes?searchText=" + searchtext, {
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
                "authorization": `Bearer ${token}`
              })
        })
        .then((res) => { 
            if(res.ok) {
                return res.json();
            }
            return [];
        })
        .then((result) => {
            const data:GridModel =
            {
                "metadata": {
                    "columns": [
                        {
                            "label":"Title",
                            "name": "title",
                        },
                        {
                            "label":"Body",
                            "name": "body",
                        }
                    ]
                },
                "rows":result
            };
            return data;
        });
    }

    const history = useHistory();

    const editCallback = (id:string) => {
        history.push("/notes/edit/" + id);
    };

    const deleteCallback = (id:string) =>{
        setIdToBeDeleted(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () =>{
        const token = await getTokenSilently();

        fetch(process.env.REACT_APP_API_URI + 'notes/' + idToBeDeleted, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            }}).then(function() {
                setIdToBeDeleted('');
                setShowDeleteModal(false);
        });
    };

    return (
        <>
            <PageHeading title={"Notes"} />
            <GridLayout 
                newButtonText={"New Note"} 
                dataCallback={getNotes} 
                newCallback={() => history.push("/notes/new")}
                editCallback={ editCallback }
                deleteCallback={ deleteCallback }
            />
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};