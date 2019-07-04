import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductActionPage from './pages/ProductActionPage/ProductActionPage';
import Login from './components/Logins';
import Logout from './components/Logout';

import AuthenticatedComponent from './components/AuthService';

const routes = [
    {
        path : '/',
        exact : true,
        main : () => <HomePage />
    },
    {
        path : '/product-list',      
        exact : false,
        main : () => <ProductListPage />
    },
    {
        path : '/product/add',      
        exact : false,
        main : ({history}) => <ProductActionPage history={history} />
    },
    {
        path : '/product/:id/edit',      
        exact : false,
        main : ({match,history}) => <ProductActionPage match = {match} history={history} />
    },
    {
        path : '/Login',      
        exact : false,
        main : ({history}) => <Login  history={history}/>
    },
    {
        path : '/logout',      
        exact : false,
        main : ({history}) => <Logout  history={history}/>
    },
    {
        path : '/Auth',      
        exact : false,
        main : () => <AuthenticatedComponent />
    },
    
    {
        path : '',
        exact : false,
        main : () => <NotFoundPage />
    }
];
export default routes;