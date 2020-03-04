import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './PageHeading.scss';

interface IProps {
    title: string;
}

export const PageHeading: React.FC<IProps> = (props) => {
    return (
        <Row className="pt-4">
            <Col className="col-sm">
                <h1>{props.title}</h1>
            </Col>
        </Row>
    );
};