import React, { useState } from 'react';

import './GridLayoutSearch.scss';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

interface IProps {
    callback: (searchText:string) => void,
}

export const GridLayoutSearch: React.FC<IProps> = (props) => {

    const [fields, setFields] = useState({searchText:""});

    const handleCallback = () => {
        props.callback(fields.searchText);
    };

    const handleChange = (event:any) => {
        setFields({
            ...fields,
            [event.target.id]: event.target.value
          });
    };

    return (
         <div>
            <Form>
                <InputGroup className="mb-3">
                    <FormControl
                        id="searchText"
                        name="searchText"
                        placeholder=""
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onChange={handleChange}
                    />
                    <InputGroup.Append>
                        <Button 
                        variant="outline-secondary" 
                        onClick={handleCallback}
                    >
                        Search
                    </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
         </div>
    );
};