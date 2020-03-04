import React from 'react';

import { PageHeading } from '../../../Common/Components/PageHeading';
import { NoteForm } from '../NoteForm/NoteForm';

import './NewNotePage.scss';

export const NewNotePage: React.FC = () => {
    return (
        <div>
            <PageHeading title={"Notes / New"} />
            <NoteForm />
        </div>
    );
};