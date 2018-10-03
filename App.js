import React, {Component} from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ArtistasScreen from './Artistas.js';
import CancionesScreen from './Canciones.js';
import Cancion from './Cancion.js';

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
    Artistas: ArtistasScreen,
    Canciones: CancionesScreen,
    Cancion: Cancion,
  }
);
