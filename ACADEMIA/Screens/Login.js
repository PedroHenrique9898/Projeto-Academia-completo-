import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { auth } from '../controller';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({navigation}) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const VerificarCadastro = () => {
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            navigation.navigate('TelaHome')
        })
        .catch((error) => {
            console.log('Erro.', error.message);
        });
    }

    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={require('../assets/image.png')} />

            <TextInput
                style={styles.txtinput}
                placeholder='E-mail'
                value = {email} onChangeText={setEmail}
                placeholderTextColor={'BLACK'}
            />

            <TextInput 
                style={styles.txtinput}
                placeholder='Senha'
                value = {senha}
                onChangeText={setSenha}
                placeholderTextColor={'BLACK'}
            />
            
            <TouchableOpacity
                style={styles.button}
                onPress={VerificarCadastro}
            >
                <Text style={styles.buttontxt}> Login </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={()=>navigation.navigate('Cadastro')}
            >
                <Text style={styles.buttontxt}> Cadastrar-se </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles =  StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    logo:{
        width: 350,
        height: 350,
        alignSelf: 'center'
    },
    txtinput:{
        margin: 10,
        borderWidth: 1,
        borderBlockColor: 'black',
        padding: 10,
    },
    button:{
        margin: 10,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 50,
        width: 200,
        alignSelf: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttontxt:{
        color: 'white',
        alignSelf: 'center',
    }
})