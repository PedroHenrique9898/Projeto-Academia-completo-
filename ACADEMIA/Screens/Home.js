import { View, Text, StyleSheet, Image, Button, ScrollView} from 'react-native';

export default function Home() {
    return(
        <View style={styles.container}>

            <View style={styles.title}>
                <Text style={styles.titletxt}> Bem-vindo! </Text>
            </View>

            <View style={styles.txt}>
                <Text> ✅ Aula grátis, sem enrolação, só resultado. </Text>
                <Text> ✅ Estrutura moderna em Criciúma. </Text>
                <Text> ✅ Treinadores que vivem o que ensinam. </Text>
                <Text> ✅ Escolha sua modalidade e descubra seu potencial. </Text>
            </View>

            <Image style={styles.img} source={require('../assets/homeimg.png')} />

        </View>
    )
}

const styles =  StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
    },
    title:{
        backgroundColor: 'black',
        marginBottom: 20,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    titletxt:{
        color: 'white',
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    txt:{
        alignSelf: 'center',
        padding: 20,
    },
    img:{
        width: 300,
        height: 200,
        alignSelf: 'center',
        marginTop: 30,
    }
})