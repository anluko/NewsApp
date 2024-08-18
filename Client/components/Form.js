import React, {useState} from 'react';
import { Button, View,StyleSheet, Pressable, TextInput, Text, Image } from 'react-native';
import { gStyle } from '../styles/style';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';

export default function Form( {addArticle}) {
  
  const [selectedImage, setSelectedImage] = useState(null);
  
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
    <View>
        <Formik 
            initialValues = {{ Name: '', Anons: '', Description: '', Image: '' }} 
            onSubmit = {( values, action ) => {
                values.Image = selectedImage;
                addArticle(values);
                action.resetForm();
                selectedImage(null);
        }}>
            {(props) => (
                <View>
                    <Text style = { styles.titleAdd }> Добавить статью </Text>
                    <TextInput
                        style={styles.input}
                        value={props.values.Name} 
                        multiline
                        placeholder = 'Введите название' 
                        placeholderTextColor={'grey'}
                        onChangeText={ props.handleChange('Name') } />
                    <TextInput 
                        style={styles.input}
                        value={props.values.Anons} 
                        multiline
                        placeholder = 'Введите анонс' 
                        placeholderTextColor={'grey'}
                        onChangeText={ props.handleChange('Anons') } />
                    <TextInput 
                        style={styles.input}
                        value={props.values.Description} 
                        multiline
                        place
                        placeholderTextColor={'grey'}
                        placeholder = 'Введите статью' 
                        onChangeText={ props.handleChange('Description') } />

                    <Text style = {styles.pickImg} onPress={pickImage}>Выбрать изображение</Text>
                    {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage}/>}

                    <Pressable style = { styles.buttonAdd } onPress = { props.handleSubmit }>
                        <Text style = { styles.buttonAddText }>Добавить</Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: 'silver',
        marginTop: 15, 
        padding: 10,
        marginHorizontal: 15
    },
    titleAdd: {
        fontFamily: 'mt-bold',
        fontSize: 22,
        textAlign: 'left',
        marginHorizontal: 15,
        color: '#474747'
    },
    pickImg: {
        marginTop: 15, 
        padding: 10,
        marginHorizontal: 15,
        fontSize: 16,
        color: '#4065f7'
    },
    buttonAdd: {
        width: '*',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 6,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 15,
        elevation: 3,
        marginHorizontal: 15,
        backgroundColor: '#eb5d3d'
    },
    buttonAddText: {
        fontSize: 14,
        lineHeight: 15,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    selectedImage: {
        marginHorizontal: 15,
        width: 150,
        height: 100,
        marginTop: 10,
    }
})