import React from 'react';
import { GridLayoutSearch } from '../GridLayoutSearch'

import './GridLayoutHeader.scss';
import { Row, Col, Button } from 'react-bootstrap';

interface IProps {
    newButtonText: string,
    newCallback: () => void,
    searchCallback: (searchText:string) => void,
}

export const GridLayoutHeader: React.FC<IProps> = (props) => {
    return (
        <Row>
            <Col className="col-sm">
                <GridLayoutSearch callback={props.searchCallback} />
            </Col>
            <Col className="col-sm align-right">
                <Button onClick={props.newCallback} className="float-right">{props.newButtonText}</Button>
            </Col>
        </Row>
    );
};