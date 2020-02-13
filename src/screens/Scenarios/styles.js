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
        color: Colors.theme.cream,
    },
    text: {
        fontFamily: 'Nocturno Display Std',
        color: Colors.theme.cream,
        textAlign: 'center',
        alignSelf: 'center',
        marginHorizontal: 32,
        fontSize: 16,
        lineHeight: 18,
    },
    deviceActionText: {
        fontFamily: 'Nocturno Display Std',
        color: Colors.theme.cream,
        textAlign: 'center',
        alignSelf: 'center',
        marginHorizontal: 32,
        fontSize: 20,
        lineHeight: 28,
        marginBottom: 60,
    },
    deviceActionTextSquashed: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    line: {
        backgroundColor: Colors.theme.cream,
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
    warning: {
        alignSelf: 'stretch',
        marginTop: 'auto',
        padding: 24,
        backgroundColor: '#1e1d2a',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    warningText: {
        color: Colors.theme.cream,
        fontSize: 14,
    },
});

export default styles;
