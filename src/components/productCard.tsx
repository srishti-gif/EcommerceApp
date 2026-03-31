
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import useCartStore, { Product } from '../store/cartStore';
import { COLORS } from '../constants/colors';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { cartItems, addToCart } = useCartStore();

  const isAdded = cartItems.some(item => item.id === product.id);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.category}>{product.category}</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ {product.rating?.rate ?? 'N/A'}</Text>
          <Text style={styles.ratingCount}>
            ({product.rating?.count ?? 0})
          </Text>
        </View>

        <Text style={styles.price}>${product.price}</Text>
      </View>

      <TouchableOpacity
        style={[styles.addBtn, isAdded && styles.addedBtn]}
        onPress={() => addToCart(product)}
        disabled={isAdded}
      >
        <Text style={styles.addBtnText}>
          {isAdded ? '✓ Added' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    margin: 8,
    padding: 12,
    flex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  info: {
    marginTop: 8,
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 11,
    color: COLORS.grey,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    color: COLORS.text,
  },
  ratingCount: {
    fontSize: 11,
    color: COLORS.grey,
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addedBtn: {
    backgroundColor: COLORS.success,
  },
  addBtnText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 13,
  },
});

export default ProductCard;