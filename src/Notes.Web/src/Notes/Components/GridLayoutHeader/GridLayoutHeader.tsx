import React from 'react';
import { GridLayoutSearch } from '../../../Notes/Components/GridLayoutSearch'

import './GridLayoutHeader.scss';
import { Row, Col, Button } from 'react-bootstrap';

interface IProps {
    newButtonText: string,
    callback: () => void,
}

export const GridLayoutHeader: React.FC<IProps> = (props) => {
    return (
        <Row>
            <Col className="col-sm">
                <GridLayoutSearch />
            </Col>
            <Col className="col-sm align-right">
            <Button onClick={props.callback} className="float-right">New</Button>
            </Col>
        </Row>
    );
};