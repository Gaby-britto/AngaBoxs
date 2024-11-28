import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../Componentes/Header/Header';
import FooterAdmin from '../../Componentes/Footer/FooterAdmin';



export default function SearchPage() {
  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        {/* Exibição de múltiplos cards de filmes */}
        <CardMovieAdmin />
        <CardMovieAdmin />
        <CardMovieAdmin />
        <CardMovieAdmin />
        <CardMovieAdmin />
      </ScrollView>
      <FooterAdmin />
    </View>
  );
}

// Estilização do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },
});
