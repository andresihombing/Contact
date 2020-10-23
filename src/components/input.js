import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { Input, Item, Label } from 'native-base';

import GlobalStyle from '../style/globalStyle';

export const InputText = (props) => {
    return (
        <View>
            <Item style={[{ borderRadius: 5, marginTop: 6, zIndex: 2, width: props.width, borderWidth: 0.7, borderColor: props.errorName === '' ? props.color : 'red' }]} floatingLabel>
                <Label style={{ marginTop: 5, fontFamily: GlobalStyle.fontFamily, color: props.errorName != '' ? 'red' : props.color }}>{props.label} {props.required == true ? <Text style={{ color: '#EA4335' }}>*</Text> : null}</Label>
                <Input
                    value={props.value}
                    maxHeight={100}
                    maxLength={props.maxLength}
                    autoCapitalize={props.autoCapitalize}
                    multiline={props.multiline}
                    keyboardType={props.keyboardType}
                    onChangeText={(text) => props.onChangeText(text)}
                    style={{ color: props.color, height: props.height ? props.height : 55 }}
                    secureTextEntry={props.secureTextEntry}
                />
            </Item>
            {props.errorName ?
                <Text style={{ fontFamily: GlobalStyle.fontFamily, color: 'red', fontSize: 14, alignSelf: 'flex-end', marginTop: 5, marginBottom: 10 }} >{props.errorName}</Text>
                : null
            }
        </View>
    )
}
export default InputText;