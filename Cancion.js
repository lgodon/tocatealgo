import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Alert, View, ActivityIndicator, Image, Button, TouchableHighlight } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import base64 from 'react-native-base64'
import { API_URL, API_USER, API_PASSWORD, OFFLINE } from './Config.js';

class CancionTitle extends React.Component {
  render() {
    return (
			<Text></Text>
    );
  }
}

export default class CancionScreen extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: <CancionTitle />,
			headerRight: (
				<View style={{ flexDirection: 'row'}}>
					<TouchableHighlight onPress={navigation.getParam('playPauseScroll')}>
						<Image
							source={require('./img/playpause.png')}
							style={{ width: 30, height: 30, marginRight:30 }}
						/>
					</TouchableHighlight>
					<TouchableHighlight onPress={navigation.getParam('achicarLetra')}>
			      <Image
			        source={require('./img/font_dec.png')}
			        style={{ width: 30, height: 30, marginRight:10 }}
			      />
					</TouchableHighlight>
					<TouchableHighlight onPress={navigation.getParam('agrandarLetra')}>
						<Image
							source={require('./img/font_inc.png')}
							style={{ width: 30, height: 30, marginRight:20 }}
						/>
					</TouchableHighlight>
				</View>
			)
		}
  };

	constructor(props) {
		super(props);

		this.autoScroll = this.autoScroll.bind(this);

		this.scroller = React.createRef();

		this.state = {
			letraSize: 16,
			isLoading: true,
			isScrolling: false,
			currentScrollerPosition: 0,
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
		this.props.navigation.setParams({ achicarLetra: this._achicarLetra.bind(this) })
		this.props.navigation.setParams({ agrandarLetra: this._agrandarLetra.bind(this) })
		this.props.navigation.setParams({ playPauseScroll: this._playPauseScroll.bind(this) })

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

	componentWillUnmount() {
		clearInterval(this.activeInterval);
	}

	_agrandarLetra() {
		this.setState({ letraSize: this.state.letraSize + 1 });
	}

	_achicarLetra() {
		this.setState({ letraSize: this.state.letraSize - 1 });
	}

	_playPauseScroll() {
		this.setState({ isScrolling: !this.state.isScrolling });
		if (this.state.isScrolling) {
			this.activeInterval = setInterval(() => {
				position = this.state.currentScrollerPosition + 3;
				this.scroller.current.scrollTo({ y: position, animated: false });
				this.setState({ currentScrollerPosition: position });
			}	, 100);
		} else {
			clearInterval(this.activeInterval);
		}
	}

	autoScroll() {
		position = this.state.currentScrollerPosition + 1;
		this.scroller.current.scrollTo({ y: position, animated: true });
    this.setState({ currentScrollerPosition: position });
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

	textStyle() {
		return {
			fontSize: this.state.letraSize,
			lineHeight: 24,
		}
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
			<View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
			<ScrollView style={styles.container}
				ref={this.scroller} >
				<Text style={styles.titulo}>{this.state.cancion.title}</Text>
				<ParsedText
					style={styles.textoColor, this.textStyle()}
					parse={
						[
							{pattern: /\|[a-zA-Z0-9#/]*\|/, style: styles.acorde, renderText: this.renderAcorde, onPress: this.onAcordePressed },
							{pattern: /p\(+./, renderText: this.renderP }
						]
					}
					>{this.state.cancion.body}</ParsedText>
			</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 15,
	},
  titulo: {
		fontFamily: 'sans-serif',
	  fontSize: 28,
		lineHeight: 42,
		color: '#f06200',
		marginTop: 20,
		marginBottom: 30,
  },
	textoColor: {
		fontFamily: 'serif',
		color: '#000000'
	},
  acorde: {
		fontWeight: 'bold',
	  backgroundColor: '#ffd1b3',
  	color: '#000000',
  }
});
