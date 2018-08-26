import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
    let { product_name, product_price, product_url, handleDelete, id } = props;
    
    return ( 
        <div>
            <img src={product_url} alt={product_name} />
            <h1>{product_name}</h1>
            <p>{product_price}</p>
            <button onClick={() => handleDelete(id)}>Delete</button>
            <Link to={`/edit/${id}`}>Edit</Link>
        </div>
     );
}
 
export default Product;