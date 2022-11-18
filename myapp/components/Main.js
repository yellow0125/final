import React, { Component } from 'react'
import { View, Text } from "react-native";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';
import {container} from '../constants/Style'

export class Main extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  
    render() {
        const {currentUser} = this.props;
        if (currentUser ==undefined) {
          return <View style={container.formCenter}><Text>not user found</Text></View>
        }

    return (
        <View style={container.formCenter}>
            <Text> {currentUser.username} is Logined</Text>
        </View>
  )}
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({
    fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
