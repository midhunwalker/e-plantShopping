import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/CartSlice';

const products = [
    {
        id: 1,
        name: 'Monstera Deliciosa',
        price: 29.99,
        description: 'Beautiful Swiss cheese plant with large, glossy leaves',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop'
    },
    {
        id: 2,
        name: 'Snake Plant',
        price: 19.99,
        description: 'Low-maintenance air-purifying plant perfect for beginners',
        image: 'https://images.unsplash.com/photo-1593482892540-73c9199d1c91?w=400&h=400&fit=crop'
    },
    {
        id: 3,
        name: 'Fiddle Leaf Fig',
        price: 39.99,
        description: 'Stunning statement plant with large violin-shaped leaves',
        image: 'https://images.unsplash.com/photo-1608746883986-7f9c86d1f4ca?w=400&h=400&fit=crop'
    },
    {
        id: 4,
        name: 'Pothos',
        price: 15.99,
        description: 'Easy-care trailing plant with heart-shaped leaves',
        image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?w=400&h=400&fit=crop'
    },
    {
        id: 5,
        name: 'Peace Lily',
        price: 24.99,
        description: 'Elegant flowering plant that thrives in low light',
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop'
    },
    {
        id: 6,
        name: 'Rubber Plant',
        price: 34.99,
        description: 'Bold tropical plant with thick, glossy leaves',
        image: 'https://images.unsplash.com/photo-1598880940371-c756e015faf8?w=400&h=400&fit=crop'
    }
];

function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const getProductQuantity = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    return (
        <div className="product-list-container">
            <h1 className="page-title">Our Plants Collection</h1>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-container">
                            <img src={product.image} alt={product.name} className="product-image" />
                        </div>
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <div className="product-footer">
                                <span className="product-price">${product.price.toFixed(2)}</span>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                    {getProductQuantity(product.id) > 0 && (
                                        <span className="btn-badge">{getProductQuantity(product.id)}</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
