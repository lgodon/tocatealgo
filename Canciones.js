import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';
import base64 from 'react-native-base64'
import { API_URL, API_USER, API_PASSWORD, OFFLINE } from './Config.js';

export default class CancionesScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      canciones: [
        { id: 341, title: 'If I fell' },
        { id: 752, title: 'It\'s only love' },
        { id: 706, title: 'Words of love' },
      ]
    }
  }

  componentDidMount() {
    if (OFFLINE) {
      this.setState({ isLoading: false });
      return;
    }

    var headers = new Headers();
    headers.append('Accept-Encoding', 'gzip');
    headers.append('Authorization', 'Basic ' + base64.encode(API_USER + ":" + API_PASSWORD));

    return fetch(API_URL + 'artists/' + this.props.navigation.state.params.idArtista, { headers: headers })
        .then((response) => response.json())
        .then((responseJson) => {
      this.setState({
          isLoading: false,
          canciones: responseJson.songs,
      }, function(){});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  irACancion(idCancion) {
    return this.props.navigation.navigate('Cancion', { idCancion: idCancion });
  }

  render() {
    if(this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.canciones}
          renderItem={({item}) =>
              <TouchableHighlight onPress={() => this.irACancion(item.id)}>
                   <Text style={styles.item}>{item.title}</Text>
              </TouchableHighlight>
            }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
