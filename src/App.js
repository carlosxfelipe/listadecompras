import React from 'react';
import {StatusBar} from 'react-native';
import {ListaDeCompras} from './ListaDeCompras';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <ListaDeCompras />
    </>
  );
};

export default App;
