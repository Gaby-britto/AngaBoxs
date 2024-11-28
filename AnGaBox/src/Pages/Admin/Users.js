import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderImage from '../../Componentes/Header/HeaderImage';
import FooterAdmin from '../../Componentes/Footer/FooterAdmin';
import axios from 'axios';

export default function UserListPage() {

  const [users, setUsers] = useState([]);

  // Função para listar todos os usuários
  const listAllUsers = async () => {
    try {
      const response = await axios.get(`http://10.92.198.32:8080/api/users`); // Ajustado para pegar todos os usuários
      setUsers(response.data);
      console.log("resposta da api: ", response.data);
    } catch (error) {
      console.log("erro:", error);
    }
  };

  // Hook useEffect para carregar os usuários quando a página for carregada
  useEffect(() => {
    listAllUsers();
  }, []);

  // Função para excluir um usuário
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://192.168.1.9:8080/api/users/${id}`);
      Alert.alert('User deleted');
      console.log('resposta da api: ', response.data);
      listAllUsers();
    } catch (error) {
      console.log("Error", error);
    }
  };

  // Função de confirmação de exclusão do usuário
  const deleteUser = (id) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setUsers(users.filter(user => user.id !== id));
            handleDelete(id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Renderiza cada item da lista de usuários
  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      <TouchableOpacity onPress={() => deleteUser(item.id)}>
        <Ionicons name="trash-bin" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderImage />
      <ScrollView style={styles.containerScroll}>
        <Text style={styles.title}>USER LIST</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyMessage}>No users available</Text>}
        />
      </ScrollView>
      <FooterAdmin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerScroll: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Montserrat_400Regular',
    color: '#9400D3',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  userName: {
    fontSize: 18,
    color: '#333',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});
