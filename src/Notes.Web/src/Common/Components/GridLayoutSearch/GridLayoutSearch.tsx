import React from 'react';

import './GridLayoutSearch.scss';
import { useFormFields } from "../../Libs/HooksLib";
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

interface IProps {
    callback: (searchText:string) => void,
}

export const GridLayoutSearch: React.FC<IProps> = (props) => {

    const [fields, handleFieldChange] = useFormFields({
        searchText: ""
      });

    const aa = () => {
        props.callback(fields.searchText);
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
                        onChange={handleFieldChange}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={aa}>Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
         </div>
    );
};