import React from 'react';
import { Form, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import { useFormFields } from '../../../Common/Libs/HooksLib';
import { useHistory } from "react-router-dom";

import './NoteForm.scss';

export const NoteForm: React.FC = () => {

    const Markdown = require('react-markdown')

    const history = useHistory();

    const [fields, handleFieldChange] = useFormFields({
        title: "",
        body: ""
    });

    const handleSubmit = (e:any) => {
        fetch('https://localhost:44375/notes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields)
          }).then(function() {
              history.push("/");
          });
    
        e.preventDefault();
    }

    const handleCancel = (e:any) => {
        history.push("/");
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={handleFieldChange} />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId="body">
                            <Form.Label>Body</Form.Label>
                            <Form.Control as="textarea" rows="20" onChange={handleFieldChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Preview</Form.Label>
                            <Markdown
                                className="pl-2 pr-2 markdown"
                                source={fields.body}
                                escapeHtml
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <ButtonGroup>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </ButtonGroup>
            </Form>
        </div>
    );
};