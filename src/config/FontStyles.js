/**
 * @providesModule TextStyles
 */
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fonts from './Fonts';
const xlargeText = wp('4.8%');//20;
const largeText = wp('4.4%');//16;
const mediumText = wp('4%');//14;
const smallText = wp('3.2%');//12;
const xsmallText = wp('2.8%');//9;
const xxsmallText = wp('2%');//7;
const smallMenu = wp('8%');//30;
const mediumMenu = wp('10%');///40;
const largMenu = wp('12%');//50;
const smallIcon = wp('4.8%');//16;
const largeIcon = wp('6%');//25;
const avatar = wp('20%');//25;
const pageIcon = wp('32%');//25;
const regularText = fonts.openSansRegular;
const semiboldText = fonts.openSansSemibold;
const boldText = fonts.openSansBold;
const textStyles = StyleSheet.create({
  xlargeText: {
    fontFamily: regularText,
    fontSize: xlargeText
  },
largeText: {
    fontFamily: regularText,
    fontSize: largeText
  },
  largeTextSemibold: {
    fontFamily: semiboldText,
    fontSize: largeText
  },
  mediumText: {
    fontFamily: regularText,
    fontSize: mediumText
  },
  mediumTextSemibold: {
    fontFamily: semiboldText,
    fontSize: mediumText
  },
  mediumTextBold: {
    fontFamily: boldText,
    fontSize: mediumText
  },
  smallText: {
    fontFamily: regularText,
    fontSize: smallText
  },
  smallTextSemibold: {
    fontFamily: semiboldText,
    fontSize: smallText
  },
  xsmallText: {
    fontFamily: regularText,
    fontSize: xsmallText
  },
  xxsmallTextSemibold: {
    fontFamily: semiboldText,
    fontSize: xsmallText
  },xxsmallText: {
    fontFamily: regularText,
    fontSize: xxsmallText
  },
  xxsmallTextSemibold: {
    fontFamily: semiboldText,
    fontSize: xxsmallText
  },
  smallMenu:{
    fontSize: smallMenu
  },
  mediumMenu:{
    fontSize: mediumMenu
  },
  largMenu:{
    fontSize: largMenu
  },
  smallIcon:{
    fontSize: smallIcon
  },
  largeIcon:{
    fontSize: largeIcon
  },
  avatar:{
    fontSize: avatar
  },
  pageIcon:{
    fontSize: pageIcon
  },
});
export default textStyles;