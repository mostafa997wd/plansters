
import { Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navigtion/Navbar/Navbar';
import Auth from './Auth/Auth';
import Wrapper from '../hoc/Wrapper';
import {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Products from './Products/Products';
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
  );
  }
}

export default App;
