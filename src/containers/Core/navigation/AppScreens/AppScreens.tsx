import React from 'react';
import {appScreens} from '~containers/Core/navigation/screens';
import {SCREENS} from '~constants';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerShown: false,
      }}
      initialRouteName={SCREENS.HOME}>
      {appScreens.map(screen => {
        return (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default AppScreens;
