import React ,{Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';
import styles from './Products.module.css';
import Wrapper from '../../hoc/Wrapper';
import Input from '../../components/UI/Input/Input';
import FormData from 'form-data';
import ProductsList from '../../components/ProductsList/ProductsList';

class Products extends Component{
    state={
        addProductForm:{
            englishName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'english Name'
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
            arabicName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'arabic Name'
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
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'digit',
                    placeholder: 'price'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric:true,
                    greaterThan:0
                },
                valid: false,
                touched: false
            },
            active: {
                elementType: 'checkbox',
                elementConfig: {
                   caption:'active'
                },
                value: false,
                validation: {

                },
                valid: true,
                touched: false
            },
            mainImage: {
                elementType: 'file',
                label:'main image',
                elementConfig: {
                    type:"file",
                },
                value: [],
                validation: {

                },
                valid: true,
                touched: false
            },
            galleryImages: {
                elementType: 'file',
                label: 'gallery images',
                elementConfig: {
                    type:"file",
                    multiple:true
                },
                value: [],
                validation: {

                },
                valid: true,
                touched: false
            },
        },

        addProductDynamicAttributes:[],
        products:[],
        formIsValid: false,
        loading: false,
    };

    componentDidMount(){
        this.loadproductsFromPage(1);
    }

    loadproductsFromPage = (page)=>{
        this.setState( { loading: true } );
        axios.get(`http://127.0.0.1/api/guest/all-products?page=${page}`).then(response=>{
            // console.log('datat',response.data);
            this.setState( {products:response.data, loading: false } );
        }).catch(error=>{
            console.log(error);
            this.setState({loading:false});
        })
    }

    addProductHandler = ( event ) => {
        event.preventDefault();
        console.log('handler');
        this.setState( { loading: true } );
        let active = (this.state.addProductForm.active.value == true) ? 1:0;
        const formData = new FormData();
            console.log(active);
            formData.append('en_name',this.state.addProductForm.englishName.value);
            formData.append('ar_name' ,this.state.addProductForm.arabicName.value);
            formData.append('price', this.state.addProductForm.price.value);
            formData.append('mainimage',this.state.addProductForm.mainImage.value[0]);
            for(let k in this.state.addProductForm.galleryImages.value){
                // console.log(this.state.addProductForm.galleryImages.value[k]);
                formData.append('images[]', this.state.addProductForm.galleryImages.value[k]);
            };
            // formData.append('images',this.state.addProductForm.galleryImages.value);
            formData.append('active',active);
            formData.append('attributes',this.state.addProductDynamicAttributes);
        console.log(formData);

        // for (let formElementIdentifier in this.state.addProductForm) {
        //     formData[formElementIdentifier] = this.state.addProductForm[formElementIdentifier].value;
        // }
        axios.post('http://127.0.0.1/api/admin/add-product',formData,{
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${window.sessionStorage.getItem('token')}`
              }
        }).then( response => {
                // console.log(response.data);
                let updatedproducts = {...this.state.products};
                let updatedProductsData = [...this.state.products.data];
                updatedProductsData.unshift({id:response.data.product_id,mainimage:response.data.main_image_path,en_name:this.state.addProductForm.englishName.value,ar_name:this.state.addProductForm.arabicName.value,price:this.state.addProductForm.price.value,active:this.state.addProductForm.active.value});
                updatedproducts.data = updatedProductsData;
                console.log(updatedproducts);
                this.setState({products:updatedproducts,loading:false});
                // this.props.history.push( '/' );
            } )
            .catch( error => {
                console.log(error)
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                  }
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
            const pattern = /^([0-9]*[.])?[0-9]+/;
            isValid = pattern.test(value) && isValid
        }
        if(rules.greaterThan){
            isValid = (value > rules.greaterThan) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier,elementType) => {
        console.log(this.state.addProductForm.galleryImages.value);
        if(inputIdentifier.substr(0,3) === 'dyn'){
            let nameorvalu = inputIdentifier.substring(4,8);
            let  index = parseInt(inputIdentifier.substring(8));
            const updatedAddProductDynmicAttributes = [...this.state.addProductDynamicAttributes];
            if(nameorvalu ==='name'){
                updatedAddProductDynmicAttributes[index].name = event.target.value;
            }
            else{
                updatedAddProductDynmicAttributes[index].value = event.target.value;
            }
            this.setState({addProductDynamicAttributes:updatedAddProductDynmicAttributes});
        }
        else{
        const updatedaddProductForm = {
            ...this.state.addProductForm
        };
        const updatedFormElement = {
            ...updatedaddProductForm[inputIdentifier]
        };
        if(elementType === 'file'){
            updatedFormElement.value = event.target.files;
        }
        else if (elementType === 'checkbox'){
            updatedFormElement.value = event.target.checked;
        }
       else{
           updatedFormElement.value = event.target.value;
       }
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedaddProductForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedaddProductForm) {
            formIsValid = updatedaddProductForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({addProductForm: updatedaddProductForm, formIsValid: formIsValid});
    }
    }


    addAttributeHandler = (event)=>{
        // console.log('hanlde')
        event.preventDefault();
        let updatedAddProductDynmicAttributes = [...this.state.addProductDynamicAttributes];
        updatedAddProductDynmicAttributes.push({name:'',value:''})
        this.setState({addProductDynamicAttributes:updatedAddProductDynmicAttributes});
    }

    render(){
        let content = null;


        const formElementsArray = [];

        for (let key in this.state.addProductForm) {
            formElementsArray.push({
                id: key,
                config: this.state.addProductForm[key]
            });
        }
        for (let key in this.state.addProductDynamicAttributes) {
            formElementsArray.push({
                id: 'dyn_name'+key,
                config: {type: 'text'},
                value:this.state.addProductDynamicAttributes[key].name
            });
            formElementsArray.push({
                id: 'dyn_valu'+key,
                config: {type: 'text'},
                value:this.state.addProductDynamicAttributes[key].value
            });
        }
                let form = (
                    <form onSubmit={this.addProductHandler}>
                        {formElementsArray.map(formElement => (

                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id,formElement.config.elementType)} />
                        ))}

                        <Button btnType="Success" clicked={this.addAttributeHandler}>+</Button>
                        <Button btnType="Success" disabled={!this.state.formIsValid}>add</Button>
                    </form>
                );
                content= <div className={styles.Products}>
                          <h4>add product</h4>
                         {form}
                        </div>

            if ( this.state.loading ) {
                content = <Spinner />;
            }

            // console.log(this.state.products);
                return (
                    <div>
                   {content}
                   <ProductsList products={this.state.products} clicked={this.loadproductsFromPage}/>
                   </div>
                );
    }
    }

export default Products;
