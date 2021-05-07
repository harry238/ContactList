
import {
    StyleSheet, Dimensions
} from "react-native";

import MyConstant from './Constants'
import MyFontsSize from './FontStyles'
import MyColors from './Colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const appStyles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        backgroundColor: '#fff',
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: '#fff',
        // width: Dimensions.get("window").width,
        // height: Dimensions.get("window").height,
        width: MyConstant.screenWidth,
        height: MyConstant.screenHeight,
        // flex: 1,
        // flexDirection: "column",
        // alignContent:'space-between',
        // justifyContent:"space-around"
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        // flex:1,
        fontSize: 70,
        fontWeight: 'bold',
        color: 'black',
        textAlign: "center",
        // textAlignVertical:'top'
    },
    sectionDescription: {
        marginVertical: 8,
        fontSize: 30,
        fontWeight: '400',
        color: '#000',
        textAlign: "center"
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: '#000',
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    container: {
        flex: 1,
        // paddingTop:-ExtraDimensions.getStatusBarHeight(),
        // marginBottom: ExtraDimensions.getSoftMenuBarHeight(),
        // width: MyConstant.screenWidth,
        // height: MyConstant.screenHeight,// - ExtraDimensions.getSoftMenuBarHeight(),
        backgroundColor: '#fff'//'#ebebeb'
    },
    labelInput: {
        color: '#a1a1a1',
        // fontSize: MyFontsSize.smallText.fontSize, //13
    },

    formInput: {
        borderRadius: 5,
        borderWidth: 1.5,
        borderBottomWidth: 1.5,
        borderColor: MyColors.formText,
        marginVertical: 8
        // width: 250
    },

    input: {
        borderWidth: 0,
        // fontSize: MyFontsSize.smallText.fontSize,
        color: '#373A3C',
    },
    submitButton:{
        backgroundColor: MyColors.ButtonColor, 
        // borderRadius:wp('1%'),
        width: wp('60%'), 
        alignSelf: "center", 
        // elevation: 5
    },

    textareaContainer: {
        height: hp('10%'),
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height:  hp('10%'),
        fontSize: 14,
        color: '#333',
    },

});
