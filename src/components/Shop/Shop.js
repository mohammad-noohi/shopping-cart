import "./Shop.css";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductBox from "./ProductBox/productBox";
import ProductCart from "./ProductCart/ProductCart";

class Shop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [
        { id: 1, pic: "assets/images/products/prodcut-1.jpg", title: "title 1", price: 1000 },
        { id: 2, pic: "assets/images/products/product-2.jpg", title: "title 2", price: 324 },
        { id: 3, pic: "assets/images/products/product-3.jpg", title: "title 3", price: 455 },
        { id: 4, pic: "assets/images/products/product-4.jpg", title: "title 4", price: 500 },
        { id: 5, pic: "assets/images/products/product-5.jpg", title: "title 5", price: 998 },
        { id: 6, pic: "assets/images/products/product-6.jpg", title: "title 6", price: 1200 },
        { id: 7, pic: "assets/images/products/product-7.jpg", title: "title 7", price: 3400 },
        { id: 8, pic: "assets/images/products/product-8.jpg", title: "title 8", price: 200 },
      ],

      shoppingCart: [],
    };
  }

  addToCart(productId, e) {
    const mainProdcut = this.state.products.find(product => product.id === productId);
    this.setState(prevState => {
      return { shoppingCart: [...prevState.shoppingCart, mainProdcut] };
    });
  }

  removeProdcut(productId, e) {
    const newShoppingCart = this.state.shoppingCart.filter(product => product.id !== productId);

    this.setState({
      shoppingCart: newShoppingCart,
    });
  }

  clearCart(e) {
    this.setState({
      shoppingCart: [],
    });
  }

  render() {
    return (
      <>
        <Header />

        <div className="container">
          <h1 style={{ marginTop: "3rem" }}>All Products</h1>
          <div className="products">
            {this.state.products.map(product => (
              <ProductBox {...product} key={product.id} onAddToCart={this.addToCart.bind(this)} />
            ))}
          </div>

          <div className={`cart ${this.state.shoppingCart.length === 0 ? "cart--empty" : ""}`}>
            {this.state.shoppingCart.length > 0 && (
              <div className="table-wrapper">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>item</th>
                      <th>price</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.shoppingCart.map(productRow => {
                      return <ProductCart key={productRow.id} {...productRow} onRemoveFromBasket={this.removeProdcut.bind(this)} />;
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <p className="cart-empty-message">there isn't any prodcut in your cart</p>
            <button className="cart__empty-btn" onClick={this.clearCart.bind(this)}>
              empty cart
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Shop;
