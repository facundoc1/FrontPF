import React, { useState } from 'react';
import axios from 'axios';

function PaymentComponent() {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    try {
      // Llama a la ruta en el backend para iniciar el proceso de pago
      const response = await axios.get('/payment');

      // Redirige al usuario a la pasarela de pago de MercadoPago
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Error al iniciar el proceso de pago:', error);
      setPaymentStatus('Error al iniciar el pago.');
    }
  };

  return (
    <div>
      <h1>Página de Pago</h1>
      <button onClick={handlePayment}>Pagar</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
}

export default PaymentComponent;