import { StyleSheet } from 'react-native';
import Colors from '../../bits/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headline: {
        width: 300,
        textAlign: 'center',
        marginBottom: 12,
        alignSelf: 'center',
        color: Colors.white,
    },
    text: {
        fontFamily: 'Nocturno Display Std',
        color: Colors.white,
        textAlign: 'center',
        alignSelf: 'center',
        marginHorizontal: 32,
        fontSize: 16,
        lineHeight: 18,
    },
    blackText: {
        color: Colors.black,
        fontSize: 20,
        lineHeight: 28,
        marginBottom: 24,
    },
    line: {
        backgroundColor: Colors.white,
        height: 1,
        width: 33,
        marginBottom: 12,
    },
    imageWrapper: {
        flexGrow: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginTop: 12,
    },
});

export default styles;
