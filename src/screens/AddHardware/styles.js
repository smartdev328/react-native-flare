import { StyleSheet } from 'react-native';
import Colors from '../../bits/Colors';

const styles = StyleSheet.create({
    line: {
        backgroundColor: Colors.black,
        height: 1,
        width: 33,
    },
    helpLine: {
        backgroundColor: Colors.theme.cream,
        height: 1,
        width: 33,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.theme.cream,
    },
    helpContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    pager: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 32,
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
        marginTop: 12,
        color: Colors.black,
        fontFamily: 'Nocturno Display Std',
    },
    helpText: {
        color: Colors.black,
        fontSize: 16,
        marginBottom: 18,
    },
    centerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    spacer: {
        flexGrow: 1,
    },
    headline: {
        width: 233,
        textAlign: 'center',
        marginBottom: 12,
        alignSelf: 'center',
        color: Colors.black,
    },
    connectSubhead: {
        textAlign: 'center',
        marginBottom: 16,
        alignSelf: 'center',
        color: Colors.black,
    },
    image: {
        width: 220,
        height: 196,
    },
    spacedButton: {
        marginBottom: 12,
    },
    whiteText: {
        color: Colors.theme.cream,
    },
    whiteLine: {
        backgroundColor: Colors.theme.cream,
    },
    bottomSheet: {
        backgroundColor: Colors.theme.cream,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignSelf: 'stretch',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 24,
    },
});

export default styles;
