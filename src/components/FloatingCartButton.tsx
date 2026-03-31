
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import useCartStore from '../store/cartStore';
import { COLORS } from '../constants/colors';

type FloatingCartButtonProps = {
  onPress: () => void;
};

const FloatingCartButton = ({ onPress }: FloatingCartButtonProps) => {
  const getTotalItems = useCartStore(state => state.getTotalItems);
  const getTotalAmount = useCartStore(state => state.getTotalAmount);

  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
        <Text style={styles.text}>View Cart</Text>
        <Text style={styles.amount}>₹{getTotalAmount()}</Text>
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
    elevation: 8,
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
    fontWeight: 'bold',
    fontSize: 13,
  },
  text: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  amount: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default FloatingCartButton;