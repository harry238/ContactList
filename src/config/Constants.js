/**
* @providesModule Constants
*/
import { Dimensions, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MyColors from './Colors';
let headerHeight  = 0;//= Platform.OS === 'ios' ? 66 : 46;
let footerHeight = hp('6%');
const constants = {
  headerHeight: headerHeight,
  footerHeight: footerHeight,
  viewHeight: hp('100%') - headerHeight,
  viewPadding: wp('3%'),
  defaultSpacer: hp('1%'),
  screenHeight: hp('100%'),
  screenWidth: wp('100%'),
  divider: {backgroundColor: MyColors.line},
  baseImageStyle: {flex: 1, width: undefined, height: undefined},
  viewMargin: wp('3%'),
  iconPadding: wp('1.5%'),

};
//let MyNavigation=null;
export default constants;