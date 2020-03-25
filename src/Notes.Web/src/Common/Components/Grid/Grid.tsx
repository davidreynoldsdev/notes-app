import React from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
import { GridModel } from '../../Models/GridModel';

import './Grid.scss';

interface IProps {
    data: GridModel,
    editCallback(id:string): void,
    deleteCallback(id:string): void,
    selectCallback(id:string): void
}

export const Grid: React.FC<IProps> = (props) => {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                {props.data.metadata.columns.map((row) =>
                    <th key={row.label}>{row.label}</th>
                )}
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
                {props.data.rows.map((row) =>
                    <tr key={row.id}>
                        {props.data.metadata.columns.map((metadata) =>
                            <td 
                                key={metadata.label} 
                                onClick={ () => props.selectCallback(row.id) }>
                                    <span className="pointer"> {row[metadata.name]}</span>
                            </td>
                        )}
                        <td>
                            <ButtonGroup>
                                <Button 
                                    onClick={ () => props.editCallback(row.id) }>
                                    Edit
                                </Button>
                                <Button 
                                    onClick={ () => props.deleteCallback(row.id) }>
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};