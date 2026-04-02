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
const BASE_URL = 'https://dummyjson.com';

export type DummyReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type DummyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  rating: number;
  stock: number;
  images?: string[];
  thumbnail?: string;
  reviews?: DummyReview[];
};

type DummyProductsResponse = {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
};

// Your app model
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

const mapDummyToProduct = (p: DummyProduct): Product => ({
  id: p.id,
  title: p.title,
  description: p.description,
  price: p.price,
  image: p.thumbnail || p.images?.[0] || '',
  category: p.category,
  rating: {
    rate: p.rating,
    count: p.reviews?.length ?? 0, // or p.stock if you prefer
  },
});

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok)
    throw new Error(`Failed to fetch products: ${response.status}`);

  const data: DummyProductsResponse = await response.json();

  if (!Array.isArray(data.products)) {
    throw new Error('Invalid API response format: products[] missing');
  }

  return data.products.map(mapDummyToProduct);
};
