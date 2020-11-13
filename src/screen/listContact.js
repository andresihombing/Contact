import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, LayoutAnimation, RefreshControl } from 'react-native'
import GlobalStyle from "../style/globalStyle";
import ENV from "./../../env";
import * as contactActions from '../actions/contact';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Icon} from "native-base";
import { Overlay } from 'teaset';

class ListContact extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            isSpinner: true,            
            isRefresh: false,            
        }
    }

    componentDidMount(){
        this.getList()
    }

    refreshControl = () => {
        this.setState({ isRefresh: true, isSpinner: true }, () =>
            this.getList()
        );
    };

    // warning delete
    alert(id){
        let overlayView = (
            <Overlay.View
                animated={true}
                style={{ flex: 1, justifyContent: 'center' }}
                ref={v => (this.overlayPopViewRefCode = v)}
            >
                <View style={styles.alertContainer}>
                    <View style={styles.warning} >                        
                        <Text style={styles.textWarning} >Are you sure you want to delete the contact ?</Text>
                    </View>                    
                    <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity onPress={() => this.overlayPopViewRefCode.close()}
                            style={styles.buttonClose}>
                            <Text style={styles.textCancel}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {                            
                                this.deleted(id)
                                this.overlayPopViewRefCode.close()
                            }}
                            style={styles.buttonDelete}>
                            <Text style={styles.textDelete}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </Overlay.View>
        );
        Overlay.show(overlayView);
    }

    // api get list contact
    getList(){
        this.setState({isRefresh: true})
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

    // api delete contact
    deleted(id){        
        let urlFetch = ENV.API_BASE_URL + `/contact/${id}`
        fetch(urlFetch,
            {
                method: 'DELETE',
            }).then((response) => response.json()).then(async (responseJson) => {
                console.log(responseJson)
            }).catch((error) => {
                console.log('error')
                console.log(error)
            });
    }

    // view button update delete
    listAction(index) {        
        const {indexList, actions} = this.props        
        if (indexList == index) {
            actions.changeIndexList(null);
        } else {
            actions.changeIndexList(index);
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    // update redux
    editContact(item){
        const {actions} = this.props
        actions.changeItem(item)
        this.props.navigation.navigate('editContact')
    }

    // view list contact
    renderListCard(item, index){        
        return(
            <View style={styles.listView}>
                <TouchableOpacity style={styles.listContact} onPress={() => this.listAction(index)}>                
                    <Image
                        style={styles.image}                    
                        source={
                            item.photo !== 'N/A' ? {uri: item.photo} : require("../images/person.jpeg")}
                    />
                    <View style={styles.text}>
                        <Text style={styles.nameText}>{item.firstName} {item.lastName}</Text>
                        <Text style={styles.yearsText}>age {item.age} years</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    {
                        this.props.indexList == index ? 
                        <Card style={styles.card}>                            
                            <TouchableOpacity style={styles.edit} 
                                onPress={() => this.editContact(item)}>
                                <Text style={styles.textButton}>Edit</Text> 
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.del} 
                                onPress={() => this.alert(item.id)}>
                                <Text style={styles.textButton}>Delete</Text> 
                            </TouchableOpacity>
                        </Card>
                        : null
                    }
                </View>
            </View>
        )
    }

    // view empty contact
    ListEmptyComponent() {
        return (
            <View style={styles.empty} >
                <Text style={styles.textEmpty}>Empty Contact</Text>
            </View>
        )
    }
  
    render() {        
        return (
            <View style={GlobalStyle.fill}>                
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Contact</Text>
                </View>                
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefresh}
                                onRefresh={this.refreshControl}
                            />
                        }
                        data={this.props.listContact}                    
                        renderItem={({ item, index }) => this.renderListCard(item, index)}
                        ListEmptyComponent={() => this.ListEmptyComponent()}
                        // keyExtractor={(i, x) => `${x}`}                    
                    />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('addContact')} style={styles.add}>
                        <Image
                            style={styles.image}                    
                            source={
                                require("../images/add.png")}
                        />
                    </TouchableOpacity>                
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ListContact)

const styles = StyleSheet.create({       
    //headers
    header:{
        backgroundColor: GlobalStyle.orange,        
    },
    textHeader:{
        fontSize: 25,
        padding: 10,
        fontWeight: 'bold',
        color: GlobalStyle.white
    },
    // view empty
    empty:{
        padding: 50
    },
    textEmpty:{
        textAlign: 'center',
        fontSize: 20,
        color: GlobalStyle.lightGray
    },
    textCenter:{
        textAlign :'center',
        fontSize: 40,        
    },
    // view list
    listView:{
        borderBottomColor: GlobalStyle.black,
        borderBottomWidth: 0.5
    },
    listContact:{
        padding: 10,
        flexDirection: 'row',        
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 60
    },
    text:{
        flexDirection: 'column'
    },
    nameText:{
        color: GlobalStyle.orange,
        fontSize: 17,
        fontWeight: 'bold',
        paddingLeft: 20
    },
    yearsText:{
        color: GlobalStyle.lightGray,
        fontSize: 14,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 7
    },
    // view update delete
    card:{
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10
    },
    edit:{
        backgroundColor: GlobalStyle.blue,
        width: '45%',
        borderRadius: 5,        
    },
    del:{
        backgroundColor: GlobalStyle.red,
        width: '45%',
        borderRadius: 5
    },
    add:{
        top: '85%',
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingRight: 10
    },
    textButton:{
        color: GlobalStyle.white,
        padding: 5,
        textAlign: 'center'
    },
    // alert
    alertContainer:{
        backgroundColor: 'white', 
        alignSelf: 'center', 
        margin: 10, 
        borderRadius: 10, 
        padding: 20, 
        width: '80%' 
    },
    warning:{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        width: '100%' 
    },
    textWarning:{ 
        fontFamily: GlobalStyle.fontFamily, 
        fontSize: 18, 
        color: '#E60008', 
        fontWeight: 'bold', 
        textAlign: 'center'
    },
    buttonClose:{
        backgroundColor: GlobalStyle.lightGray, 
        width:'35%', 
        borderRadius: 10
    },
    textCancel:{
        textAlign:'center' ,
        color:'white', 
        fontWeight:'bold', 
        padding: 10
    },
    buttonDelete:{
        backgroundColor: '#E60008', 
        width:'35%', 
        borderRadius: 10
    },
    textDelete:{
        textAlign:'center',
        color:'white', 
        fontWeight:'bold', 
        padding: 10
    }
});