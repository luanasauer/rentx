import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Alert

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import theme from '../../styles/theme';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { useAuth } from '../../hooks/auth';
import {
  Container, 
  Footer, 
  Form, 
  Header, 
  SubTitle, 
  Title
} from './styles'; 


export function SignIn() {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<any>();
  const {signIn} = useAuth();
 
  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  async function handleSignIn(){

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória')
      });

      await schema.validate({email, password});
      signIn({email,password});

    } catch (error) {
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      }else{
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        )
      }
    }
  }

  //teste para ver se cria a base de dados corretamente
  // useEffect(()=>{
  //   async function loadData() {
  //     const userCollection = database.get('users');
  //     const users = await userCollection.query().fetch();
  //     console.log(users);
  //   }
  //   loadData();
  // },[])


  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <Header>
            <Title>Estamos{'\n'}quase lá</Title>
            <SubTitle>
              Faça seu login para comceçar{'\n'}
              uma experiência incrível
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}

            />
            <InputPassword
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title='Login'
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title='Criar conta gratuita'
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}