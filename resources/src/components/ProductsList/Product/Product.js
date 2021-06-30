import React from 'react';
import Wrapper from '../../../hoc/Wrapper';

const product = ( props )=>{
    if(props.minimize){
        return (
            <div>
                <image src={props.image} />
                name : {props.name}
                price : {props.price}
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