
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductListScreen from '../screen/productListScreen';
import CartScreen from '../screen/cardScreen';
import { COLORS } from '../constants/colors';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductList"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
           options={{ title: '🛍️ Products' }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: '🛒 My Cart' }}

        />
         



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;