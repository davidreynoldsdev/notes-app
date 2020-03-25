import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { PageHeading } from '../../../Common/Components/PageHeading';
import { useAuth0 } from '../../../contexts/auth0-context';
import { Note } from '../../Models/Note';
import CodeBlock from "../../../Common/CodeBlock";
import { useHistory } from "react-router-dom";
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

import './ViewNotePage.scss';

export const ViewNotePage: React.FC = () => {

    const Markdown = require('react-markdown')
    const history = useHistory();

    const { getTokenSilently } = useAuth0();
    let { id } = useParams();

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
            <PageHeading title={"Notes / View"}/>
            <Row>
                <Col>
                    <Markdown
                        className="pl-2 pr-2 markdown"
                        source={data.body}
                        escapeHtml
                        renderers={{ code: CodeBlock }}
                    />
                    <ButtonGroup className="pt-4">
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </div>
    );
};