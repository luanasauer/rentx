import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton'; 
import { ImageSlider } from '../../components/ImageSlider';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import {
     Container,Header,CarImages,
     Content,
     Details,
     Description,
     Brand,
     Name,
     Rent,
     Period,
     Price,
     About,
     Accessories,
     Footer

} from './styles';
import { Button } from '../Button';

export function CarDetails() {
    return (
        <Container>
            <Header>
                <BackButton  onPress={() => { } } />
            </Header>
            <CarImages>
                <ImageSlider 
                    imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}
                />
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>
                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>
                <Accessories>
                    <Accessory name="380Km/h"  icon={SpeedSvg}/>
                    <Accessory name="3.2s"  icon={AccelerationSvg}/>
                    <Accessory name="800 HP"  icon={ForceSvg}/>
                    <Accessory name="Gasolina"  icon={GasolineSvg}/>
                    <Accessory name="Auto"  icon={ExchangeSvg}/>
                    <Accessory name="2 pessoas"  icon={PeopleSvg}/>
                </Accessories>
                <About>
                    Consectetur tempora minima earum unde, 
                    sit saepe nesciunt magnam iure nisi est ex, ad odio possimus rerum molestiae corrupti perspiciatis aliquid cumque!
                </About>
            </Content>
            <Footer>
                <Button title="Confirmar"/>
            </Footer>
        </Container> 
    );
}