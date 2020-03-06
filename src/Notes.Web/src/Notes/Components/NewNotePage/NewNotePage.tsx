import React from 'react';
import { useHistory } from "react-router-dom";
import { PageHeading } from '../../../Common/Components/PageHeading';
import { NoteForm } from '../NoteForm/NoteForm';

import './NewNotePage.scss';

export const NewNotePage: React.FC = () => {

    const history = useHistory();

    const handleSave = (values:any) => {
        fetch(process.env.REACT_APP_API_URI + 'notes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values, null, 2)
            }).then(function() {
                history.push("/");
            });
    };

    const handleCancel = () => {
        history.push("/");    
    };

    return (
        <div>
            <PageHeading title={"Notes / New"} />
            <NoteForm 
                handleSave={handleSave} 
                handleCancel={handleCancel}
            />
        </div>
    );
};