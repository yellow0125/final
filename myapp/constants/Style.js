
import { StyleSheet } from 'react-native'
import Colors from './Colors'
const container = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        flexDirection: 'row'
    },
    input: {
        flexWrap: "wrap"
    },
    containerPadding: {
        flex: 1,
        padding: 15
    },
    center: {
        flex: 1,
        backgroundColor: Colors.BgDarkGreen
    },
    horizontal: {
        flexDirection: 'row',
        display: 'flex',
    },
    form: {
        flex: 1,
        margin: 25
    },
    profileInfo: {
        padding: 25,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',

    },
    formCenter: {
        justifyContent: 'center',
        flex: 1,
        margin: 25
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        aspectRatio: 1 / 1,
    },
    fillHorizontal: {
        flexGrow: 1,
        paddingBottom: 0
    },
    imageSmall: {
        aspectRatio: 1 / 1,
        height: 70
    },
    gallery: {

        borderWidth: 1,
        borderColor: 'gray',
    },
    splash: {
        padding: 200,
        height: '100%',
        width: '100%'
    },
    chatRight: {
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'dodgerblue',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end'

    },
    chatLeft: {
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 8,
        alignItems: 'flex-end',
        textAlign: 'right',
        alignSelf: 'flex-start'
    },
    containerAdd: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingTop: 30,
    },

})

const form = StyleSheet.create({
    textInput: {
        marginBottom: 10,
        borderColor: 'gray',
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8
    },
    bottomButton: {
        alignSelf: 'center',
        alignContent: 'center',
        borderColor: Colors.White,
        borderBottomWidth: 1,
        padding: 10,
        textAlign: 'center',
        marginTop: 20,

    },
    roundImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2
    },
    button: {
        marginTop: 5,
    },
    image: {
        alignSelf: 'center',
        width: 300,
        height: 120,
        marginTop: 80,
        marginBottom: -120
    },
    uploadedImage: {
        marginLeft:30,
        width:200,
        height:150,
    },
    pictureButton: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2
    }

})

export { container, form }    