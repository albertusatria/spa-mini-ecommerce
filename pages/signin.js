import React, { useState } from 'react';
import { withRedux } from '../lib/redux';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import Layout from "../components/layout";

import { withApollo } from "../lib/apollo";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FormControl, TextField, Input, Button } from '@material-ui/core';

const LOGIN = gql`    
    mutation generateCustomerToken($email: String!, $password: String!) {
        generateCustomerToken(email:$email, password:$password){
            token
        }
    }
`;

const signin = () => {
    let responseToken;
    const [loginform, setLoginform] = useState();
    const dispatch = useDispatch();
    const pageConfig = {
        title: "Login Page",
    };        

    const [loginData, { loading, data }] = useMutation(LOGIN);
    
    const handleFormLogin = (e) => {
        e.preventDefault();

        loginData({ variables: { email: e.target.email.value, password: e.target.password.value } });        
    }

    if(data) {
        responseToken = data.generateCustomerToken.token;
        console.log(responseToken);
        dispatch({
            type:'LOGIN',
            responseToken
        });
    }
    
    return (
        [
            <div className="content-wrapper">
                <Layout pageConfig={pageConfig} />
                <div className="login-page">
                    <h1>Login</h1>
                    <div className="form-wrapper">
                        <form noValidate autoComplete="off"  onSubmit={handleFormLogin}>
                            <FormControl>
                                <TextField id="email" label="Email" type="email" value="samuel@icube.us" />
                            </FormControl>
                            <FormControl>                            
                                <TextField id="password" label="password" type="password" />
                            </FormControl>
                            <Button variant="contained" color="primary" type="submit">
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        ]
    )
}

export default compose(withApollo, withRedux)(signin)