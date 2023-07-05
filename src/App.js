import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(prod => prod.id !== id)
    this.setState({cartList: filteredList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCart = cartList.map(prod => {
      if (prod.id === id) {
        const product = prod
        product.quantity += 1
        return product
      }
      return prod
    })
    this.setState({cartList: updatedCart})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCart = cartList.map(prod => {
      if (prod.id === id) {
        const product = prod
        product.quantity -= 1
        return product
      }
      return prod
    })
    const zeroQuantityProd = cartList.find(prod => prod.quantity === 0)
    if (zeroQuantityProd !== undefined) {
      this.setState({
        cartList: updatedCart.filter(prod => prod !== zeroQuantityProd),
      })
    } else {
      this.setState({cartList: updatedCart})
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const prodInCart = cartList.find(prod => prod.id === product.id)
    if (cartList.includes(prodInCart)) {
      prodInCart.quantity += 1
      const filteredCart = cartList.filter(prod => prod.id !== product.id)
      this.setState({cartList: [...filteredCart, prodInCart]})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
