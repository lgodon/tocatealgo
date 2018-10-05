import React, {Component} from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ArtistasScreen from './Artistas.js';
import DestacadasScreen from './Destacadas.js';
import CancionesScreen from './Canciones.js';
import CancionScreen from './Cancion.js';
import HomeScreen from './Home.js';

export default class App extends Component {

  constructor(props) {
    super(props);

		console.disableYellowBox = true; // TODO
  }

  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Artistas: ArtistasScreen,
    Destacadas: DestacadasScreen,
    Canciones: CancionesScreen,
    Cancion: CancionScreen,
  }
);
