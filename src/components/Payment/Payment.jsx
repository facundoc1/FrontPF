import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makePayment } from '../../Redux/actions/actions_payment';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cartTemp = JSON.parse(localStorage.getItem('cartTemp')) || [];

  const totalAmount = cartTemp.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity;
  }, 0).toFixed(2);

  // Define los detalles del pago
  const paymentDetails = {
    items: cartTemp.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      unit_price: Math.round(item.price * 100),
      currency_id: "CLP",
    })),
  };

  useEffect(() => {
    const initializeMercadoPago = () => {
      if (window.MercadoPago) {
        window.MercadoPago.setPublishableKey('TEST-c4244ab4-dc76-40b7-b5cf-9b18b0b6bed0'); 
      }
    };

    const script = document.createElement('script');
    script.src = 'https://www.mercadopago.com/v2/security.js';
    script.onload = initializeMercadoPago;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      const response = await dispatch(makePayment(paymentDetails));
      if (response.success) {
        history.push('/payment-gateway'); 
      } else {
        console.error('Error al procesar el pago');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };

  return (
    <div>
      <h2>Resumen de Compra</h2>
      <ul>
        {cartTemp.map((item) => (
          <li key={item.id}>
            <div>
              <span>{item.title}</span>
              <span>Cantidad: {item.quantity}</span>
              <span>Precio Unitario: {item.price}</span>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <p>Total a pagar: {totalAmount}</p>
      </div>
      <button onClick={handlePayment}>Confirmar Compra</button>
    </div>
  );
};

export default PaymentPage;
