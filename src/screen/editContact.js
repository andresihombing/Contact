import React, {Component} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, LayoutAnimation, ScrollView } from 'react-native'
import GlobalStyle from "../style/globalStyle";
import Input from "../components/input";
import ENV from "./../../env";
import { connect } from 'react-redux';
import * as contactActions from '../actions/contact';
import { bindActionCreators } from 'redux';
import { Spinner} from "native-base";

class EditContact extends Component {  
    constructor(props){
        super(props);                
        this.state ={
            firstname: this.props.item.firstName,
            firstnameError: '',
            lastname: this.props.item.lastName,
            lastnameError: '',
            age: this.props.item.age,
            ageError: '',
            photo: this.props.item.photo,
            photoError: ''
        }
    }

    //validasi form
    validateData() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (!this.state.firstname) {
            this.setState({ firstnameError: "Please insert your first name !" });
            return false
        } else if(!this.state.lastname) {
            this.setState({ lastnameError: "Please insert your last name !" });
            return false
        } else if(!this.state.age) {
            this.setState({ ageError: "Please insert your age !" });
            return false
        } else if(!this.state.photo) {
            this.setState({ photoError: "Please insert your photo !" });
            return false
        } else {
            return true
        }
    }

    //api update list
    updateList(){
        let { actions } = this.props;
        let urlFetch = ENV.API_BASE_URL + `/contact`
        fetch(urlFetch,
            {
                method: 'GET',                
            }).then((response) => response.json()).then(async (responseJson) => {
                actions.changeContact(responseJson.data);
                this.setState({ isSpinner: false, isRefresh: false });
            }).catch((error) => {                
                console.log(error)
                this.setState({ isSpinner: false, isRefresh: false });
            });
    }

    //api update contact
    submitEdit() {        
        if (this.validateData()) {            
            this.setState({ isSpinner: true });
            let urlFetch = ENV.API_BASE_URL + `/contact/${this.props.item.id}`
            fetch(urlFetch,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',                        
                    },
                    body: JSON.stringify({
                        'firstName' : this.state.firstname,
                        'lastName' : this.state.lastname,
                        'age' : this.state.age,
                        'photo' : this.state.photo
                    })
                }).then((response) => response.json()).then(async (responseJson) => {
                    this.updateList()
                    this.props.navigation.navigate('listContact')
                }).catch((error) => {
                    this.setState({ isSpinner: true })
                    console.log(error)
                });
        }
    }
    
    render() {        
        return (
            <View style={GlobalStyle.fill}>
                <ScrollView>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image
                                style={styles.image}                    
                                source={
                                    require("../images/back.jpeg")}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Edit Contact</Text>
                    <View style={styles.input}>
                        <Input
                            value={this.state.firstname}
                            errorName={this.state.firstnameError}
                            width={"100%"}
                            label={"First Name"}
                            color={'gray'}
                            autoCapitalize={"none"}
                            keyboardType={"default"}
                            onChangeText={text => {
                                this.setState({ firstname: text, firstnameError: "" });
                                LayoutAnimation.configureNext(
                                    LayoutAnimation.Presets.easeInEaseOut
                                );
                            }}
                        />
                        <View style={styles.space}/>
                        <Input
                            value={this.state.lastname}
                            errorName={this.state.lastnameError}
                            width={"100%"}
                            label={"Last Name"}
                            color={'gray'}
                            autoCapitalize={"none"}
                            keyboardType={"default"}
                            onChangeText={text => {
                                this.setState({ lastname: text, lastnameError: "" });
                                LayoutAnimation.configureNext(
                                    LayoutAnimation.Presets.easeInEaseOut
                                );
                            }}
                        />
                        <View style={styles.space}/>
                        <Input
                            value={String(this.state.age)}
                            errorName={this.state.ageError}
                            width={"100%"}
                            label={"Age"}
                            color={'gray'}
                            autoCapitalize={"none"}
                            keyboardType={"numeric"}
                            onChangeText={text => {
                                this.setState({ age: text, ageError: "" });
                                LayoutAnimation.configureNext(
                                    LayoutAnimation.Presets.easeInEaseOut
                                );
                            }}
                        />
                        <View style={styles.space}/>
                        <Input
                            value={this.state.photo}
                            errorName={this.state.photoError}
                            width={"100%"}
                            label={"Photo"}
                            color={'gray'}
                            autoCapitalize={"none"}
                            keyboardType={"default"}
                            onChangeText={text => {
                                this.setState({ photo: text, photoError: ""});
                                LayoutAnimation.configureNext(
                                    LayoutAnimation.Presets.easeInEaseOut
                                );
                            }}
                        />
                        <TouchableOpacity style={styles.buttonSave} onPress={() => this.submitEdit()}>
                            <Text style={styles.textButton}>
                            {this.state.isSpinner == true ? (
                                <Spinner
                                    color={"white"}
                                    size="small"
                                    style={styles.spinner}
                                />
                                ) : 'Save'
                            }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            
        );
    }
}

const mapStateToProps = state => ({
    listContact: state.contact.listContact,
    indexList: state.contact.indexList,
    item: state.contact.item
});  

const ActionCreators = Object.assign(
    {},
    contactActions,
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),    
});
  
export default connect(mapStateToProps, mapDispatchToProps)(EditContact)

const styles = StyleSheet.create({    
    header:{
        backgroundColor: GlobalStyle.orange,        
        padding: 10
    },
    title:{
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',        
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 35
    },
    input:{
        padding: 10,
        top: -20
    },
    space:{
        height: 10
    },
    buttonSave:{
        backgroundColor: GlobalStyle.orange,
        marginTop: 40,
        borderRadius: 10
    },
    textButton:{
        color: GlobalStyle.white,
        padding: 10,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    //spinner
    spinner:{ 
        alignSelf: "center", 
        height: 20 
    }
});
