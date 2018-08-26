import React, { Component } from 'react';
import Product from '../Product/Product';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: []
          }
          this.handleGetAll = this.handleGetAll.bind(this);
          this.handleDelete = this.handleDelete.bind(this);
    }
componentDidMount() {
    this.handleGetAll();
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
handleDelete(id) {
    axios.delete(`/api/product/${id}`)
        .then(() => this.handleGetAll())
        .catch(err => console.log('Err in handleDelete', err));
}

    render() { 
        let { productList } = this.state;

        let mapped = productList.map((product, i) => {
            return <Product key={i} {...product} handleDelete={this.handleDelete} />
        });
        return ( 
            <div>
                Dashboard
                {mapped}

            </div>
         );
    }
}
 
export default Dashboard;