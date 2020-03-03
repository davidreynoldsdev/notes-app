import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { GridLayoutHeader } from '../../../Notes/Components/GridLayoutHeader'
import { Grid } from '../../../Notes/Components/Grid'

import './GridLayout.scss';

interface IProps {
    newButtonText: string,
    callback: () => void,
    data: any,
}

export const GridLayout: React.FC<IProps> = (props) => {
    return (
        <Row className="pt-4">
            <Col className="col-sm">
                <GridLayoutHeader newButtonText={props.newButtonText} callback={props.callback} />
                <Grid data={props.data} />
            </Col>
        </Row>
    );
};