import "./ProductBox.css";
import React from "react";

class ProductBox extends React.Component {
  addToCartHandler(id, e) {
    this.props.onAddToCart(id);
  }

  render() {
    const { id, pic, title, price } = this.props;

    return (
      <div className="product-card">
        <img className="product-card__img" src={pic} alt="" />
        <div className="product-card__body">
          <p className="product-card__title">{title}</p>
          <div className="product-card__infos">
            <span className="product-card__price">${price}</span>
            <button className="product-card__btn" onClick={this.addToCartHandler.bind(this, id)}>
              add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductBox;
