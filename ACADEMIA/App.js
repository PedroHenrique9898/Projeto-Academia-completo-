import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'
import { Image} from 'react-native';

import Login from './Screens/Login';
import Cadastro from './Screens/Cadastro';
import Home from './Screens/Home';
import Perfil from './Screens/Perfil';
import CadastroPerfil from './Screens/CadastroPerfil';
import Treinos from './Treinos/Treinos';
import Braco from './Treinos/TreinoBraco';
import Peito from './Treinos/TreinoPeito';
import Perna from './Treinos/TreinoPerna';
import { UserProvider } from './Screens/UserProvider';

export default function App(){

  const Stack = createStackNavigator();
 
  return(
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ 
                                                              headerStyle: { 
                                                                backgroundColor: 'black',
                                                                elevation: 5,
                                                                shadowColor: '#000',
                                                                shadowOffset: {
                                                                  width: 0,
                                                                  height: 2,
                                                                },
                                                                shadowOpacity: 0.25,
                                                                shadowRadius: 4,
                                                              },
                                                              headerTitleStyle: {
                                                                color: 'white',
                                                              },
                                                              headerTitleAlign: 'center',
                                                            }}>
        <Stack.Screen name='Login' component={Login} options={{ title: 'Bem-vindo!'  }}/>
        <Stack.Screen name='Cadastro' component={Cadastro} options={{ title: 'Cadastre-se'  }}/>
        <Stack.Screen name='TelaHome' component={DrawerFunc} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}

function DrawerFunc(){
 
  const DrawerNav = createDrawerNavigator();
 
  return(
    <DrawerNav.Navigator initialRouteName='Home' screenOptions={{
                                                            headerStyle: { 
                                                                backgroundColor: 'black',
                                                                elevation: 5,
                                                                shadowColor: '#000',
                                                                shadowOffset: {
                                                                  width: 0,
                                                                  height: 2,
                                                                },
                                                                shadowOpacity: 0.25,
                                                                shadowRadius: 4,
                                                              },
                                                            headerTitleStyle: {
                                                              color: 'white',
                                                            },
                                                            headerTitleAlign: 'center',
                                                            headerRight: () => (
                                                              <Image
                                                                source={require('./assets/image.png')}
                                                                style={{
                                                                  width: 45,
                                                                  height: 45,
                                                                  borderRadius: 50,
                                                                  marginRight: 15,
                                                                  resizeMode: 'contain'
                                                                }}
                                                              />
                                                            ),
                                                            headerTintColor: 'white',
                                                          }}>
      <DrawerNav.Screen name='Home' component={Home} options={{ title: '', drawerLabel: 'Home' }}/>
      <DrawerNav.Screen name='Perfil' component={PerfilFunc} options={{ title: '', drawerLabel: 'Perfil' }}/>
      <DrawerNav.Screen name='Treinos' component={TreinosFunc} options={{ title: '', drawerLabel: 'Treinos' }}/>
    </DrawerNav.Navigator>
  );
}

function PerfilFunc(){
 
  const PerfilNav = createStackNavigator();
 
  return(
    <PerfilNav.Navigator initialRouteName='PerfilTela'>
      <PerfilNav.Screen name='PerfilTela' component={Perfil} options={{headerShown:false}}/>
      <PerfilNav.Screen name='CadastroPerfil' component={CadastroPerfil} options={{headerShown:false}}/>
    </PerfilNav.Navigator>
  );
}

function TreinosFunc(){
 
  const TreinosNav = createStackNavigator();
 
  return(
    <TreinosNav.Navigator initialRouteName='TreinosTela'>
      <TreinosNav.Screen name='TreinosTela' component={Treinos} options={{headerShown:false}}/>
      <TreinosNav.Screen name='Peito' component={Peito} options={{headerShown:false}}/>
      <TreinosNav.Screen name='Braco' component={Braco} options={{headerShown:false}}/>
      <TreinosNav.Screen name='Perna' component={Perna} options={{headerShown:false}}/>
    </TreinosNav.Navigator>
  );
}