
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import useCartStore from '../store/cartStore';
import { COLORS } from '../constants/colors';

type FloatingCartButtonProps = {
  onPress: () => void;
};

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ onPress }) => {
  const totalItems = useCartStore(state =>
    state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalAmount = useCartStore(state =>
    state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  if (totalItems === 0) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.row}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>

        <Text style={styles.text}>View Cart</Text>
        <Text style={styles.amount}>₹{totalAmount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 10,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  text: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  amount: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
  },
});

export default FloatingCartButton;