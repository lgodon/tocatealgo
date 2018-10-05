import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import base64 from 'react-native-base64';
import { API_URL, API_USER, API_PASSWORD, OFFLINE } from './Config.js';

export default class HomeScreen extends Component {

  static navigationOptions = {
    headerTitle: 'tocate algo',
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      destacadas: [],
    };
  }

  componentDidMount() {
    if (OFFLINE) {
      return;
    }

    var headers = new Headers();
    headers.append('Accept-Encoding', 'gzip');
    headers.append('Authorization', 'Basic ' + base64.encode(API_USER + ":" + API_PASSWORD));

    return fetch(API_URL + 'destacadas', { headers: headers })
        .then((response) => response.json())
        .then((responseJson) => {
	    this.setState({
		      destacadas: responseJson,
	    }, function(){});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const hayDestacadas = this.state.destacadas.length > 0;
    return (
      <View>
        <TouchableHighlight
          style= {{ height: 140, margin: 15 }}
          onPress={() => { this.irAArtistas() } }>
          <Card>
            <CardTitle
              title='the sacados'
              style={{ backgroundColor: '#f06200' }}
              />
            <CardContent
              text='De ABBA a ZZ Top'
              style={{ alignItems: 'center' }} />
          </Card>
        </TouchableHighlight>

        { hayDestacadas  && <Destacadas destacadas={this.state.destacadas} /> }
      </View>
    );
  }

  irAArtistas() {
    return this.props.navigation.navigate('Artistas');
  }

  irADestacadas() {
    return this.props.navigation.navigate('Destacadas');
  }
}

class Destacadas extends Component {

  getCancionesDestacadas() {
    var d = '';
    this.props.destacadas.slice(0,5).map((destacada) =>
        d = d + destacada.title + '\n'
      );
    return d;
  }

  render() {
    return (
      <TouchableHighlight
        style= {{ height: 200, margin: 15 }} >
        <Card>
          <CardTitle
            title='destacadas'
            style={{ backgroundColor: '#f06200' }}
            />
          <CardContent
            text={ this.getCancionesDestacadas() }
            style={{ alignItems: 'center' }} />
        </Card>
      </TouchableHighlight>
    );
  }
}
