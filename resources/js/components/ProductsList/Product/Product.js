import React from 'react';
import Wrapper from '../../../hoc/Wrapper';

const product = ( props )=>{
    if(props.minimize){
        return (
            <div>
                {/* <image src={props.main_image} /> */}
                <br/>----------------------------------<br/>
                name : {props.en_name} <br/>
                price : {props.price}
                <br/>----------------------------------<br/>
            </div>
        );
    }

    let attributes = props.attributes.map(attr=>{
        return <Wrapper>{attr.name}:{attr.value}</Wrapper>
    });
    return (
        <div>

        </div>
    );
}

export default product;
