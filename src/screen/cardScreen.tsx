import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import useCartStore from '../store/cartStore';
import CartItem from '../components/cardItems';
import { COLORS } from '../constants/colors';

const CartScreen = () => {
  const cartItems = useCartStore(state => state.cartItems);
  const getTotalAmount = useCartStore(state => state.getTotalAmount);
  const clearCart = useCartStore(state => state.clearCart);

  const handleCheckout = () => {
    Alert.alert(
      '🎉 Order Placed!',
      `Total: $${getTotalAmount()} \n\nThank you for shopping with us!`,
      [{ text: 'OK', onPress: () => clearCart() }],
    );
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyText}>There is nothing in cart</Text>
        <Text style={styles.emptySubText}>Add products</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Total + Checkout */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>${getTotalAmount()}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingVertical: 8,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 6,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
