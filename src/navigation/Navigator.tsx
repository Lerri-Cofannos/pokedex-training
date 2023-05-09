import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { Pokedex, PokemonDetails } from '../screens';

const Stack = createNativeStackNavigator();


export default function Navigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Pokedex" component={Pokedex} />
          <Stack.Screen name="Pokemon Details" component={PokemonDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }