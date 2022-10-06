import React, {useState} from 'react';
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

export const ListaDeCompras = () => {
  const [novoItem, setNovoItem] = useState('');
  const [listaDeItens, setListaDeItens] = useState([]);

  const confirmarRemocao = id =>
    Alert.alert('Cuidado!', 'Deseja mesmo excluir esse item?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('cancelar pressionado'),
        style: 'cancel',
      },
      {text: 'Sim', onPress: () => removerItem(id)},
    ]);

  const salvarItem = () => {
    setListaDeItens([
      ...listaDeItens,
      {name: novoItem, id: listaDeItens.length},
    ]);
  };

  const removerItem = id => {
    const novoArray = listaDeItens.filter(item => item.id !== id);
    setListaDeItens(novoArray);
  };

  const renderItem = ({item}) => (
    <Pressable onPress={() => confirmarRemocao(item.id)}>
      <Text style={styles.item}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.title}>Lista de Compras</Text>
      <FlatList
        data={listaDeItens}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TextInput
        style={styles.input}
        value={novoItem}
        onChangeText={setNovoItem}
        placeholder="Preciso de ..."
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
  container: {flex: 1, padding: 16},
  title: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 16,
    backgroundColor: 'black',
  },
  item: {fontSize: 20, color: 'black'},
  input: {
    padding: 16,
    fontSize: 20,
    backgroundColor: '#efefef',
    borderRadius: 10,
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
