import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Alert
} from "react-native";
import { Header, ListItem, Icon, Badge, Avatar, Button, CheckBox, Divider, Input } from "react-native-elements";
import {
    HeaderSearchBar,
    HeaderClassicSearchBar
} from "react-native-header-search-bar";
import MyFontsSize from '../../config/FontStyles'
import MYColors from '../../config/Colors'
// import DummyData from '../../config/DummyData'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Searchbar, FAB } from "react-native-paper";
import { appStyles } from "../../config/AppStyle";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { connect } from "react-redux";

class ContactListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            groupSelection: [],
        }
        this.bottomSheet = React.createRef();
    }
    componentDidMount() {
        console.log(11);
        this.props.dispatch();
        fetchUserList();
        console.log(12);
        // this.load();
    }
    load = () => {
        // console.log('load');
        this.setState({
            searchQuery: '',
            groupSelection: [],
        });
    }

    setSearchQuery(searchQuery) {
        this.setState({ searchQuery })
    }

    renderRow(contacts, index) {

        return (
            <TouchableOpacity activeOpacity={0.5} onLongPress={() => {
                Alert.alert(
                    "Alert Title",
                    "My Alert Msg",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => this.props.deleteUser(contacts.id) }
                    ]
                );
            }} onPress={() => {
                this.setState({
                    UserDetails: contacts
                });
                this.bottomSheet.current.show()
            }}>
                <View style={{ flex: 1, flexDirection: 'row', paddingRight: wp('2%') }}>
                    <Avatar rounded title={contacts.name[0]} source={{ uri: "https://randomuser.me/api/portraits/" + (contacts.id % 2 == 0 ? "women/" : "men/") + contacts.id + ".jpg" }} containerStyle={{ padding: hp('1%') }} size="large" />
                    <View style={{ borderBottomWidth: 1, borderColor: "#ccc", paddingVertical: hp('1%'), flex: 1, flexDirection: 'row' }}>
                        <View style={{ marginLeft: wp('2%'), flex: 1 }}>
                            <Text style={{ fontSize: MyFontsSize.largeText.fontSize, fontWeight: 'bold' }}>{contacts.name}</Text>
                            <Text numberOfLines={1} style={{ fontSize: MyFontsSize.smallText.fontSize, color: MYColors.formLabelText }}>{contacts.phone}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    render() {
        const { UserDetails } = this.state;
        const { DummyData } = this.props;

        const onChangeSearch = query => this.setSearchQuery(query);
        return (
            <>
                <View style={{ ...StyleSheet.absoluteFill, backgroundColor: MYColors.lightColor }}>
                    <Header
                        statusBarProps={{ barStyle: 'default', translucent: true }}
                        barStyle="default"
                        containerStyle={{ backgroundColor: MYColors.lightColor, height: 'auto', borderBottomColor: '#ccc' }}
                        centerComponent={{
                            text: 'Contact List', style: {
                                fontSize: MyFontsSize.smallMenu.fontSize,
                                // flex: 1,
                                width: wp('100%'),
                                textAlign: "center",
                                fontWeight: 'bold'
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
                    <Searchbar
                        style={{ paddingHorizontal: wp('1%'), borderTopWidth: 0, borderBottomLeftRadius: wp('5%'), borderBottomRightRadius: wp('5%') }}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={this.state.searchQuery}
                    />
                    {DummyData && DummyData.length > 0 && <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                        <FlatList
                            data={DummyData}
                            ref={(ref) => { this.flatListRef = ref; }}
                            onContentSizeChange={() => { this.flatListRef.scrollToIndex({ animated: true, index: 0 }); }}
                            onLayout={() => { this.flatListRef.scrollToIndex({ animated: true, index: 0 }); }}
                            initialScrollIndex={0}
                            extraData={this.state.groupSelection}
                            listKey={(item, index) => 'D' + index.toString()}
                            renderItem={({ item, index }) => this.renderRow(item, index)}
                            numColumns={1}
                        />
                    </View>}
                    <BottomSheet hasDraggableIcon ref={this.bottomSheet} height={600} >
                        {UserDetails && <ScrollView
                            contentInsetAdjustmentBehavior="automatic"
                            style={appStyles.scrollView}>
                            <View style={{ justifyContent: 'flex-start', paddingHorizontal: wp('2%'), paddingHorizontal: wp('5%') }}>
                                <Avatar rounded title={UserDetails.name[0]}
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
                                    source={{ uri: "https://randomuser.me/api/portraits/" + (UserDetails.id % 2 == 0 ? "women/" : "men/") + UserDetails.id + ".jpg" }}
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
                                                defaultValue={UserDetails.name}
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
                                                defaultValue={UserDetails.email}
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
                                                // defaultValue={UserDetails.address.street + ", " + UserDetails.address.suite + ", " + UserDetails.address.city + "- " + UserDetails.address.zipcode}
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
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: hp('3%'), paddingHorizontal: wp('3%') }}>
                                            <Text style={styles.LabelText}>Name : </Text>
                                            <Text style={styles.ValueText}>{UserDetails.name}</Text>
                                        </View>
                                        <Divider />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: hp('3%'), paddingHorizontal: wp('3%') }}>
                                            <Text style={styles.LabelText}>User Name : </Text>
                                            <Text style={styles.ValueText}>{UserDetails.email}</Text>
                                        </View>
                                        <Divider />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: hp('3%'), paddingHorizontal: wp('3%') }}>
                                            <Text style={styles.LabelText}>About : </Text>
                                            <Text style={styles.ValueText}>{UserDetails.address.street + ", " + UserDetails.address.suite + ", " + UserDetails.address.city + "- " + UserDetails.address.zipcode}</Text>
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
                        </ScrollView>}
                    </BottomSheet>
                </View>
            </>
        );
    }
}

function mapStateToProps(state) {
    const { DummyData } = state;
    // console.log("DATA: " + JSON.stringify(DummyData))
    return {
        DummyData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // fetchUserList: () => dispatch({ type: 'FETCH_USER_LIST' }),
        fetchProductsBegin: () => dispatch({ type: 'FETCH_PRODUCTS_BEGIN' }),
        fetchProductsSuccess: (users) => dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: { users } }),
        fetchProductsFailure: (error) => dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: { error } }),
        deleteUser: (id) => dispatch({ type: 'DELETE_USER', payload: { id } }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactListScreen);

function fakeGetProducts() {
    var promise = fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(
            result => {
                console.log(1);
                DummyData = result;
                console.log(0);
            },
            error => {
                console.log(error);
            }
        );
    return promise;
}

function fetchUserList() {
    console.log(13);
    return dispatch => {
        console.log(1);
        dispatch(fetchProductsBegin());
        return fakeGetProducts()
            .then(
                users => {
                    console.log(1);
                    dispatch(fetchProductsSuccess(users));
                    return users;
                },
                error => {
                    dispatch(fetchProductsFailure(error))
                }
            );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fab: {
        backgroundColor: MYColors.ButtonColor,
        position: 'absolute',
        marginHorizontal: wp('3%'),
        marginVertical: wp('1%'),
        right: 0,
        bottom: 0,
    },
});