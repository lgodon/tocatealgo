import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';

export default class ArtistasScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistas: [
        { id: 5, name: 'The Beatles' },
        { id: 59, name: 'The Kinks' }
      ]
    }
  }

  irACanciones(idArtista) {
    return this.props.navigation.navigate('Canciones', { idArtista: idArtista });
  }

  render() {
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
