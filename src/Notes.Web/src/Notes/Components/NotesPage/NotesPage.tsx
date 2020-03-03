import React from 'react';
import { useHistory } from "react-router-dom";

import { GridLayout } from '../../../Common/Components/GridLayout';
import { GridModel } from '../../../Common/Models/GridModel';

import './NotesPage.scss';

export const NotesPage: React.FC = () => {

    async function getNotes() {
        return await fetch("https://localhost:44375/notes")
            .then(res => res.json())
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

    const callback = () => {
        history.push("/notes/new");
    };

    return (
        <GridLayout 
            newButtonText={"New Note"} 
            dataCallback={getNotes} 
            callback={callback}
        />
    );
};