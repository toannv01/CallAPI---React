import React, {Component} from 'react';
import ProductList from './../../components/ProductList/ProductList';
import ProdcutItem from './../../components/ProductItem/ProductItem';
import {connect} from 'react-redux';
// import callApi from './../../utils/apiCaller';
import {Link,Redirect} from 'react-router-dom';
import {actFetchProductsRequest, actDeleteProductRequest} from './../../actions/index';
import Axios from 'axios';

class ProductListPage extends Component{
  constructor(props){
    super(props)
    const token = localStorage.getItem("token")
    let loggedIn =true
    if(token == null){
      loggedIn = false
    }
    this.state = {
      token : localStorage.getItem("token"),
      loggedIn
    }
  }

  // componentDidMount(){ //sẽ dc gọi sau khi component render lần đầu tiên
  //     // GET request for remote image
  //     //thực hiện việc gọi lên server gọi dl về
  //     this.props.fetchAllProducts();
  //     const token = localStorage.getItem("token");
  //     Axios.post('rest-api-authentication-example/api/validate_token',{"jwt":token}, {
  //     headers: {
  //     'Accept': 'application/json, text/plain, */*',
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //         }} )
  
  //     .then(response =>
  //     {
  //     // console.log(response.data);
  //     console.log(response);
  //     return response;
  //     })
  //     .catch(error => {
  //     if (error) {
  //         console.log("Sorry.....Error");  }
  //         });
  
  // }
  componentDidMount(){
    const token = localStorage.getItem("token");
    Axios.post('rest-api-authentication-example/api/validate_token',{"jwt":token}, {
    headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
        }} )
    .then(response =>
    {
      this.setState({
        token: response.data.JwtSV,
    })
     console.log(this.state.token);
      // console.log(response.data.message);
      // console.log(response.data.JwtSV);
      // console.log(response);
    return response;    
    })
    .catch(error => {
    if (error) {
        console.log("Sorry.....Error");  }
        });
        // console.log(token);
        // console.log(this.state.token);
        console.log(this.state.token);
  }
  componentDidUpdate(){
      console.log(this.state.token);
      if(localStorage.getItem("token") !== this.state.token){
        localStorage.removeItem("token")
        this.setState({
          loggedIn: false
         });
        }

  }
  onDelete = (id) =>{ 
    this.props.onDeleteProducts(id);
  }
  findIndex = (products,id) =>{
    var result = -1;
    products.forEach((product,index)=>{
      if(product.id === id){
        result = index;
      }
    });
    return result ;
  }
  render(){
    // var products =[];
    if(this.state.loggedIn === false){
     console.log(this.state);
      return <Redirect to = "/login" />
    }
    var {products} = this.props;
    return (
            <div className ="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Link to="/product/add" className ="btn btn-info mb-10">
                Thêm sản phẩm
              </Link>
              <ProductList>
                  {this.showProducts(products)}
              </ProductList>
            </div> 
    );
  }
  showProducts(products){
    var result = null;
    if(products.length > 0){
      result = products.map((product,index) => {
        return (
          <ProdcutItem 
            key ={index}
            product = {product}
            index = {index +1 }
            onDelete = {this.onDelete} // truyền props vào product Item và nó thực thi hàm onDelte nayf
          />
        );
      });
    } 
    return result;
  }
} 

const mapStateToProps = state => { //lấy tất cả props từ store
  return {
    products :state.products
  }
}
const mapDispatchToProps = (dispatch,props) =>{ //lưu lên store
  return {
    fetchAllProducts : () =>{
      dispatch(actFetchProductsRequest());
    },
    onDeleteProducts : (id) =>{
      dispatch(actDeleteProductRequest(id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (ProductListPage);
