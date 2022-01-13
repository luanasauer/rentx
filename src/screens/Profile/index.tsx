import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';

import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker'; 
import { useNavigation } from '@react-navigation/core';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { InputPassword } from '../../components/InputPassword';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';


export function Profile() {

  const {user, signOut, updatedUser} = useAuth();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  function handleBack() {
    navigation.goBack();
  }
  

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
   
    if(netInfo.isConnected === false && optionSelected === 'passwordEdit') {
      Alert.alert('Para mudar a senha conecte-se a Internet');
    } else {
      setOption(optionSelected);
    }
    
  }

  async function handleAvatarSelect() {
     const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(result.cancelled){
      return;
    }

    if(result.uri){
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate(){
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
        .required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório')
      });

      const data = {name, driverLicense};
      await schema.validate(data);

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      });

      Alert.alert('Perfil atualizado');

    } catch(error) {
      if( error instanceof Yup.ValidationError){
        Alert.alert('Ops', error.message);
      } else{
        Alert.alert('Não foi possível atualizar o perfil');
      }
    }
  }

  async function handleSignOut(){

    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text:'Cancelar',
          onPress:()=>{},
          style:"cancel"
        },
        {
          text:'Sair',
          onPress: ()=> signOut(), 
        }
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />
              <HeaderTitle> Editar Perfil </HeaderTitle>
                <LogoutButton onPress={handleSignOut}>
                  <Feather
                    name="power"
                    size={24}
                    color={theme.colors.shape} />
                </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
                {!!avatar && <Photo source={{ uri: avatar }} />}
                
                <GestureHandlerRootView><PhotoButton onPress={handleAvatarSelect}>             
                    <Feather
                      name="camera"
                      size={24}
                      color={theme.colors.shape}
                    />
                </PhotoButton></GestureHandlerRootView>
            </PhotoContainer> 
              
          </Header>
          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>Trocar Senha</OptionTitle>
              </Option>
            </Options>
            {
              option === 'dataEdit' ?
                <Section >
                  <Input
                    iconName="user"
                    placeholder="Nome"
                    autoCorrect={false}
                    defaultValue={user.name}
                    onChangeText={setName}
                  />
                  <Input
                    iconName="mail"
                    editable={false}
                    defaultValue={user.email}
                  />
                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="numeric"
                    defaultValue={user.driver_license}
                    onChangeText={setDriverLicense}
                  />
                </Section>
                :
                <Section >
                  <InputPassword
                    iconName="lock"
                    placeholder="Senha atual"
                  />
                  <InputPassword
                    iconName="lock"
                    placeholder="Nova senha"
                  />
                  <InputPassword
                    iconName="lock"
                    placeholder="Repetir Senha"
                  />
                </Section>
            }
            <GestureHandlerRootView>
            <Button
              title="Salvar alterações"
              onPress={handleProfileUpdate}
            /></GestureHandlerRootView>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}