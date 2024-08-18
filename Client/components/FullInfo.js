import React, {useState} from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { gStyle } from '../styles/style';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function FullInfo({ route }) {

  const [modelWindow, setModelWindow] = useState(true);
  const [redactWindow, setRedactWindow] = useState(false);
  const [imageTouchable, setImageTouchable] = useState(false); 
  const [saveBtnVisibility, setSaveBtnVisibility] = useState(false); 
  const [editBtnVisibility, setEditBtnVisibility] = useState(true); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedName, setEditedName] = useState(route.params.Name);
  const [editedDescriptopn, setEditedDescriptopn] = useState(route.params.Description);

  const editArticle = () => {
    setModelWindow(false);
    setRedactWindow(true);
    setImageTouchable(true);
    setSaveBtnVisibility(true);
    setEditBtnVisibility(false);
  };

  const saveEditArticle = (id) => {
    setModelWindow(true);
    setRedactWindow(false);
    setImageTouchable(false);
    setSaveBtnVisibility(false);
    setEditBtnVisibility(true);

    try {
      axios.put(`http://192.168.1.7:8080/editArticle/${id}`, {
        name: editedName,
        description: editedDescriptopn,
        image: selectedImage
      })
      .then(response => {
        console.log('Статья обновлена:', response.data);
      })
    } catch (error) {
      console.error('Ошибка при изменение статьи:', error);
    }
  };

  const handleNameChange = (text) => {
    setEditedName(text);
  };
  
  const handleDescriptionChange = (text) => {
    setEditedDescriptopn(text);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}> 
      <View style = { [gStyle.main, styles.main] }>
        
        <TouchableOpacity 
            style = { styles.imageOpacity } 
            disabled = { !imageTouchable } 
            onPress = { pickImage }>
            {selectedImage ? (
              <Image style={styles.image} source={{ uri: selectedImage }} />
            ) : (
              <Image style={styles.image} source={{ uri: route.params.Image }} />
            )}
        </TouchableOpacity>
        
        {modelWindow && (<View style = { styles.loadInfo }>   
          {editedName ? (
            <Text style = { [gStyle.title, styles.header] }>{ editedName }</Text>   
          ) : (
            <Text style = { [gStyle.title, styles.header] }>{ route.params.Name }</Text>   
          )}
          {editedDescriptopn ? (
            <Text style = { styles.full }>{ editedDescriptopn }</Text>
          ) : (
            <Text style = { styles.full }>{ route.params.Description }</Text>   
          )}  
        </View>)}

          {redactWindow && (<View style = {styles.editInfo}>   
            <View style = { styles.editTitleView }> 
              <MaterialIcons style = { styles.editTitleIcon } name="title" size={24}/>
              <TextInput 
                style = { styles.inputTitle } 
                defaultValue = { route.params.Name } 
                multiline ss
                placeholder = 'Введите название'
                placeholderTextColor = {'grey'}
                onChangeText = { handleNameChange } /> 
            </View>
            <View style = { styles.editTitleView }> 
              <MaterialIcons name = "description" style = {styles.editTitleIcon} size = {24} />
              <TextInput 
                style = { styles.inputFull }
                defaultValue = { route.params.Description } 
                multiline 
                placeholder = 'Введите описание' 
                placeholderTextColor = {'grey'}
                onChangeText = { handleDescriptionChange } /> 
            </View>             
          </View>)}

          {editBtnVisibility && (<TouchableOpacity style = {styles.editBtn} onPress = { editArticle  }>
            <FontAwesome6 name="edit" style = {styles.editIcon} size = {24} />
            <Text style = {styles.editText}>Изменить</Text>
          </TouchableOpacity>)}
          {saveBtnVisibility && (<TouchableOpacity style = {styles.saveBtn} onPress = { () => saveEditArticle(route.params.Id) }>
            <FontAwesome6 name="edit" style = {styles.saveIcon} size = {24} />
            <Text style = {styles.saveText}>Сохранить</Text>
          </TouchableOpacity>)}
        </View>
      </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center'
  },
  loadInfo: {
    alignItems: 'stretch'
  },
  editInfo: {
    
  },
  full: {
    fontFamily: 'mt-light',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 20, 
    color: 'grey'
  },
  header: {
    fontSize: 25,
    alignItems: 'left',
    textAlign: 'left',
    marginTop: 25
  },
  imageOpacity: {
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: 200,
  },
  editBtn: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '50%',
    padding: 10,
    borderColor: '#eb5d3d',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
  },
  saveBtn: {
    backgroundColor: '#eb5d3d',
    flexDirection: 'row',
    width: '50%',
    padding: 10,
    borderColor: '#eb5d3d',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
  },
  editIcon: {
    color: "#eb5d3d",
    marginLeft: 5
  },
  saveIcon: {
    color: "white",
    marginLeft: 5
  },
  editText: {
    fontSize: 16,
    fontFamily: 'mt-bold',
    marginLeft: 30,
    textAlign: 'center',
    color: '#eb5d3d'
  },
  saveText: {
    fontSize: 16,
    fontFamily: 'mt-bold',
    marginLeft: 20,
    textAlign: 'center',
    color: 'white'
  },
  editTitleView: {
    marginTop: 10, 
    padding: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'silver',
  },
  editTitleIcon: {
    marginRight: 10,
    marginTop: 10
  },
  inputTitle: {
    fontStyle: 'mt-light',
    fontSize: 25,
    color: 'black'
  },
  inputFull: {
    fontStyle: 'mt-light',
    fontSize: 16,
  },
})