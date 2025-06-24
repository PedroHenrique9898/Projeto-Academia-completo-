import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../controller';

export default function Braco() {
  const [imc, setIMC] = useState(null);
  const [exercicios, setExercicios] = useState([]);
  // Inicializa cargas com as chaves esperadas (exercicio_0, exercicio_1)
  const [cargas, setCargas] = useState({ 'exercicio_0': '', 'exercicio_1': '' });

  const userId = '0oe6DrubTl06ggMXc1b0';

  useEffect(() => {
    async function buscarDadosUsuario() {
      const docRef = doc(db, 'usuarios', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dados = docSnap.data();
        console.log("IMC encontrado:", dados.IMC);
        setIMC(dados.IMC);

        let exercs = [];
        if (dados.IMC < 18.5) {
          exercs = [
            { nome: 'Rosca Direta (Halteres Leves)', imagem: 'https://static.wixstatic.com/media/2edbed_7dd9c239a6c64ea4ae493c8cecc5d547~mv2.jpg/v1/fill/w_980,h_804,al_c,q_85,enc_avif,quality_auto/2edbed_7dd9c239a6c64ea4ae493c8cecc5d547~mv2.jpg' },
            { nome: 'Tríceps Coice (Corpo)', imagem: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpnFf53kM5vfRXw3_gd5lpa3jk4lY6hXk50NghBWS7r86rfrNbtl5AfI2rtrxeTAL-Mt8CI0BTMi389mCC3cJvz9Vhrhd-QjpcqXFLGLdCXg9CwwiNE7kRsAgiqvayODBXGvQzHxLbUaLP/s1600/Triceps-coice.jpg' },
          ];
        } else if (dados.IMC >= 18.5 && dados.IMC < 30) {
          exercs = [
            { nome: 'Bíceps com Barra W', imagem: 'https://static.wixstatic.com/media/2edbed_36fea38c2b104f078e2c76d5c3c63e24~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2edbed_36fea38c2b104f078e2c76d5c3c63e24~mv2.jpg' },
            { nome: 'Tríceps Testa', imagem: 'https://www.wikihow.com/images_en/thumb/5/5c/Work-the-Medial-Head-of-Your-Tricep-Step-6.jpg/v4-460px-Work-the-Medial-Head-of-Your-Tricep-Step-6.jpg' },
          ];
        } else {
          exercs = [
            { nome: 'Elevação Frontal (Sem Pesos)', imagem: 'https://www.hipertrofia.org/blog/wp-content/uploads/2018/09/elevacao-frontal-no-cabo.gif' },
            { nome: 'Bíceps Concentrado (Faixa Elástica)', imagem: 'https://www.wikihow.com/images_en/thumb/f/f7/Do-Bicep-Curl-Resistance-Band-Exercises-Step-7-Version-2.jpg/v4-460px-Do-Bicep-Curl-Resistance-Band-Exercises-Step-7-Version-2.jpg' },
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

      console.log("Cargas de braço salvas com sucesso no Firestore!", dataToSave);
      Alert.alert("Sucesso", "Cargas de braço salvas com sucesso!");

    } catch (error) {
      console.error("Erro ao salvar as cargas de braço no Firestore:", error);
      Alert.alert("Erro", "Não foi possível salvar as cargas de braço. Tente novamente.");
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TREINO DE BRAÇO</Text>
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