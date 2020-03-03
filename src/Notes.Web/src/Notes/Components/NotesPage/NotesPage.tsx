import React from 'react';
import { GridLayout } from '../GridLayout';
import { useHistory } from "react-router-dom";
import { GridModel } from '../../Models/GridModel';

import './NotesPage.scss';

export const NotesPage: React.FC = () => {

    const history = useHistory();

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
        "rows":[
            { "title":"Note1", "body":"This is a note" },
            { "title":"Note2", "body":"This is another note" }
        ]
    };

    const callback = () => {
        history.push("/notes/new");
    };

    return (
        <GridLayout newButtonText={"New Note"} data={data} callback={callback}/>
    );
};