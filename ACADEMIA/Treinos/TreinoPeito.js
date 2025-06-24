
import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../controller';

export default function Peito() {
  const [imc, setIMC] = useState(null);
  const [exercicios, setExercicios] = useState([]);
  // Inicializa cargas com as chaves esperadas (exercicio_0, exercicio_1)
  const [cargas, setCargas] = useState({ 'exercicio_0': '', 'exercicio_1': '' });

  const userId = '0oe6DrubTl06ggMXc1b0';

  useEffect(() => {
    async function buscarDadosUsuario() { // Renomeado para melhor clareza
      const docRef = doc(db, 'usuarios', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dados = docSnap.data();
        console.log("IMC encontrado:", dados.IMC);
        setIMC(dados.IMC);

        let exercs = [];
        if (dados.IMC < 18.5) {
          exercs = [
            { nome: 'Flexão de braço', imagem: 'https://www.wikihow.com/images_en/thumb/6/63/Build-Muscle-Doing-Push-Ups-Step-2-Version-4.jpg/v4-460px-Build-Muscle-Doing-Push-Ups-Step-2-Version-4.jpg' },
            { nome: 'Pullover leve', imagem: 'https://www.wikihow.com/images/thumb/7/72/Do-a-Dumbbell-Pullover-Step-9.jpg/v4-460px-Do-a-Dumbbell-Pullover-Step-9.jpg' },
          ];
        } else if (dados.IMC >= 18.5 && dados.IMC < 30) {
          exercs = [
            { nome: 'Supino Reto', imagem: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/supino-reto.gif' },
            { nome: 'Crucifixo Reto', imagem: 'https://static.wixstatic.com/media/2edbed_6b44dde677364c4f937bb1ce55dcff60~mv2.gif/v1/fill/w_360,h_360,al_c,pstr/2edbed_6b44dde677364c4f937bb1ce55dcff60~mv2.gif' },
          ];
        } else {
          exercs = [
            { nome: 'Peito com faixa elástica', imagem: 'https://www.wikihow.com/images_en/thumb/5/51/Work-out-Pectoral-Muscles-With-a-Resistance-Band-Step-9-Version-3.jpg/v4-460px-Work-out-Pectoral-Muscles-With-a-Resistance-Band-Step-9-Version-3.jpg' },
            { nome: 'Elevação de braço sem peso', imagem: 'https://www.wikihow.com/images_en/thumb/2/28/Get-Rid-of-Flabby-Arms-Step-2-Version-3.jpg/v4-460px-Get-Rid-of-Flabby-Arms-Step-2-Version-3.jpg' },
          ];
        }
        setExercicios(exercs);

        // Carrega as cargas existentes do Firestore para os campos de input
        const loadedCargas = {
          'exercicio_0': dados['Carga exercicio 1'] ? dados['Carga exercicio 1'].toString() : '',
          'exercicio_1': dados['Carga exercicio 2'] ? dados['Carga exercicio 2'].toString() : '',
        };
        setCargas(loadedCargas);

      } else {
        console.log("Documento de usuário não encontrado");
        Alert.alert("Erro", "Documento de usuário não encontrado para carregar IMC e exercícios.");
      }
    }
    buscarDadosUsuario();
  }, []);

  const handleCargaChange = (text, index) => {
    setCargas(prevCargas => ({
      ...prevCargas,
      [`exercicio_${index}`]: text,
    }));
  };

  const handleConcluir = async () => {
    try {
      const docRef = doc(db, 'usuarios', userId);

      // Prepara os dados para serem salvos usando os nomes de campo FIXOS
      const dataToSave = {
        'Carga exercicio 1': parseFloat(cargas['exercicio_0']) || 0,
        'Carga exercicio 2': parseFloat(cargas['exercicio_1']) || 0,
      };

      await setDoc(docRef, dataToSave, { merge: true });

      console.log("Cargas salvas com sucesso no Firestore!", dataToSave);
      Alert.alert("Sucesso", "Cargas salvas com sucesso!");

    } catch (error) {
      console.error("Erro ao salvar as cargas no Firestore:", error);
      Alert.alert("Erro", "Não foi possível salvar as cargas. Tente novamente.");
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TREINO DE PEITO</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {imc !== null && (
          <View style={styles.imcContainer}>
            <Text style={styles.imcText}>Seu IMC: {imc.toFixed(2)}</Text>
          </View>
        )}
        {exercicios.length > 0 ? (
          exercicios.map((ex, index) => (
            <View key={index} style={styles.exercicioCard}>
              <View style={styles.exercicioInfo}>
                <Text style={styles.exercicioNome}>{ex.nome.toUpperCase()}</Text>
                <Image source={{ uri: ex.imagem }} style={styles.imagem} />
              </View>
              <View style={styles.cargaContainer}>
                <Text style={styles.cargaLabel}>Carga:</Text>
                <TextInput
                  style={styles.cargaInput}
                  onChangeText={(text) => handleCargaChange(text, index)}
                  value={cargas[`exercicio_${index}`]}
                  keyboardType="numeric"
                  placeholder="kg"
                />
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.loadingText}>Carregando exercícios...</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.concluirButton} onPress={handleConcluir}>
        <Text style={styles.concluirButtonText}>Concluir</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>©Copyright 2025</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    backgroundColor: 'black',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  imcContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  imcText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  exercicioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  exercicioInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exercicioNome: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 5,
    resizeMode: 'cover',
    marginLeft: 10,
  },
  cargaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cargaLabel: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: '500',
  },
  cargaInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  concluirButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  concluirButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    backgroundColor: '#F0F0F0',
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});
