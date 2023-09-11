import React from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ModelCart from './ModelCart';

function ProductDetail({ products }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <Carousel showArrows={true} showStatus={false} showThumbs={true}>
        {product.images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Producto ${index}`} />
          </div>
        ))}
      </Carousel>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <div>
        <label>Cantidad:</label>
        <input type="number" defaultValue="1" />
      </div>
      <button onClick={handleAddToCart}>Comprar</button>
      <ModelCart items={cartItems} />
    </div>
  );
}

export default ProductDetail;
