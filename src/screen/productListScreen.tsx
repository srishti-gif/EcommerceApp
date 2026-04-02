import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { getAllProducts, Product } from '../api/apis';
import ProductCard from '../components/productCard';
import FloatingCartButton from '../components/FloatingCartButton';
import { COLORS } from '../constants/colors';

type ProductListScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const ProductListScreen: React.FC<ProductListScreenProps> = ({
  navigation,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Cannot load products. Please retry.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        // string khud bana lo
        keyExtractor={item => String(item.id)}
        numColumns={2}
        //useCallback mai rkhna hai
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <FloatingCartButton onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: 8,
    paddingBottom: 100, // floating button ke liye space
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.grey,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
  },
});

export default ProductListScreen;