// src/components/SearchBar.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

// ALTERAÇÃO: Novo componente de pesquisa
// Motivo: Criar interface para pesquisar produtos por nome ou ID
export default function SearchBar({ onSearch, onClear, placeholder = "Pesquisar por nome ou ID..." }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleClear = () => {
    setSearchText('');
    onClear();
  };

  const handleSubmitEditing = () => {
    handleSearch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          onSubmitEditing={handleSubmitEditing}
          returnKeyType="search"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={handleSearch}
          >
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={handleClear}
          >
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f7f7f7',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
  },
  searchInput: {
    fontSize: 16,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
  },
  clearButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
  },
  searchButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  clearButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});
