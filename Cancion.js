import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Alert, View, ActivityIndicator } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import base64 from 'react-native-base64'
import { API_URL, API_USER, API_PASSWORD, OFFLINE } from './Config.js';

export default class Cancion extends Component {

	static navigtionOptions = {
		title: 'Beatles',
  };

	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			cancion:
			{
			   "id":315,
			   "artist_id":"5",
			   "title":"Do you want to know a secret?",
			   "body":"|Em| You’ll never know how much I |Am| really |Em| love you\r\n|G| You’ll never know how much I |F| really |B7| care\r\n\r\np((. |E| Listen, |G#m| |Gm| |F#m| do you |B7| want to know \r\na |E| secret? |G#m| |Gm| |F#m| ... Do you |B7| promise not to \r\n|E| tell? ... |G#m| |Gm| Oh, |F#m| oh, |C|oh...\r\n\r\np((. |E| Closer, |G#m| |Gm| |F#m| let me |B7| whisper \r\nin your |E| ear... |G#m| |Gm| |F#m| \r\nSay the |B7| words you long to |A| hear |B| \r\nI’m in love with |C#m| you... |F#m| Oooh... |B7| \r\n\r\np((. |E| Listen, |G#m| |Gm| |F#m| do you |B7| want to know \r\na |E| secret? |G#m| |Gm| |F#m| ... Do you |B7| promise not to \r\n|E| tell? ... |G#m| |Gm| Oh, |F#m| oh, |C|oh...\r\n\r\np((. |E| Closer, |G#m| |Gm| |F#m| let me |B7| whisper \r\nin your |E| ear... |G#m| |Gm| |F#m| \r\nSay the |B7| words you long to |A| hear |B| \r\nI’m in love with |C#m| you... |F#m| Oooh... |B7| \r\n\r\np((((. |A| I’ve known the |F#m| secret \r\nFor a |C#m| week or |Bm| two\r\n|A| Nobody |F#m| knows\r\n|C#m| just we |Bm| two |F#m| |B7| \r\n\r\np((. |E| Listen, |G#m| |Gm| |F#m| do you |B7| want to know \r\na |E| secret? |G#m| |Gm| |F#m| ... Do you |B7| promise not to \r\n|E| tell? ... |G#m| |Gm| Oh, |F#m| oh, |C|oh...\r\n\r\np((. |E| Closer, |G#m| |Gm| |F#m| let me |B7| whisper \r\nin your |E| ear... |G#m| |Gm| |F#m| \r\nSay the |B7| words you long to |A| hear |B| \r\nI’m in love with |C#m| you... |F#m| Oooh... |B7| \r\n|C#m| |F#m| Ooh... |B7| Ooh\r\n|C#m| |F#m| Ooh... |B7| Ooh _(desap.)_",
			   "created_at":"2018-08-01T20:04:10.354Z",
			   "updated_at":"2018-08-05T22:46:15.072Z",
			   "published":true,
			   "published_at":"2018-08-01T20:06:13.311Z",
			   "destacada":false,
			   "album_id":"4",
			   "track_number":"11",
			   "fijada":false
			}
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

		return fetch(API_URL + 'songs/' + this.props.navigation.state.params.idCancion, { headers: headers })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          cancion: responseJson,
        }, function(){

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

	onAcordePressed(acorde) {
		Alert.alert('Acá va el dibujo del acorde: ' + acorde.slice(1, -1));
	}

	renderAcorde(matchingString, matches) {
		return '  ' + matches[0].slice(1, -1) + '  ';
	}

	renderP(matchingString, matches) {
		return '     ';
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
			<ScrollView style={styles.container}>
				<Text style={styles.titulo}>{this.state.cancion.title}</Text>
				<ParsedText
					style={styles.texto}
					parse={
						[
							{pattern: /\|[a-zA-Z0-9#/]*\|/, style: styles.acorde, renderText: this.renderAcorde, onPress: this.onAcordePressed },
							{pattern: /p\(+./, renderText: this.renderP }
						]
					}
					>{this.state.cancion.body}</ParsedText>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8f9fa'
	},
  titulo: {
		fontFamily: 'sans-serif',
	  fontSize: 28,
		lineHeight: 80,
		color: '#f06200',
  },
	texto: {
		fontFamily: 'serif',
		fontSize: 18,
		lineHeight: 34,
		color: '#000000'
	},
  acorde: {
		fontWeight: 'bold',
	  backgroundColor: '#ffd1b3',
  	color: '#000000',
  }
});
