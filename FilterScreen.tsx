import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dish } from '../types';

export default function FilterScreen() {
  // Explicitly type the selected course
  const [selected, setSelected] = useState<'All' | 'Starter' | 'Main' | 'Dessert' | 'Drink'>('All');

  const dishes: Dish[] = [
    { id: '1', name: 'Salad', description: 'Healthy greens', price: 40, course: 'Starter' },
    { id: '2', name: 'Ice Cream', description: 'Vanilla flavour', price: 30, course: 'Dessert' },
  ];

  const filtered = selected === 'All' ? dishes : dishes.filter(d => d.course === selected);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Browse by Course</Text>

      {/* ✅ Type-safe Picker usage */}
      <Picker
        selectedValue={selected}
        onValueChange={(value: 'All' | 'Starter' | 'Main' | 'Dessert' | 'Drink') => setSelected(value)}
        style={{ marginVertical: 8 }}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Starters" value="Starter" />
        <Picker.Item label="Mains" value="Main" />
        <Picker.Item label="Desserts" value="Dessert" />
        <Picker.Item label="Drinks" value="Drink" />
      </Picker>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.description} (R{item.price})</Text>
        )}
      />
    </View>
  );
}

