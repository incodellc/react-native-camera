import {useMemo} from 'react';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabs} from '~containers/Core/navigation/BottomTabs';

const Navigation = () => {
  const screens = useMemo(() => <BottomTabs />, []);

  return <NavigationContainer>{screens}</NavigationContainer>;
};

export default Navigation;
