import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dish } from '../types';
import DishCard from '../components/DishCard';
import FilterChips from '../components/FilterChips';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const [filter, setFilter] = useState<'All' | 'Starter' | 'Main' | 'Dessert' | 'Drink'>('All');
  const [dishes, setDishes] = useState<Dish[]>([
    { id: '1', name: 'Tomato Soup', description: 'Fresh and creamy', price: 50, course: 'Starter' },
    { id: '2', name: 'Steak', description: 'Grilled perfection', price: 150, course: 'Main' },
  ]);

  const filtered = filter === 'All' ? dishes : dishes.filter(d => d.course === filter);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Menu</Text>
      <FilterChips selected={filter} onSelect={setFilter} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DishCard dish={item} />}
      />
      <TouchableOpacity
        style={{
          position: 'absolute', bottom: 20, right: 20,
          backgroundColor: '#4CAF50', borderRadius: 50, padding: 16
        }}
        onPress={() => navigation.navigate('ManageMenu')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>+ Add Item</Text>
      </TouchableOpacity>
    </View>
  );
}
