import React from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Calendar } from '../../components/Calendar'; 
import { Button } from '../../components/Button';


import ArrowSvg from '../../assets/arrow.svg';

import {
    Container, Header, Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer

} from './styles';
import { useNavigation } from '@react-navigation/native';


export function Scheduling() {

    const theme = useTheme();
    const navigation = useNavigation<any>();
  
    function handleConfirmRental(){
      navigation.navigate('SchedulingDetails');
    }

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle='light-content'
                    translucent
                    backgroundColor='transparent'
                />
                <BackButton
                    color={theme.colors.shape}
                    onPress={() => { }}
                />
                <Title>
                    Escolha uma {'\n'}
                    data de inicio e {'\n'}
                    fim do aluguel {'\n'}
                </Title>
                <RentalPeriod>

                    <DateInfo>
                        <DateTitle> DE </DateTitle>
                        <DateValue selected={false}>18/06/2021</DateValue>
                    </DateInfo>

                    <ArrowSvg/>

                    <DateInfo>
                        <DateTitle> ATÉ </DateTitle>
                        <DateValue selected={false}>20/06/2021</DateValue>
                    </DateInfo>

                </RentalPeriod>

            </Header>

            <Content>
                <Calendar/>
            </Content>
            <Footer>
                <Button title='Confirmar' onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    );
}