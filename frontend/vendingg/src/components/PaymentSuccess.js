import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success">
      <h2>Payment Successful! 🎉</h2>
      <p>Thank you for your purchase.</p>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  );
};

export default PaymentSuccess;