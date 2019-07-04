import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index';

class ProductActionPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      id : '',
      txtName : '',
      txtPrice : '',
      ckbStatus : ''
    };
  }

  componentDidMount(){
    var  {match} = this.props;
    if(match){
      var id = match.params.id;
      this.props.onEditProduct(id);
    }
  }

  //Đổ dữ liệu lên forrm
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditting){ //nếu tồn tại
      var {itemEditting} = nextProps;
      this.setState({
        id : itemEditting.id,
        txtName : itemEditting.name,
        txtPrice : itemEditting.price,
        ckbStatus : itemEditting.status
      });
    }
  }

  onChange= (e) =>{
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name] : value
    });
  }
  onSave = (e)=>{
    e.preventDefault();
    var {history} = this.props; //nhận history từ state
    var {id, txtName,txtPrice,ckbStatus} = this.state; //tạo biến lấy giá trị từ state
    var product = {
      id :id,
      name : txtName,
      price : txtPrice,
      status : ckbStatus 
    };
    
    //lấy ìd từ state xuống, nếu id tồn tại > update
    if(id){ //kiểm tra nếu id tồn tại
      // http://localhost:3000/products/:id => HTTP Method : PUT
      this.props.onUpdateProduct(product);
    }else{ //thêm mới
      this.props.onAddProduct(product);
    }
    history.goBack() //chuyển lại trang trước đó
  }
  render(){
    var {txtName,txtPrice,ckbStatus} =this.state;
    return (
            <div className ="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <form onSubmit = {this.onSave}>

                <div className="form-group">
                  <label >Tên sản phẩm</label>
                  <input  type="text" 
                          className="form-control" 
                          name="txtName" 
                          value = {txtName}
                          onChange= {this.onChange}
                          />
                </div>
                <div className="form-group">
                  <label>Giá </label>
                  <input  type="number" 
                          className="form-control" 
                          name="txtPrice" 
                          value = {txtPrice}
                          onChange= {this.onChange}
                          />
                </div>
                <div className="checkbox" >
                  <label>
                    <input  type="checkbox" 
                            name="ckbStatus" 
                            value = {ckbStatus}
                            onChange= {this.onChange}
                            checked ={ckbStatus}
                            />
                    Còn hàng
                  </label>
                </div>
                <button type="submit" className="btn btn-success mr-10 ">Lưu lại</button>
                <Link to="/product-list" className="btn btn-primary " >
                  Trở lại
                </Link>
              </form>
            </div> 
    );
  }
} 


const mapStateToProps = state =>{
  return{
    itemEditting : state.itemEditting
  }
}

const mapDispatchToProps = (dispatch,props) =>{
  return{
    onAddProduct : (products) =>{
      dispatch(actAddProductRequest(products));
    },
    onEditProduct : (id) =>{
      dispatch(actGetProductRequest(id));
    },
    onUpdateProduct : (product) =>{
      dispatch(actUpdateProductRequest(product));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (ProductActionPage);
