import { StyleSheet } from 'react-native';
import Colors from '../../bits/Colors';

const styles = StyleSheet.create({
    line: {
        backgroundColor: Colors.white,
        height: 1,
        width: 33,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#A8A8A8',
    },
    pager: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 20,
    },
    noBottomMargin: {
        marginBottom: 0,
    },
    marginLine: {
        marginVertical: 10,
        marginHorizontal: 8,
    },
    subhead: {
        fontSize: 20,
        lineHeight: 22,
        color: Colors.white,
        fontFamily: 'Nocturno Display Std',
    },
    helpText: {
        color: Colors.white,
        fontSize: 16,
        marginBottom: 18,
    },
});

export default styles;
