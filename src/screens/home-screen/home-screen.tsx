import React, {Component} from 'react';
import { View, Text, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

import NavHeader from '../../components/NavHeader';
import WordCardComponent from '../../components/WordCardComponent';

import Api from '../../services/Api';
import Utils from '../../services/utils';

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
    onSearchBarChangedText = async (text) => {
        if(text == '') {
            await Utils.setStatePromise(this, {searchingWord: text, results: null});
        } else {
            await Utils.setStatePromise(this, {searchingWord: text});
            this.searchDefine();
        }
    }

    /**
     * Actions
     */
    async searchDefine() {
        try {
            const results = await this.getDefine(this.state.searchingWord);
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
        return(
            <WordCardComponent word={item}/>
        );
    }

    renderWordDefinationListSeparator = () => {
        return(<View style={styles.resultItemSeparator}/>);
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
                    ItemSeparatorComponent={this.renderWordDefinationListSeparator}
                    keyExtractor={(item, index) => item.defid + "_" + index}
                />
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Header */}
                <NavHeader
                    centerComponent={{ text: 'MY DICTIONARY', style: { color: '#fff' } }}
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