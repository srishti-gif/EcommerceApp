// // const BASE_URL = 'https://fakestoreapi.com';
// const BASE_URL = 'https://fake-store-api.mock.beeceptor.com/api';

// export const getAllProducts = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/products`);
//     if (!response.ok) throw new Error('Failed to fetch products');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };
const BASE_URL = 'https://fake-store-api.mock.beeceptor.com/api';

export type ApiReview = {
  user_id: number;
  rating: number;
  comment: string;
};

export type ApiProduct = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  discount: number;
  availability: boolean;
  brand: string;
  category: string;
  rating: number; 
  reviews: ApiReview[];
};


export type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  image: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
};

const mapApiProductToProduct = (p: ApiProduct): Product => ({
  id: p.product_id,
  title: p.name,
  description: p.description,
  price: p.price,
  image: p.image,
  category: p.category,
  rating: {
    rate: p.rating,
    count: p.reviews?.length ?? 0,
  },
});

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok)
    throw new Error(`Failed to fetch products: ${response.status}`);

  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error('Invalid API response format');

  return (data as ApiProduct[]).map(mapApiProductToProduct);
};
