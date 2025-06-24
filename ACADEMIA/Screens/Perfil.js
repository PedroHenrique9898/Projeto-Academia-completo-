import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from './UserProvider';

export default function Perfil({navigation}) {
    const { perfilUsuario, usuario } = useUser();

    const getClassificacaoIMC = (imc) => {
        if (imc < 18.5) return 'Abaixo do peso';
        if (imc < 25) return 'Peso normal';
        if (imc < 30) return 'Sobrepeso';
        return 'Obesidade';
    };

    if (!perfilUsuario) {
        return (
            <View style={styles.container}>

                <View style={styles.title}>
                    <Text style={styles.titletxt}> Meu Perfil </Text>
                </View>

                <Text style={styles.infoCard}>🚫 Nenhum perfil cadastrado.</Text>
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('CadastroPerfil')}
                >
                    <Text style={styles.buttontxt}> Editar Informações </Text>
                </TouchableOpacity>

            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.title}>
                <Text style={styles.titletxt}> Meu Perfil </Text>
            </View>
            
            <View style={styles.infoCard}>
                <Text style={styles.label}>✅ Email:</Text>
                <Text style={styles.value}>{usuario?.email}</Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.label}>✅ Nome:</Text>
                <Text style={styles.value}>{perfilUsuario.nome}</Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.label}>✅ Idade:</Text>
                <Text style={styles.value}>{perfilUsuario.idade} anos</Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.label}>✅ Altura:</Text>
                <Text style={styles.value}>{perfilUsuario.altura} cm</Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.label}>✅ Peso Atual:</Text>
                <Text style={styles.value}>{perfilUsuario.pesoAtual} kg</Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.label}>✅ IMC:</Text>
                <Text style={styles.value}>
                    {perfilUsuario.imc} - {getClassificacaoIMC(perfilUsuario.imc)}
                </Text>
            </View>

            {perfilUsuario.nivel && (
                <View style={styles.infoCard}>
                    <Text style={styles.label}>✅ Nível:</Text>
                    <Text style={styles.value}>{perfilUsuario.nivel}</Text>
                </View>
            )}

            {perfilUsuario.objetivo && (
                <View style={styles.infoCard}>
                    <Text style={styles.label}>✅ Objetivo:</Text>
                    <Text style={styles.value}>{perfilUsuario.objetivo}</Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CadastroPerfil')}
            >
                <Text style={styles.buttontxt}> Editar Informações </Text>
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
    infoCard:{
        margin: 10,
        borderWidth: 1,
        borderBlockColor: 'black',
        padding: 10,
        flexDirection: 'row',
    },
    label:{
        fontWeight: 'bold',
    },
    value:{
        marginLeft: 5,
    },
    button:{
        margin: 10,
        marginTop: 30,
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