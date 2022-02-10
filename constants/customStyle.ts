import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
    logo: {
        height: 50,
        width: 150,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.LightBlack,
    },
    button: {
        marginTop: 20,
        borderRadius: 8,
        padding: 10,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: colors.Black,
    },
    buttonText: {
        color: colors.White,
        fontSize: 20
    },
    picker: {
        marginVertical: 30,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
    },
    modalContent: {
        width: '100%',
        height: '30%',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    modalView: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    modalContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    label: {
        fontSize: 17,
        marginVertical: 5,
        color: 'white',
    },
    selectBox: {
        marginTop: 5,
        borderRadius: 2,
        padding: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: colors.White,
    },
    selectBoxText: {
        color: colors.Black,
        fontSize: 20
    },
    h5: {
        fontSize: 25, color: colors.White
    },
    formControl: {
        width: '90%',
        minHeight: 100,
    },
    disabledFormControl: {
        width: '90%',
        minHeight: 80,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
    },
    inputDisabled: {
        backgroundColor: 'rgba(256,256,256,0.1)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0,
        borderRadius: 2,
        fontSize: 20,
        color: '#fff'
    },
    warning: {
        color: colors.Yellow,
        fontWeight: 'bold',
    }
});

export default styles;