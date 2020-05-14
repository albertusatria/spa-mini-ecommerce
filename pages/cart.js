import React from 'react';
import Layout from '../components/layout';
import { useSelector } from 'react-redux';
import { withRedux } from '../lib/redux';
import Price from "../components/price";

const cart = () => {
    const pageConfig = {
        title: "Cart Page",
    };
    const cart = useSelector(state => state.cart);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    console.log(cart);
    
    let grandTotal = 0;    
    cart.forEach((item) => {
        grandTotal += item.qty * item.price.value;
    });
    return (
        [
            <div className="content-wrapper">
                <Layout pageConfig={pageConfig} />
                <h1>Shopping Cart</h1>
                <div className="cart-items">
                    {cart.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Product(s)</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            {cart.map((item) => (
                                <tbody key={item.id}>
                                    <tr>
                                        <td>
                                            <div className="product-info-wrapper">
                                                <div className="product-image">
                                                    <img
                                                        src={item.image.url}
                                                        alt={item.name.label}
                                                    />
                                                </div>
                                                <div className="product-info">
                                                    <div className="product-name">
                                                        <strong>{item.name}</strong>
                                                    </div>
                                                    <div className="product-sku">
                                                        <span>SKU: {item.sku}</span>
                                                    </div>
                                                    <div className="product-price">
                                                        
                                                    </div>
                                                    <div className="product-qty">
                                                        <span>qty: {item.qty}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="cart-product-subtotal">
                                                <span>
                                                    {formatter.format(item.price.value * item.qty)}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                            <tfoot>
                                <tr>
                                    <td>
                                        <strong>Grand Total: </strong>
                                    </td>
                                    <td>
                                        <span>
                                            {formatter.format(grandTotal)}
                                        </span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    ) : (<p>No item in your bag</p>)}
                </div>
            </div>
        ]
    );
}

export default (withRedux)(cart);