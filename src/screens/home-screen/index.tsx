import React, {Component} from 'react';
import { View, Text, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

import NavHeader from '../../components/NavHeader';

import Api from '../../services/Api';

import styles from './styles';
import { IDefineResult } from '../../interfaces/intefaces';

interface Props {}

interface HomeScreenState {
    searchingWord: string;
    searchResult: IDefineResult;
}

export default class HomeScreen extends Component<Props, any> {
    // config header
    static navigationOptions = {
        header: null,
    };

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            searchingWord: '',
            results: null
        };
    }
    
    /**
     * Event Handlers
     */
    onSearchBarChangedText = (text) => {
        this.setState({searchingWord: text});
        this.searchDefine();
    }

    /**
     * Actions
     */
    async searchDefine() {
        try {
            const results = this.getDefine(this.state.searchingWord);
            this.setState({results: results});
        } catch(e) {
            console.log('[searchDefine] Error: ', e);
        } finally {

        }
    }

    /**
     * Apis
     */
    async getDefine(word) {
        try { 
            const defineResponse: IDefineResult = await Api.getDefine({
                term: word
            });
            console.log(defineResponse);
            return defineResponse;
        } catch(e) {
            throw e;
        }
    }

    /**
     * Render
     */
    renderWordDefinationListItem = ({item}) => {
        console.log('[renderWordDefinationListItem] item: ', item);
        return(
            <View>
                <Text>1</Text>
            </View>
        );
    }


    renderDefination = () => {
        if(!this.state.results) {
            return(
                <View style={styles.noResultContainer}>
                    <Text>No Results</Text>
                </View>
            );
        } else {
            return(
                <FlatList
                    data={this.state.results.list}
                    renderItem={this.renderWordDefinationListItem}
                />
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Header */}
                <NavHeader
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                />

                {/* Search Bar */}
                <SearchBar
                    placeholder={"Search..."}
                    onChangeText={this.onSearchBarChangedText}
                    value={this.state.searchingWord}
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBarInput}
                    round
                />

                {/* Results List */}
                {this.renderDefination()}
            </View>
        );
    }
}