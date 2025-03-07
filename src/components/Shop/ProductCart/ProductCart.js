import "./ProductCart.css";
import React from "react";

class ProductCart extends React.Component {
  removeProdcut(id, e) {
    this.props.onRemoveFromBasket(id);
  }

  render() {
    const { id, pic, title, price } = this.props;

    return (
      <tr className="product-row">
        <td>
          <div className="product-item">
            <img className="product-item__img" src={pic} alt="" />
            <span className="prodcut-item__title">{title}</span>
          </div>
        </td>
        <td>
          <p className="prodcut-item__price">${price}</p>
        </td>
        <td>
          <button className="product-row__remove-btn" onClick={this.removeProdcut.bind(this, id)}>
            delete
          </button>
        </td>
      </tr>
    );
  }
}

export default ProductCart;
