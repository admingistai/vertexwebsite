import React from 'react';
import { useCart } from '../hooks/useCart';

console.log('🎠 ProductCarouselV2.tsx loaded!');

// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  colors: string[];
  image: string;
}

// Component props
interface ProductCarouselV2Props {
  theme: 'light' | 'dark';
  isVisible: boolean;
  carouselId?: string;
}

const ProductCarouselV2: React.FC<ProductCarouselV2Props> = ({ 
  theme, 
  isVisible, 
  carouselId 
}) => {
  console.log('🎠 ProductCarouselV2 render:', { theme, isVisible, carouselId });
  
  // Get cart functionality from context
  const { addItem } = useCart();

  // Men's hiking shoes product data
  const mensHikingProducts: Product[] = [
    {
      id: 6,
      name: 'Terra Guide All-Terrain',
      price: 165,
      description: 'Rugged hiking boots built for any terrain',
      colors: ['Black', 'Desert Tan', 'Forest Green'],
      image: '/images/products/terra-guide.jpg'
    },
    {
      id: 1,
      name: 'Summit Pro GTX',
      price: 189,
      description: 'Waterproof hiking boots for serious adventurers',
      colors: ['Charcoal', 'Navy', 'Brown'],
      image: '/images/products/summit-pro.jpg'
    },
    {
      id: 3,
      name: 'Trail Runner XT',
      price: 145,
      description: 'Lightweight trail running shoes for speed',
      colors: ['Black/Red', 'Grey/Blue'],
      image: '/images/products/apex-runner.jpg'
    },
    {
      id: 9,
      name: 'Alpine Explorer',
      price: 175,
      description: 'Technical hiking boots for mountain adventures',
      colors: ['Brown', 'Black'],
      image: '/images/products/storm-shield.jpg'
    },
    {
      id: 11,
      name: 'Vertex Peak Master',
      price: 195,
      description: 'Premium hiking boots for peak performance',
      colors: ['Black', 'Olive', 'Grey'],
      image: '/images/products/urban-forge.jpg'
    },
    {
      id: 7,
      name: 'Ridge Walker Pro',
      price: 159,
      description: 'Versatile hiking shoes for all-day comfort',
      colors: ['Tan', 'Slate Grey', 'Moss Green'],
      image: '/images/products/sky-dancer.jpg'
    },
    {
      id: 10,
      name: 'Canyon Trekker Elite',
      price: 199,
      description: 'Ultra-durable boots for extreme conditions',
      colors: ['Burnt Orange', 'Charcoal', 'Khaki'],
      image: '/images/products/sport.jpg'
    }
  ];

  // Women's hiking shoes product data
  const womensHikingProducts: Product[] = [
    {
      id: 301,
      name: 'Terra Trail Women\'s',
      price: 155,
      description: 'Lightweight women\'s hiking boots with superior comfort',
      colors: ['Rose Gold', 'Lavender', 'Sage Green'],
      image: '/images/products/womans1.jpg'
    },
    {
      id: 302,
      name: 'Summit Lady GTX',
      price: 179,
      description: 'Waterproof women\'s hiking boots for all weather',
      colors: ['Coral', 'Teal', 'Plum'],
      image: '/images/products/womans2.jpg'
    },
    {
      id: 303,
      name: 'Trail Blazer Women\'s',
      price: 139,
      description: 'Fast and light women\'s trail running shoes',
      colors: ['Pink/Grey', 'Turquoise/White'],
      image: '/images/products/womans3.jpg'
    },
    {
      id: 304,
      name: 'Alpine Rose Explorer',
      price: 169,
      description: 'Technical women\'s boots for mountain hiking',
      colors: ['Dusty Rose', 'Sky Blue', 'Mint'],
      image: '/images/products/luna-rise.jpg'
    },
    {
      id: 305,
      name: 'Vertex Lady Peak',
      price: 185,
      description: 'Premium women\'s hiking boots with ankle support',
      colors: ['Mauve', 'Pearl Grey', 'Forest Green'],
      image: '/images/products/sky-dancer.jpg'
    },
    {
      id: 306,
      name: 'Ridge Walker Women\'s',
      price: 149,
      description: 'Versatile women\'s hiking shoes for day hikes',
      colors: ['Blush', 'Lavender Grey', 'Olive'],
      image: '/images/products/pink.jpg'
    },
    {
      id: 307,
      name: 'Canyon Queen Elite',
      price: 189,
      description: 'Women\'s boots for extreme terrain and conditions',
      colors: ['Berry', 'Stone Grey', 'Copper'],
      image: '/images/products/dali.jpg'
    }
  ];

  // Select products based on carouselId
  const products = carouselId?.includes('women') ? womensHikingProducts : mensHikingProducts;
  
  // Dynamic carousel title based on carouselId
  const carouselTitle = carouselId?.includes('women') ? "Women's Hiking Shoes" : "Men's Hiking Shoes";

  // Handle product click navigation
  const handleProductClick = (productId: number, event?: React.MouseEvent) => {
    event?.stopPropagation();
    console.log('🛍️ Navigating to product:', productId);
    window.open(`/product/${productId}`, '_blank');
  };

  // Handle add to cart functionality
  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    
    console.log('🛒 Adding to cart:', product);
    
    // Add item to cart using cart context
    addItem(product);
  };

  if (!isVisible) {
    console.log('🎠 ProductCarouselV2 hidden - isVisible is false');
    return null;
  }
  
  console.log('🎠 ProductCarouselV2 rendering - isVisible is true');

  return (
    <div className={`product-carousel-v2 ${theme}`}>
      <div className="carousel-v2-header">
        <h3 className="carousel-v2-title">{carouselTitle}</h3>
      </div>
      
      <div className="carousel-v2-container">
        <div className="carousel-v2-track">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card-v2"
              onClick={(e) => handleProductClick(product.id, e)}
            >
              <div className="product-image-v2">
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/200x150/666666/ffffff?text=${encodeURIComponent(product.name.split(' ')[0])}`;
                  }}
                />
                
                {/* Shopping Cart Icon */}
                <div 
                  className="cart-icon-v2"
                  onClick={(e) => handleAddToCart(product, e)}
                  title="Add to cart"
                >
                  🛒
                </div>
              </div>
              
              <div className="product-info-v2">
                <h4 className="product-name-v2">{product.name}</h4>
                <p className="product-description-v2">{product.description}</p>
                <div className="product-price-v2">${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarouselV2;