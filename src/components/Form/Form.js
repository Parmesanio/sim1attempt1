import React, { Component } from 'react';
import axios from 'axios';
import './form.css';

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
            .then(() => this.props.history.push('/'))
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
            .then(() => this.props.history.push('/'))
            .catch(err => console.log('Err in handleUpdate', err));
    }
    handleKey() {
        return false;
    }
    render() {
        let { id } = this.props.match.params;
        
        let { productUrl, productName, productPrice } = this.state;
        return ( 
            <div className="formcomponent">
                <form onSubmit={this.onSubmit}>
                    <img src={productUrl ? productUrl : 'https://raw.githubusercontent.com/DevMountain/simulation-1/master/assets/style_guide.png'} alt={productName} />
                    <label>Image URL</label>
                    <input type="text" onChange={(event) => this.handleImage(event)} value={productUrl} onKeyPress={this.handleKey} onKeyUp={this.handleKey} onKeyDown={this.handleKey} />
                    <label>Product Name</label>
                    <input type="text" onChange={(event) => this.handleName(event)} value={productName} />
                    <label>Price</label>
                    <input type="text" onChange={(event) => this.handlePrice(event)} value={productPrice} />
                    <button className="clear" onClick={this.handleClear}>Cancel</button>
                    {this.props.match.params.id ? <button className="addsave" onClick={() => this.handleUpdateProduct(id, productUrl, productName, productPrice)}>Save Changes</button> :
                    <button className="addsave" onClick={() => this.handleAddProduct(productName, productUrl, productPrice)}>Add to Inventory</button>}
                </form>
            </div>
         );
    }
}
 
export default Form;