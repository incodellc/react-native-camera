import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '~containers/HomeScreen';
import {ProfileScreen} from '~containers/ProfileScreen';
import {CreateScreen} from '~containers/CreateScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Settings" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
