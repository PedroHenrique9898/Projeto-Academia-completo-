import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "../controller";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// contexto
const UserContext = createContext();

export function UserProvider({children}){
    const [perfilUsuario, setPerfilUsuario] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [carregandoPerfil, setCarregandoPerfil] = useState(true);

    // escuta o login do usuário e carrega o perfil correto
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUsuario(user);
            setCarregandoPerfil(true);

            if (user) {
                try {
                    const docRef = doc(db, 'perfis', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setPerfilUsuario(docSnap.data());
                    } else {
                        setPerfilUsuario(null);
                    }
                } catch (error) {
                    console.log('Erro ao carregar perfil do Firebase:', error);
                    setPerfilUsuario(null);
                }
            } else {
                setPerfilUsuario(null);
            }

            setCarregandoPerfil(false);
        });

        return () => unsubscribe();
    }, []);

    // função para salvar e atualizar perfil do usuário
    const salvarPerfilUsuario = async (dadosPerfil) => {
        if (!usuario) return;

        try {
            const docRef = doc(db, 'perfis', usuario.uid);
            const dadosCompletos = {
                ...dadosPerfil,
                email: usuario.email,
                userId: usuario.uid,
            };
            
            await setDoc(docRef, dadosCompletos);
            setPerfilUsuario(dadosCompletos);
            console.log('Perfil salvo com sucesso!');
            return true;
        } catch (error) {
            console.log('Erro ao salvar perfil no Firebase:', error);
            return false;
        }
    };

    return(
        <UserContext.Provider value={{ 
            perfilUsuario, 
            usuario, 
            carregandoPerfil, 
            salvarPerfilUsuario 
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}