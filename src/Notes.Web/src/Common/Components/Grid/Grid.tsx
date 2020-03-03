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
                    <tr key={row.id}>
                        {props.data.metadata.columns.map((metadata) =>
                            <td key={metadata.label}> {row[metadata.name]}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </Table>
    );
};