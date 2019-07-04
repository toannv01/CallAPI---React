import React, {Component} from 'react';
import { Route,Link} from 'react-router-dom';


const menus = [
    {
        name : 'Trang Chủ',
        to : '/',
        exact : true
    },
    {
        name : 'Quản lý Sản phẩm',
        to : '/product-list',
        exact : false
    },
    {
        name : 'Đăng nhập',
        to : '/login',
        exact : false
    }
];

const MenuLink = ({label,to,activeOnlyWhenExact}) =>{
    return (
        <Route 
            path={to}
            exact = {activeOnlyWhenExact}
            children = {({match})=>{ //đối tượng match
                var active = match ? 'active' : ''; //tạo ra biến xác định để add thêm class 'active'
                return (
                    <li className={active}>
                        <Link to={to}> 
                            {label}
                        </Link>
                    </li>
                )
            }}
        />
    );
};


class Menu extends Component{
  render(){
    return (
        <div className ="navbar navbar-default  ">
            <a className ="navbar-brand" href="/">Call API</a>
            <ul className ="nav navbar-nav">
                {this.showMenus(menus)} 
            </ul>
        </div>
    );
  }

  showMenus = (menus) =>{
      var result = null;
      if(menus.length > 0){
          result = menus.map((menu,index) => {
              return(
                  <MenuLink 
                      key = {index}
                      label = {menu.name}
                      to = {menu.to}
                      activeOnlyWhenExact = {menu.exact}
                  />
              );
          });
      }
      return result;
  }
} 

export default Menu;
