import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity } from '../redux/CartSlice';
import { useNavigate } from 'react-router-dom';

function CartItems() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.items);

    const handleIncrement = (item) => {
        dispatch(addItem(item));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.id));
        }
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Your Cart is Empty</h2>
                <p>Add some beautiful plants to your cart!</p>
                <button className="continue-shopping-btn" onClick={() => navigate('/products')}>
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1 className="page-title">Shopping Cart</h1>
            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3 className="cart-item-name">{item.name}</h3>
                                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="cart-item-actions">
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleDecrement(item)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleIncrement(item)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="cart-item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-row">
                        <span>Total Items:</span>
                        <span>{calculateTotalItems()}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total Amount:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn">Proceed to Checkout</button>
                    <button className="continue-shopping-btn" onClick={() => navigate('/products')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
