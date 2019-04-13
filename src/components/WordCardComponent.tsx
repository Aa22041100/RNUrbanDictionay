import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import Icon from 'react-native-vector-icons/Ionicons';

import { IDefineWord } from '../interfaces/intefaces';

import { colors, padding, margin } from '../themes/BaseStyles';

export interface WordCardComponentProp {
    word: IDefineWord;
}

export default class WordCardComponent extends Component<WordCardComponentProp, any> {
    /** 
     * Event Handlers
     */
    onPlayAudioClicked = async () => {
        this.setState({isPlaying: true});
        try {
            SoundPlayer.playUrl(this.props.word.sound_urls[0]);
        } catch(e) {
            console.log(e);
        }
    }

    /**
     * Render
     */
    render() {
        const cannotPlaySound = this.props.word.sound_urls.length <= 0;
        return(
            <View style={styles.cardContainer}>
                <View style={styles.wordWrapper}>
                    <TouchableOpacity disabled={cannotPlaySound} style={!cannotPlaySound ? styles.playClipWrapper : {...styles.playClipWrapper, ...styles.disabledStyle}} onPress={this.onPlayAudioClicked}>
                        <Icon name={"md-volume-high"} size={24}/>
                    </TouchableOpacity>
                    <Text style={styles.word}>{this.props.word.word}</Text>
                    <TouchableOpacity style={styles.bookmarkWrapper}>
                        <Icon name={"md-star"} size={24}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.defination}>{this.props.word.definition}</Text>
                <View style={styles.exampleWrapper}>
                    <View style={styles.exampleDecoration} />
                    <Text style={styles.example} numberOfLines={3}>{this.props.word.example}</Text>
                </View>
                <Text>author: {this.props.word.author}</Text>
                <Text>written_on: {this.props.word.written_on}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    disabledStyle: {
        opacity: 0.3,
    },

    cardContainer: {
        margin: margin.sm,
    },
    wordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    playClipWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: margin.md,
    },
    bookmarkWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: margin.md,
    },
    word: {
        paddingVertical: padding.md,
        textAlign: 'center',
        fontSize: 24,
    },
    defination: {
        fontSize: 14,
        fontWeight: '100',
        flexWrap: 'wrap'
    },
    exampleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: margin.sm,
    },
    exampleDecoration: {
        width: 5,
        height: 50,
        borderRightWidth: 5,
        borderRightColor: '#999',
        marginRight: margin.md,
    },
    example: {
        flexWrap: 'wrap'
    },
});