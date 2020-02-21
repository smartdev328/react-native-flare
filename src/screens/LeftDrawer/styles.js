import { StyleSheet } from 'react-native';
import Colors from '../../bits/Colors';
import { LEFT_NAVIGATION_WIDTH } from '../../constants/Config';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.theme.cream,
        paddingHorizontal: 32,
        width: LEFT_NAVIGATION_WIDTH,
        justifyContent: 'flex-end',
    },
    menuItem: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        height: 36,
        alignItems: 'center',
    },
    padded: {
        marginTop: 36,
    },
    menuItemIcon: {
        width: 36,
        height: 36,
        resizeMode: 'center',
        marginRight: 12,
        tintColor: Colors.theme.cream,
    },
    menuItemText: {
        fontSize: 18,
        color: Colors.theme.cream,
    },
});

export default styles;
