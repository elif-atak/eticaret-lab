
import React from 'react';
import { Stack } from 'expo-router';
import { SepetProvider } from '../context/SepetContext';

export default function RootLayout() {
  return (
    <SepetProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#A78BCE'
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          contentStyle: {
            backgroundColor: '#FDF7FB'
          }
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'Ürünler' }}
        />

        <Stack.Screen
          name="urun/[id]"
          options={{ title: 'Ürün Detayı' }}
        />

        <Stack.Screen
          name="sepet"
          options={{ title: 'Sepetim' }}
        />
      </Stack>
    </SepetProvider>
  );
}
