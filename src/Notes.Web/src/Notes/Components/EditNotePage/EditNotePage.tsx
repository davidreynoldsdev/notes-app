import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { PageHeading } from '../../../Common/Components/PageHeading';
import { NoteForm } from '../NoteForm/NoteForm';
import { useAuth0 } from '../../../contexts/auth0-context';
import { Note } from '../../Models/Note';

import './EditNotePage.scss';

export const EditNotePage: React.FC = () => {

    const { getTokenSilently } = useAuth0();
    const history = useHistory();

    let { id } = useParams();

    const handleSave = async (values:any) => {
        console.log(process.env.REACT_APP_API_URI + 'notes/' + id);
        const token = await getTokenSilently();
        fetch(process.env.REACT_APP_API_URI + 'notes/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values, null, 2)
            }).then(function() {
                history.push("/");
            });
    };

    const defaultData:Note =
    {
        title:"",
        body:""
    };

    
    const [data, setData] = useState(defaultData);
    
    useEffect(() =>  {

        async function LoadData(id:string) {

            const token = await getTokenSilently();

            await fetch(process.env.REACT_APP_API_URI + "notes/" + id, {
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
                setData(result);
            });
        };

        LoadData(id as string);

    },[id, getTokenSilently]);

    const handleCancel = () => {
        history.push("/");    
    };

    return (
        <div>
            <PageHeading title={"Notes / Edit"} />
            <NoteForm
                data={data}
                handleSave={handleSave} 
                handleCancel={handleCancel}
            />
        </div>
    );
};