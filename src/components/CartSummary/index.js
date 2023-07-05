// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummery = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const prices = cartList.map(prod => prod.quantity * prod.price)
      const totalPrice = prices.reduce((v1, v2) => v1 + v2)

      return (
        <div className="cart-summary">
          <h1 className="total-price-text">
            Order Total: <span className="total-price">Rs {totalPrice}/-</span>
          </h1>
          <p className="items-in-cart-para">{cartList.length} Items in cart</p>
          <button className="checkout-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummery
