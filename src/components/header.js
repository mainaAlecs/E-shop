import React, { Component } from 'react'
import axios from 'axios'
import cart from '../components/images/shopping-bag.png'
import save from '../components/images/heart.png'

class Header extends Component {

    state = {
        cart: [],
        favourite: [],
    };

    componentDidMount(){

        axios.get('http://localhost:8000/cur/').then(
            res => {
                this.setState({
                    user: res.data
                })
            },
            err => {
                console.log(err)
            }
        )

        axios.get('http://localhost:8000/cart/').then(
            res => { 
                this.setState({
                    cart: res.data.cart.product
                })
            },
            err => {
                console.log(err)
            }
        )

        axios.get(`http://localhost:8000/favourite/`).then(
            res => {
                this.setState({
                    favourite : res.data.favourite.product
                })
            }
        )
    }


    render() {
        const favouriteNo = this.state.favourite.length
        const cartNo = this.state.cart.length
      
        let button;

        if (this.state.user){
            button = (
                <div className="user__detail">
                    <ul>
                        <li>
                            <a href="/checkout">
                                <h4><img src={cart} alt="shopping cart" width="17px" /></h4>
                                <span className="number">{cartNo}</span>
                            </a>
                        </li>
                        <li>
                            <a href="/saved">
                            <h4><img src={save} alt="favourite" width="17px" /></h4>
                            <span className="favourite">{favouriteNo}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            )
        }
        else{
            button = (
                <div className="forms">
                    <a href="/Login">
                        <button className="log">Login</button>
                    </a>
                    <a href ="/signup">
                        <button className="sign">Sign up</button>
                    </a>
                </div>
            )
        }

        return (
            <div>
                <div className="nav">
                <div className="hero">
                    <h2>Bet.ty's Collection</h2>
                    <form method="" action="" class="search-form">
                    <input 
                        name="q"
                        type="text"
                        placeholder="Search..."
                    />
                    <button><i className="fa fa-search"></i></button>
                    </form>
                    {button}
                </div>
                <div className="header">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/shop">Shop</a>
                        </li>
                        <li>
                            <a href="/new">New Arrivals</a>
                        </li>
                        <li>
                            <a href="/">About</a>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        )
    }
}

export default Header
