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
        fontSize: 20,
        marginVertical: 8,
        color: 'white',
    },
    selectBox: {
        marginTop: 5,
        borderRadius: 2,
        padding: 10,
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
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 2,
        paddingVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
    },
    h5: {
        fontSize: 25, color: colors.White
    }
});

export default styles;