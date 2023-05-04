import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Pokedex, PokemonPage } from '../components';

const Stack = createNativeStackNavigator();


export default function Navigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Pokedex" component={Pokedex} />
          <Stack.Screen name="PokemonPage" component={PokemonPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }