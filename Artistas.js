import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import base64 from 'react-native-base64'
import { API_URL, API_USER, API_PASSWORD, OFFLINE } from './Config.js';

export default class ArtistasScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      artistas: [
        { id: 5, name: 'The Beatles' },
        { id: 59, name: 'The Kinks' }
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

    return fetch(API_URL + 'artists', { headers: headers })
        .then((response) => response.json())
        .then((responseJson) => {
	    this.setState({
	        isLoading: false,
		      artistas: responseJson,
	    }, function(){});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  irACanciones(idArtista) {
    return this.props.navigation.navigate('Canciones', { idArtista: idArtista });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

	return (
      <View style={styles.container}>
        <FlatList
          data={this.state.artistas}
          renderItem={({item}) =>
              <TouchableHighlight onPress={() => this.irACanciones(item.id)}>
                   <Text style={styles.item}>{item.name}</Text>
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
