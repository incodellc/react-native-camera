import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Text,
  View,
} from 'react-native';

import {ThemeColors} from '~assets/theme';
import styles from '~components/Spinner/styles';

const Spinner = ({
  color = ThemeColors.beige,
  ...props
}: ActivityIndicatorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
      <ActivityIndicator color={color} {...props} />
    </View>
  );
};

export default Spinner;
