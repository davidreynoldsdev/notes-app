import React from 'react';

import './GridLayoutSearch.scss';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

export const GridLayoutSearch: React.FC = () => {
    return (
         <div>
            <Form>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder=""
                    aria-label=""
                    aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                    <Button variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
         </div>
    );
};