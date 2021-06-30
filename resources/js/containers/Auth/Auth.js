import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';
import styles from './Auth.module.css';
import Wrapper from '../../hoc/Wrapper';

class Auth extends Component{
    state={
        loginForm:{
            userName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'user name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength : 25
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength : 15
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false,
    };

    loginHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
      
        const formData = {userName :this.state.loginForm.userName.value,password :this.state.loginForm.password.value};

        // for (let formElementIdentifier in this.state.loginForm) {
        //     formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
        // }
        axios.post('http://127.0.0.1/api/login', formData )
            .then( response => {
                // console.log(response.data.token);
                window.sessionStorage.setItem('token',response.data.token);
                window.sessionStorage.setItem('userName',formData.userName);
                this.setState({loading:false});
                this.props.history.push( '/' );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = { 
            ...updatedLoginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({loginForm: updatedLoginForm, formIsValid: formIsValid});
    }


    render(){
        let content = null;

        // if(window.sessionStorage.getItem('token') === null){
        const formElementsArray = [];
       
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }
                let form = (
                    <form onSubmit={this.loginHandler}>
                        {formElementsArray.map(formElement => (
                           
                            <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                        ))}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>login</Button>
                    </form>
                );
                content= <div className={styles.Auth}>
                          <h4>please login</h4>
                         {form}
                        </div>
            // }

            if ( this.state.loading ) {
                content = <Spinner />;
            }

                return (
                    <Wrapper>
                   {content}
                   </Wrapper>
                );
    }
}

export default Auth;