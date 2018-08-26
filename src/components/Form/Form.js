import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            productUrl: '',
            productName: '',
            productPrice: ''
         }
         this.handleImage = this.handleImage.bind(this);
         this.handleName = this.handleName.bind(this);
         this.handlePrice = this.handlePrice.bind(this);
         this.handleClear = this.handleClear.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.handleGetAll = this.handleGetAll.bind(this);
         this.handleAddProduct = this.handleAddProduct.bind(this);
         this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
    }

    handleName(event) {
        this.setState({
            productName: event.target.value
        })
    }
    handlePrice(event) {
        this.setState({
            productPrice: event.target.value
        })
    }
    handleImage(event) {
        this.setState({
            productUrl: event.target.value
        })
    }
    handleClear() {
        this.setState({
            productUrl: '',
            productName: '',
            productPrice: ''
        })
    }
    onSubmit(event) {
        event.preventDefault();
    }
    handleAddProduct(productName, productUrl, productPrice) {
        axios.post('/api/product', { productName, productUrl, productPrice })
            .then(() => this.handleGetAll())
            .catch(err => console.log('Err in post', err));
    }
    handleGetAll() {
        axios.get('/api/inventory')
            .then(res => {
                this.setState({
                    productList: res.data
                })
            })
            .catch(err => console.log('Err in handleGetAll', err));
    }
    handleUpdateProduct(id, productUrl, productName, productPrice) {
        axios.put(`/api/product/${id}`, { productName, productUrl, productPrice })
            .then(() => this.handleGetAll())
            .catch(err => console.log('Err in handleUpdate', err));
    }
    render() {
        let { id } = this.props.match.params;
        console.log(this.props.match.params);
        
        let { productUrl, productName, productPrice } = this.state;
        return ( 
            <div>
                <img src={productUrl} alt={productName} />
                <form onSubmit={this.onSubmit}>
                    <label>Product Image</label>
                    <input type="text" onChange={(event) => this.handleImage(event)} value={productUrl} />
                    <label>Product Name</label>
                    <input type="text" onChange={(event) => this.handleName(event)} value={productName} />
                    <label>Product Price</label>
                    <input type="text" onChange={(event) => this.handlePrice(event)} value={productPrice} />
                    <button onClick={() => this.handleClear}>Cancel</button>
                    {this.props.match.params.id ? <button onClick={() => this.handleUpdateProduct(id, productUrl, productName, productPrice)}>Save Changes</button> :
                    <button onClick={() => this.handleAddProduct(productName, productUrl, productPrice)}>Add to Inventory</button>}
                </form>
            </div>
         );
    }
}
 
export default Form;