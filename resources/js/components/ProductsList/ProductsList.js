import React from 'react';
import Product from './Product/Product';
import Spinner from '../UI/Spinner/Spinner';
import Wrapper from '../../hoc/Wrapper';
import styles from './ProductsList.module.css';

export default ( props )=>{

    console.log('data',props.products.data);
    let content = null;
    if(props.products.length === 0){
        content = <Spinner />;
    }
    else{
    let products = props.products.data.map(prod=>{
        return <Product key={prod.id} en_name = {prod.en_name} price = {prod.price} main_image={prod.mainimage} attributes={prod.attributes} minimize/>
    });
    let paginate = Array();
    for(let i=1 ; i<= props.products.last_page;i++){
    paginate.push(<button key={'page'+i} onClick={event=>{props.clicked(i)}}>{i}</button>);
    }
    content = <div className={styles.ProductsList}>
        {products}
        {paginate}
    </div>
    }

    return (
        <Wrapper>
            {content}
        </Wrapper>
    );
}
