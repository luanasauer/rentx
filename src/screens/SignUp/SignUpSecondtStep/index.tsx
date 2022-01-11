import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableWithoutFeedback,Keyboard, KeyboardAvoidingView, Alert } from 'react-native';

import { useTheme } from 'styled-components';

import { Bullet } from '../../../components/Bullet';
import { BackButton } from '../../../components/BackButton';
import { InputPassword } from '../../../components/InputPassword';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;

  }
}

export function SignUpSecondStep() {
  
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;
  //console.log(user);

  function handleBack() {
    navigation.goBack();
  }

  function handleRegister(){
    if(!password || !passwordConfirm){
      return Alert.alert('Informe Senha e Confirmação de Senha');
    }
    if(password != passwordConfirm){
      return Alert.alert('As senhas não conferem');
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>
            Crie sua{'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}forma rápida e fácil
          </SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <InputPassword
              iconName="lock"
              placeholder="Repetir Senha" 
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button 
            color={theme.colors.success}
            title="Cadastrar"
            onPress={handleRegister}
           />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}