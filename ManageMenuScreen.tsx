import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import { Dish } from '../types';

export default function ManageMenuScreen() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<'Starter' | 'Main' | 'Dessert' | 'Drink'>('Starter');

  const addDish = () => {
    if (!name || !price) return;
    setDishes([...dishes, { id: Date.now().toString(), name, description, price: parseFloat(price), course }]);
    setName(''); setDescription(''); setPrice('');
  };

  const clearForm = () => { setName(''); setDescription(''); setPrice(''); };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Manage Menu</Text>

      <TextInput placeholder="Dish name" value={name} onChangeText={setName} style={{ borderBottomWidth: 1 }} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={{ borderBottomWidth: 1 }} />
      <TextInput placeholder="Price" value={price} keyboardType="numeric" onChangeText={setPrice} style={{ borderBottomWidth: 1 }} />
      <Button title="Add Item" onPress={addDish} />
      <Button title="Clear Form" onPress={clearForm} color="gray" />

      <FlatList
        data={dishes}
        renderItem={({ item }) => (
          <Text>{item.name} - R{item.price} ({item.course})</Text>
        )}
      />
    </View>
  );
}
