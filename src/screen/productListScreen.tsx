
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { getAllProducts } from '../api/apis';
import ProductCard from '../components/productCard';
import FloatingCartButton from '../components/FloatingCartButton';
import { COLORS } from '../constants/colors';
import { Product } from '../store/cartStore';

const ProductListScreen = ({ navigation }: { navigation: any }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Cannot load Products. Please retry.');
    } finally {
      setLoading(false);
    }
  };

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
        keyExtractor={item => item.id.toString()}
        numColumns={2}
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
    paddingBottom: 100, 
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