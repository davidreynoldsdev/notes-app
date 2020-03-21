import React from 'react';
import { useHistory } from "react-router-dom";
import { GridLayout } from '../../../Common/Components/GridLayout';
import { GridModel } from '../../../Common/Models/GridModel';
import { PageHeading } from '../../../Common/Components/PageHeading';
import { useAuth0 } from '../../../contexts/auth0-context';

import './NotesPage.scss';

export const NotesPage: React.FC = () => {

    const { getTokenSilently } = useAuth0();

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