import React from 'react';
import { Table } from 'react-bootstrap';
import { GridModel } from '../../Models/GridModel';

import './Grid.scss';

interface IProps {
    data: GridModel
}

export const Grid: React.FC<IProps> = (props) => {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                {props.data.metadata.columns.map((row) =>
                    <th key={row.label}>{row.label}</th>
                )}
                </tr>
            </thead>
            <tbody>
                {props.data.rows.map((row) =>
                    <tr key={row.title}>
                        {props.data.metadata.columns.map((metadata) =>
                            <th key={metadata.label}> {row[metadata.name]}</th>
                        )}
                    </tr>
                )}
            </tbody>
        </Table>
    );
};