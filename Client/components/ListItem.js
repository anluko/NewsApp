import React, {useRef} from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ListItem( { listItem, deleteAlert, navigation } ) {

  return (
    <TouchableOpacity style = { styles.touchItem } onPress = { () => navigation.navigate('FullInfo', listItem) }>
        <View style = { styles.imageDelete }>
            <Image style = {styles.image} source={{ uri: listItem.Image }}/> 
            <MaterialCommunityIcons name = "delete" style = { styles.deleteBtn } size={ 34 } onPress = { () => deleteAlert(listItem.Id) } />
        </View>
        
        <View style = { styles.nameAnons }>
            <Text style = { styles.title }>{ listItem.Name }</Text>
            <Text ellipsizeMode = 'tail' style={ styles.anons }>{ listItem.Anons }</Text>
        </View>       
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchItem: {
    width: '100%',
    marginBottom: 30,
  },
  imageDelete: {
    flexDirection: 'row',
    alignItems: 'center',
  }, 
  image: {
    width: '90%',
    height: 200,
  },  
  deleteBtn: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameAnons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  anons: {
    fontFamily: 'mt-light',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 10,
    color: '#474747'
  },
  title: {
    fontFamily: 'mt-bold',
    fontSize: 22,
    textAlign: 'left',
    color: '#474747'
  },
});