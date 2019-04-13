import { StyleSheet } from 'react-native';
import { margin } from '../../themes/BaseStyles';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    searchBarContainer: {
        backgroundColor: '#FEFEFE',
        borderTopWidth: 0,
        borderBottomColor: '#E0E0E0',
        height: 60,
    },
    searchBarInput: {
        backgroundColor: '#E0E0E0'
    },
    noResultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultItemSeparator: {
        height: 1,
        marginHorizontal: margin.md,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginTop: margin.md,
    }
});