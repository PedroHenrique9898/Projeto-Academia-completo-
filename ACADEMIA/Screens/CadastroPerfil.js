import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { useUser } from './UserProvider';

export default function CadastroPerfil({navigation}) {
    const { salvarPerfilUsuario, perfilUsuario } = useUser();
    
    const [nome, setNome] = useState(perfilUsuario?.nome || "");
    const [idade, setIdade] = useState(perfilUsuario?.idade?.toString() || "");
    const [altura, setAltura] = useState(perfilUsuario?.altura?.toString() || "");
    const [pesoAtual, setPesoAtual] = useState(perfilUsuario?.pesoAtual?.toString() || "");
    const [nivel, setNivel] = useState(perfilUsuario?.nivel || "");
    const [objetivo, setObjetivo] = useState(perfilUsuario?.objetivo || "");

    const calcularIMC = (peso, altura) => {
        if (peso && altura) {
            const alturaMetros = altura / 100;
            return (peso / (alturaMetros * alturaMetros)).toFixed(2);
        }
        return "";
    };

    const SalvarPerfil = async () => {
        if (!nome || !idade || !altura || !pesoAtual) {
            console.log("Erro. Preencha todos os campos obrigatórios.");
            return;
        }

        const idadeNum = parseInt(idade);
        const alturaNum = parseFloat(altura);
        const pesoNum = parseFloat(pesoAtual);

        if (isNaN(idadeNum) || isNaN(alturaNum) || isNaN(pesoNum)) {
            console.log("Erro. Insira valores numéricos válidos.");
            return;
        }

        const imc = calcularIMC(pesoNum, alturaNum);

        const dadosPerfil = {
            nome,
            idade: idadeNum,
            altura: alturaNum,
            pesoAtual: pesoNum,
            imc: parseFloat(imc),
            nivel,
            objetivo
        };

        const sucesso = await salvarPerfilUsuario(dadosPerfil);
        
        if (sucesso) {
            navigation.goBack()
        } else {
            console.log("Erro. Tente novamente.");
        }
    };

    return(
        <View style={styles.container}>

            <View style={styles.title}>
                <Text style={styles.titletxt}> Atualizar Perfil </Text>
            </View>
            
            <TextInput
                style={styles.txtinput}
                placeholder="Nome *"
                value={nome}
                onChangeText={setNome}
            />
            
            <TextInput
                style={styles.txtinput}
                placeholder="Idade *"
                value={idade}
                onChangeText={setIdade}
                keyboardType="numeric"
            />
            
            <TextInput
                style={styles.txtinput}
                placeholder="Altura (cm) *"
                value={altura}
                onChangeText={setAltura}
                keyboardType="numeric"
            />
            
            <TextInput
                style={styles.txtinput}
                placeholder="Peso atual (kg) *"
                value={pesoAtual}
                onChangeText={setPesoAtual}
                keyboardType="numeric"
            />
            
            <TextInput
                style={styles.txtinput}
                placeholder="Nível de experiência (Iniciante, Intermediário...)"
                value={nivel}
                onChangeText={setNivel}
            />
            
            <TextInput
                style={styles.txtinput}
                placeholder="Objetivo (Emagrecimento, Ganho de massa...)"
                value={objetivo}
                onChangeText={setObjetivo}
                multiline={true}
                numberOfLines={3}
            />

            {altura && pesoAtual && (
                <Text style={styles.imcText}>
                    IMC Calculado: {calcularIMC(parseFloat(pesoAtual), parseFloat(altura))}
                </Text>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={SalvarPerfil}
            >
                <Text style={styles.buttontxt}> Salvar Perfil </Text>
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
    txtinput:{
        margin: 10,
        borderWidth: 1,
        borderBlockColor: 'black',
        padding: 10,
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
    },
    imcText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})