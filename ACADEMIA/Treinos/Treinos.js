import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity} from 'react-native';
import { db } from '../controller';
import { collection, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';


export default function Treinos({navigation}){ 
  return(
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.titulo}>TREINOS</Text>
      <Text style={styles.txtprincipal}>TREINOS DE ACORDO COM SEU PERFIL</Text>

      <Text style={styles.treino1}>Peito</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Peito')}> 
        <Text style={styles.button1}>Acessar</Text>
      </TouchableOpacity>

      <Text style={styles.treino2}>Braço</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Braco')}> 
        <Text style={styles.button2}>Acessar</Text>
      </TouchableOpacity>

      <Text style={styles.treino3}>Perna</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Perna')}>
        <Text style={styles.button3}>Acessar</Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo:{
    top: 50,
    fontSize: 30,
    backgroundColor: 'black',
    padding: 10,
    color: 'white',
    width: '100%',
    textAlign:'center',
    alignSelf: 'center'
  },
  txtprincipal:{
    top: 130,
    fontSize: 20,
    backgroundColor: '#e5e5e5',
    padding: 10,
    height: 45,
  },
  treino1:{
    top: 170,
    fontSize: 20,
    backgroundColor: '#e5e5e5',
    padding: 20,
    width: 200,
    borderRadius: 7
  },
  button1:{
    top: 120,
    backgroundColor: 'black',
    padding: 10,
    left: 40,
    color: 'white',
    borderRadius: 7
  },
  treino2:{
    top: 170,
    fontSize: 20,
    backgroundColor: '#e5e5e5',
    padding: 20,
    width: 200,
    borderRadius: 7
  },
  button2:{
    top: 120,
    backgroundColor: 'black',
    padding: 10,
    left: 40,
    color: 'white',
    borderRadius: 7
  },
  treino3:{
    top: 170,
    fontSize: 20,
    backgroundColor: '#e5e5e5',
    padding: 20,
    width: 200,
    borderRadius: 7
  },
  button3:{
    top: 120,
    backgroundColor: 'black',
    padding: 10,
    left: 40,
    color: 'white',
    borderRadius: 7
  },

})