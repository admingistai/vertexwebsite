import ChatBar from './components/ChatBar';
import { CartProvider } from './contexts/CartContext';
import './styles.css';

function App() {
  return (
    <CartProvider>
      <ChatBar />
    </CartProvider>
  );
}

export default App
