
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navigtion/Navbar/Navbar';
import Auth from '../containers/Auth/Auth';
import Wrapper from '../hoc/Wrapper';
import {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Products from '../containers/Products/Products';
import ReactDOM from 'react-dom'
import React from 'react';

class App extends Component {
  render(){
    let content = null;
    console.log(window.sessionStorage.getItem('token'))
    if(window.sessionStorage.getItem('token') === null){
      content = <Redirect to="/login" />
    }
    else{
    content = <Redirect to="/" />
    }

    return (
        <BrowserRouter>
    <Wrapper >
    <Navbar />
     <Switch>
        { (window.sessionStorage.getItem('token') === null) &&
          <Route exact path="/login" component={Auth} />
        }
            <Route exact path="/"  component={Products} />
    </Switch>
    {content}
    </Wrapper>
    </BrowserRouter>
  );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
