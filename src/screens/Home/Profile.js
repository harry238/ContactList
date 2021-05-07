import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    SafeAreaView,
    ScrollView,
    Platform,
    Keyboard
} from "react-native";
import { Header, Avatar, Divider, Button, Icon, Input } from "react-native-elements";
import MyFontsSize from '../../config/FontStyles'
import MYColors from '../../config/Colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { appStyles } from "../../config/AppStyle";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
    }
    componentDidMount(){
        this.load();
        this.props.navigation.addListener('tabPress', this.load)
    }
    load = () => {
        // console.log('load');
        this.setState({isEdit:false});
    }
    
    Logout() {
        Alert.alert("Hold On", "Are you sure you want to Logout?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => this.props.navigation.replace('Login') }
        ]);
    }
    render() {
        return (
            <>
                {/* <SafeAreaView> */}


                    {/* <View style={{ ...StyleSheet.absoluteFill, backgroundColor: MYColors.lightColor }}> */}
                    <Header
                        statusBarProps={{ barStyle: 'default', translucent: true }}
                        barStyle="default"
                        containerStyle={{ backgroundColor: MYColors.lightColor, height: 'auto', borderBottomColor: '#ccc' }}
                        centerComponent={{
                            text: 'Profile', style: {
                                fontSize: MyFontsSize.mediumMenu.fontSize,
                                // flex: 1,
                                width: wp('100%'),
                                textAlign: "center",
                                fontWeight: 'bold',
                                // textAlignVertical: 'center'
                            }
                        }}
                        rightComponent={
                            <Icon name={"sign-out"}
                                type='font-awesome'
                                onPress={() => {
                                    this.Logout();
                                }}
                                color={MYColors.hintDarkColor} />
                        }
                    />

                    {/* <KeyboardAwareScrollView
                        extraScrollHeight={hp('3%')}
                        // enableOnAndroid={true}

                        keyboardShouldPersistTaps='always'
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={hp('2%')}
                        extraHeight={hp('15%')}
                        resetScrollToCoords={{ x: 0, y: 0 }}
                    //  onKeyboardWillShow={this.onKeyboardWillShow.bind(this)}
                    //  onKeyboardWillHide={this.onKeyboardWillHide.bind(this)}
                    > */}
                        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                        <ScrollView
                            contentInsetAdjustmentBehavior="automatic"
                            style={appStyles.scrollView}>
                            <View style={{ justifyContent: 'flex-start', padding: wp('2%') }}>
                                <Avatar rounded title={global.UserDetails.name[0]}
                                    showAccessory={true}
                                    accessory={{
                                        size: null,
                                        iconName: 'mode-edit',
                                        iconType: 'material',
                                        iconColor: '#fff',
                                        underlayColor: '#000',
                                        style: {
                                            backgroundColor: MYColors.ButtonColor,
                                        }
                                    }}
                                    source={{ uri: global.UserDetails.profileImage }}
                                    containerStyle={{ alignSelf: 'center', padding: hp('2%') }} size={MyFontsSize.pageIcon.fontSize} />
                                {/* <Divider /> */}
                                {this.state.isEdit &&
                                    <>
                                        <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: hp('1%'), paddingHorizontal: wp('2%') }}>
                                            <Text style={styles.LabelText}>Name : </Text>

                                            <Input
                                                labelStyle={{ ...appStyles.labelInput }}
                                                inputContainerStyle={{ ...appStyles.formInput, borderWidth: 1, borderBottomWidth: 1, borderColor: MYColors.borderColor }}
                                                autoCorrect={false}
                                                // keyboardType=""
                                                defaultValue={global.UserDetails.name}
                                                maxLength={50}
                                                textContentType="givenName"
                                                placeholderTextColor={MYColors.placeholderTextColor}
                                                underlineColorAndroid={'transparent'}
                                                placeholder='Full Name'
                                            />
                                        </View>
                                        <Divider />
                                        <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: hp('1%'), paddingLeft: wp('2%') }}>
                                            <Text style={styles.LabelText}>User Name : </Text>

                                            <Input
                                                labelStyle={{ ...appStyles.labelInput }}
                                                inputContainerStyle={{ ...appStyles.formInput, borderWidth: 1, borderBottomWidth: 1, borderColor: MYColors.borderColor }}
                                                autoCorrect={false}
                                                // keyboardType=""
                                                defaultValue={global.UserDetails.userName}
                                                maxLength={12}
                                                textContentType="givenName"
                                                placeholderTextColor={MYColors.placeholderTextColor}
                                                underlineColorAndroid={'transparent'}
                                                placeholder='User Name'
                                            />
                                        </View>
                                        <Divider />
                                        <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: hp('1%'), paddingHorizontal: wp('2%') }}>
                                            <Text style={styles.LabelText}>About : </Text>

                                            <Input
                                                labelStyle={{ ...appStyles.labelInput }}
                                                // containerStyle={{ ...styles.textareaContainer, borderWidth: 1 }}
                                                inputStyle={{ ...styles.textarea, borderWidth: 1, borderColor: '#ccc', padding: wp('3%'), flex: 1 }}
                                                onChangeText={(text) => console.log('about edit')}
                                                defaultValue={global.UserDetails.about}
                                                maxLength={100}
                                                multiline
                                                numberOfLines={2}
                                                autoCapitalize="sentences"
                                                autoCorrect={false}
                                                placeholder='About'
                                                placeholderTextColor={MYColors.placeholderTextColor}
                                                underlineColorAndroid={'transparent'}
                                                inputContainerStyle={{ ...appStyles.formInput, borderWidth: 1, borderBottomWidth: 1, borderColor: MYColors.borderColor }}
                                            />
                                        </View>
                                        <Divider />

                                        <Button
                                            onPress={() => {
                                                console.log('Edit profile');
                                                this.setState({ isEdit: false });
                                            }}
                                            title='Submit'
                                            raised
                                            // icon={
                                            //     <Icon
                                            //         name="check-circle"
                                            //         size={MyFontsSize.largeIcon.fontSize}
                                            //         color={MYColors.lightColor}
                                            //     />
                                            // }
                                            // iconRight
                                            containerStyle={{ ...appStyles.submitButton, marginVertical: hp('2%') }}
                                            titleStyle={{ fontSize: MyFontsSize.xlargeText.fontSize }}
                                            buttonStyle={{ backgroundColor: MYColors.ButtonColor }}
                                        />
                                    </>
                                }
                                {!this.state.isEdit &&
                                    <>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: hp('3%'), paddingHorizontal: wp('2%') }}>
                                            <Text style={styles.LabelText}>Name : </Text>
                                            <Text style={styles.ValueText}>{global.UserDetails.name}</Text>
                                        </View>
                                        <Divider />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: hp('3%'), paddingHorizontal: wp('2%') }}>
                                            <Text style={styles.LabelText}>User Name : </Text>
                                            <Text style={styles.ValueText}>{global.UserDetails.userName}</Text>
                                        </View>
                                        <Divider />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: hp('3%'), paddingHorizontal: wp('2%') }}>
                                            <Text style={styles.LabelText}>About : </Text>
                                            <Text style={styles.ValueText}>{global.UserDetails.about}</Text>
                                        </View>
                                        <Divider />

                                        <Button
                                            onPress={() => {
                                                console.log('Edit profile');
                                                this.setState({ isEdit: true });
                                            }}
                                            title='Edit Profile'
                                            raised
                                            containerStyle={{ ...appStyles.submitButton, marginVertical: hp('2%') }}
                                            titleStyle={{ fontSize: MyFontsSize.xlargeText.fontSize }}
                                            buttonStyle={{ backgroundColor: MYColors.ButtonColor }}
                                        />
                                    </>
                                }
                            </View>
                            {/* </View> */}
                        </ScrollView>
                        {/* </TouchableWithoutFeedback> */}
                    {/* </KeyboardAwareScrollView> */}
                {/* </SafeAreaView> */}
            </>
        );
    }
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    LabelText: {
        // flex:1,
        fontSize: MyFontsSize.mediumText.fontSize,
        color: MYColors.formLabelText,
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
    ValueText: {
        // flex:1,
        fontSize: MyFontsSize.smallText.fontSize,
        color: MYColors.formText,
        textAlignVertical: 'center'
    },

    textareaContainer: {
        // height: hp('10%'),
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        // height: hp('10%'),
        // fontSize: MyFontsSize.xlargeText.fontSize,
        color: MYColors.formText,
    },
});