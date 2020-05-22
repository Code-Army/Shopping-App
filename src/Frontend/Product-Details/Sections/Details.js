import React, {Component} from "react";
import axios from "axios";
import UserContext from "../../../contex/UserContext";
import jwt_decode from "jwt-decode";
import Toast from 'react-bootstrap/Toast'
export default class Details extends Component{

    constructor(props) {
        super(props);


        // const productId = props.match.params.productId
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        const isLogin = localStorage.getItem("isLogin")
        if (isLogin == "false"){
            this.state = {
                quantity:1,
                size:'none'
            }

        }else{
            const token = localStorage.auth;
            const user = jwt_decode(token);
            this.state = {

                userId: user.id,
                productId:this.props.productId,
                price:0,
                quantity:1,
                total:0,
                img:this.props.product.url1,
                errorMsg:"",
                error:false,
                success:false,
                size:'none'
            }
        }



    }

    onChangeUsername(e) {
        this.setState({
            quantity: e.target.value
        })
    }


    handleClick(e) {

        const isLogin = localStorage.getItem("isLogin")
        if (isLogin == "false"){
            this.setState({
                error:true,
                errorMsg: 'Please Login First !!!',

            })

        }else{

            //Validate click add to cart
            if(this.state.quantity == 0){
                this.setState({
                    error:true,
                    errorMsg:"Please Select The Quantity"
                })
            }else if(this.state.size == "none"){
                this.setState({
                    error:true,
                    errorMsg:"Please Select The Size"
                })
            }else{
                const amount = this.props.product.oprice * this.state.quantity;
                //Create cart Object
                const cart = {
                    userId: this.state.userId,
                    productId:this.state.productId,
                    productName:this.props.product.productname,
                    price:this.props.product.oprice,
                    quantity: this.state.quantity,
                    total: amount,
                    url:this.props.product.url1,
                    size:this.state.size
                }

                console.log(cart);
                //post method
                axios.post('http://localhost:5000/cart/add', cart)
                    .then(res => console.log(res.data));

                this.setState({
                    error:false,
                    product: '',
                    success:true
                })
            }

        }



    }

    handleSizeChange(e){

        console.log(e.target.value)
        this.setState({
            size:e.target.value
        })

    }

    render() {

        const dopStyle={

            display : "inline-block",
            marginRight: "10px",
            position: "relative",
            width: "auto",
            float: "left",

        }
        return (
            <div>
                <div className="s_product_text">
                    <h3>{this.props.product.productname}</h3>
                    <h2>RS.{this.props.product.oprice}</h2>
                    <input type="hidden" value={this.props.product.oprice}/>
                    <ul className="list">
                        <li>
                            <a className="active" href="#">
                                <span>Category</span> : {this.props.product.category}</a
                            >
                        </li>
                        <li>
                            <a href="#"> <span>Availibility</span> : {this.props.product.availability}</a>
                        </li>
                    </ul>
                    <p>
                        {this.props.product.shortdiscription}
                    </p>
                    <h6 htmlFor="qty">Size:</h6>
                    <div className="select">

                        <select name="format" id="format" value={this.state.size} onChange={this.handleSizeChange}>
                            <option value="none">Select</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>

                    <div className="product_count">
                        <label htmlFor="qty">Quantity:</label>
                        <input
                            type="text"
                            name="qty"
                            id="sst"
                            maxLength="12"
                            value={this.state.quantity}
                            onChange={this.onChangeUsername}
                            title="Quantity:"
                            className="input-text qty"
                        />
                        <button

                            className="increase items-count"
                            type="button"
                        >
                            <i className="lnr lnr-chevron-up"></i>
                        </button>
                        <button

                            className="reduced items-count"
                            type="button"
                        >
                            <i className="lnr lnr-chevron-down"></i>
                        </button>
                    </div>

                    <div className="card_area">

                        <a className="main_btn" href="#" onClick={this.handleClick}>Add to Cart</a>
                        <a className="icon_btn" href="#">
                            <i className="lnr lnr lnr-diamond"></i>
                        </a>
                        <a className="icon_btn" href="#">
                            <i className="lnr lnr lnr-heart"></i>
                        </a>

                    </div>
                    {(this.state.error ?  this.state.errorMsg :"")}
                    {(this.state.success) ? "Product Added To Cart":""}


                </div>
            </div>
        )

    }


}