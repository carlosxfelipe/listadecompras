import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ListaDeCompras = () => {
  const inputRef = useRef();
  const [novoItem, setNovoItem] = useState('');
  const [listaDeItens, setListaDeItens] = useState([]);

  const clearStorage = async () => {
    AsyncStorage.clear();
  };

  // clearStorage();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@listadecompras_unifor');
      return jsonValue !== null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
    }
  };

  const confirmarRemocao = id =>
    Alert.alert('Cuidado!', 'Deseja mesmo excluir esse item?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('cancelar pressionado'),
        style: 'cancel',
      },
      {text: 'Sim', onPress: () => removerItem(id)},
    ]);

  const salvarItem = async () => {
    const novosDados = [
      ...listaDeItens,
      {name: novoItem, id: listaDeItens.length},
    ];
    try {
      const jsonValue = JSON.stringify(novosDados);
      await AsyncStorage.setItem('@listadecompras_unifor', jsonValue);
      setListaDeItens(novosDados);
      inputRef.current.clear();
    } catch (e) {
      // saving error
    }
  };

  const removerItem = id => {
    const novoArray = listaDeItens.filter(item => item.id !== id);
    setListaDeItens(novoArray);
  };

  const renderItem = ({item, index}) => (
    <Pressable onPress={() => confirmarRemocao(item.id)}>
      <View
        style={[
          styles.itemContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {backgroundColor: index % 2 === 0 ? 'white' : '#efefef'},
        ]}>
        <Text style={styles.item}>{item.name}</Text>
      </View>
    </Pressable>
  );

  useEffect(() => {
    // AsyncStorage.clear();

    const getDadosAsyncStorage = async () => {
      const dados = await getData();

      setListaDeItens(dados);
    };

    getDadosAsyncStorage();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.title}>Lista de Compras</Text>
      <FlatList
        data={listaDeItens}
        // contentContainerStyle={{paddingBottom: 40}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TextInput
        style={styles.input}
        value={novoItem}
        onChangeText={setNovoItem}
        placeholder="Preciso de ..."
        placeholderTextColor="#a9a9a9"
        ref={inputRef}
      />
      <Pressable onPress={salvarItem}>
        <View style={styles.button}>
          <Text style={styles.textButton}>ADICIONAR</Text>
        </View>
      </Pressable>
      <SafeAreaView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: 'white'},
  title: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  itemContainer: {
    paddingVertical: 16,
  },
  item: {fontSize: 20, color: 'black'},
  input: {
    padding: 16,
    marginTop: 32,
    fontSize: 20,
    backgroundColor: '#efefef',
    borderRadius: 10,
    color: 'black',
  },
  button: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 10,
  },
  textButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
