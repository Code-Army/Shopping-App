import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../../web content/css/productstyle.css";

const ProductViewItems = props => {

    console.log(props.ProductViewItems._id)
    return(
<>
            {/*<td>{props.ProductViewItems.name}</td>*/}
            {/*<td>{props.ProductViewItems.description}</td>*/}

    <div className="col-lg-4 col-md-6 border-primary">
        <div className="single-product">
            <div className="product-img">
                <a href={`/Subcategory/${props.ProductViewItems._id}`}>  <img
                    className="card-img"
                    src={props.ProductViewItems.url}

                /></a>
                <div className="p_icon">
                    <a href="#">
                        <i className="ti-eye"></i>
                    </a>
                    <a href="#">
                        <i className="ti-heart"></i>
                    </a>
                    <a href="#">
                        <i className="ti-shopping-cart"></i>
                    </a>
                </div>
            </div>
            <div className="product-btm">
                <a href={`/Subcatergory/${props.ProductViewItems._id}`} className="d-block">
                    <h4>{props.ProductViewItems.name}</h4>
                </a>
                <div className="mt-3">
                    <span className="mr-4">{props.ProductViewItems.description}</span>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

export default ProductViewItems