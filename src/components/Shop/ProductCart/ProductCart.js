import "./ProductCart.css";
import React from "react";

class ProductCart extends React.Component {
  removeProdcut(id, e) {
    this.props.onRemoveFromBasket(id);
  }

  render() {
    return (
      <tr className="product-row">
        <td>
          <div className="product-item">
            <img className="product-item__img" src={this.props.pic} alt="" />
            <span className="prodcut-item__title">{this.props.title}</span>
          </div>
        </td>
        <td>
          <p className="prodcut-item__price">${this.props.price}</p>
        </td>
        <td>
          <button className="product-row__remove-btn" onClick={this.removeProdcut.bind(this, this.props.id)}>
            delete
          </button>
        </td>
      </tr>
    );
  }
}

export default ProductCart;
