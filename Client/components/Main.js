import React, { useState, useEffect  } from 'react';
import { Text, View, Modal, StyleSheet, FlatList, Pressable, ScrollView, Alert } from 'react-native';
import { gStyle } from '../styles/style';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import axios from 'axios';
import Form from './Form';
import ListItem from './ListItem';

export default function Main({ navigation }) {

  const [articles, setArticles] = useState([ ])

  const [modelWindow, setModelWindow] = useState(false)

  const addArticle = async (article) => {
    try {
      const response = await axios.post('http://192.168.1.7:8080/addArticle', article);
      console.log('Ответ сервера:', response.data);
    } catch (error) {
      console.error('Ошибка при добавлении статьи:', error);
    }
    
    setArticles((list) => {
      return [
        ...list,
        article 
      ]
    })
    setModelWindow(false);
  };

  const deleteAlert = (id) => Alert.alert("Удаление", "Вы действительно хотите удалить статью?", [
    {text: "Да", onPress: () => deleteArticle(id)},
    {text: "Нет", }
  ]); 

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://192.168.1.7:8080/deleteArticle/${id}`);
      setArticles((prevArticles) => prevArticles.filter(article => article.Id !== id));
      console.log('Удаление успешно');
    } catch (error) {
      console.error('Ошибка при удалении статьи:', error);
    }
  }

  useEffect(() => {
    axios.get('http://192.168.1.7:8080/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style = { [gStyle.main, styles.mainView] } animationTyp = 'slide'>
      <Modal  visible = { modelWindow } transparent = {true} animationType='slide'> 
        <BlurView intensity = { 60 } blurReductionFactor = {4} tint='systemMaterial' style = {styles.modalContainer}>
          <View style = { styles.addView }>  
            <ScrollView justifyContent = 'center' contentContainerStyle = { styles.scrollViewContent }>
              <Form addArticle = { addArticle } />
              <Pressable style = { styles.buttonCancel } onPress = { () => setModelWindow(false) }>
                  <Text style = { styles.buttonCancelText }>Отменить</Text>
              </Pressable>
            </ScrollView>
          </View>
        </BlurView>
      </Modal>  

      <FlatList data={ articles } renderItem={ ({ item }) => (
        <ListItem listItem = { item } deleteAlert = { deleteAlert } navigation = { navigation }/>
      )} />

      <Ionicons name = "add-circle" size={52} style = { styles.iconAdd } onPress = { () => setModelWindow(true) }/>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    paddingRight: 0
  },
  header: {
    marginBottom: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  addView: {
    marginHorizontal: 20,
    backgroundColor: '#f2f0f0',
    borderRadius: 15,
    justifyContent: 'center',
    height: '60%',
    overflow: 'hidden',
  },
  scrollViewContent: {
    padding: 20,
    backgroundColor: '#f2f0f0',
  },
  iconAdd: {
    textAlign: 'right',
    color: "red",
    bottom: 20, 
    right: 20,
    zIndex: 1,
    position: 'absolute',
  },
  iconClose: {
    textAlign: 'center',
    marginTop: 30,
    color: "red" 
  },
  buttonCancel: {
    width: '*',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: 'red',
    borderWidth: 1,
    marginTop: 15,
    elevation: 3,
    marginHorizontal: 15,
    backgroundColor: 'white'
  },
  buttonCancelText: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'red',
  },
});