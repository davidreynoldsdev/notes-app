import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './Public.scss';

interface IProps {
    title: string;
}

export const Public: React.FC<IProps> = (props) => {
    return (
        <Row className="pt-4">
            <Col className="col-sm">
                <h1>Welcome to the Notes App</h1>
                <p>
                    This app lets you take markdown notes.
                </p>
            </Col>
        </Row>
    );
};