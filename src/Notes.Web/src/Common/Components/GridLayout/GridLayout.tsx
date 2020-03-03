import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { GridLayoutHeader } from '../GridLayoutHeader'
import { Grid } from '../Grid'
import { GridModel } from '../../Models/GridModel';

import './GridLayout.scss';

interface IProps {
    newButtonText: string,
    callback: () => void,
    dataCallback: (searchText:string) => Promise<GridModel>
}

export const GridLayout: React.FC<IProps> = (props) => {

    const aa = (searchText:string) =>{
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
                    callback={props.callback} 
                    searchCallback={aa}
                />
                <Grid data={data} />
            </Col>
        </Row>
    );
};