import React from 'react';
import { useHistory } from "react-router-dom";
import { GridLayout } from '../../../Common/Components/GridLayout';
import { GridModel } from '../../../Common/Models/GridModel';
import { PageHeading } from '../../../Common/Components/PageHeading';

import './NotesPage.scss';

export const NotesPage: React.FC = () => {

    async function getNotes(searchtext:string) {
        return await fetch(process.env.REACT_APP_API_URI + "notes?searchText=" + searchtext)
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
        <>
            <PageHeading title={"Notes"} />
            <GridLayout 
                newButtonText={"New Note"} 
                dataCallback={getNotes} 
                callback={callback}
            />
        </>
    );
};