import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableHighlight, Alert } from 'react-native';

export default class CancionesScreen extends Component {

  constructor(props) {
    super(props);

    if (this.props.navigation.state.params.idArtista == 5) {
      this.state = {
        canciones: [
          { id: 341, name: 'If I fell' },
          { id: 752, name: 'It\'s only love' },
          { id: 706, name: 'Words of love' },
        ]
      }
    } else if (this.props.navigation.state.params.idArtista == 59) {
      this.state = {
        canciones: [
          { id: 104, name: 'Waterloo sunset' },
        ]
      }
    }
  }

  irACancion(idCancion) {
    return this.props.navigation.navigate('Cancion', { idCancion: idCancion });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.canciones}
          renderItem={({item}) =>
              <TouchableHighlight onPress={() => this.irACancion(item.id)}>
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
