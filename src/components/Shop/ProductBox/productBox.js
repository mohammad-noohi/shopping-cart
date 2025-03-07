import "./ProductBox.css";
import React from "react";

class ProductBox extends React.Component {
  addToCartHandler(id, e) {
    this.props.onAddToCart(id);
  }

  render() {
    return (
      <div className="product-card">
        <img className="product-card__img" src={this.props.pic} alt="" />
        <div className="product-card__body">
          <p className="product-card__title">{this.props.title}</p>
          <div className="product-card__infos">
            <span className="product-card__price">${this.props.price}</span>
            <button className="product-card__btn" onClick={this.addToCartHandler.bind(this, this.props.id)}>
              add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductBox;
