import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { GridLayoutHeader } from '../GridLayoutHeader'
import { Grid } from '../Grid'
import { GridModel } from '../../Models/GridModel';

import './GridLayout.scss';

interface IProps {
    newButtonText: string,
    newCallback: () => void,
    editCallback: (id:string) => void,
    deleteCallback: (id:string) => void,
    selectCallback: (id:string) => void,
    dataCallback: (searchText:string) => Promise<GridModel>
}

export const GridLayout: React.FC<IProps> = (props) => {

    const searchCallback = (searchText:string) =>{
        props.dataCallback(searchText).then(response => {
            setData(response)});
    };

    const defaultData:GridModel =
    {
        "metadata": {
            "columns": []
        },
        "rows":[]
    };

    const [data, setData] = useState(defaultData);

    useEffect(() => {
        props.dataCallback("").then(response => {
            setData(response)});
    },[props]);

    return (
        <Row className="pt-4">
            <Col className="col-sm">
                <GridLayoutHeader 
                    newButtonText={props.newButtonText} 
                    newCallback={props.newCallback} 
                    searchCallback={searchCallback}
                />
                <Grid 
                    data={data} 
                    editCallback={props.editCallback} 
                    deleteCallback={props.deleteCallback}
                    selectCallback={props.selectCallback}
                />
            </Col>
        </Row>
    );
};