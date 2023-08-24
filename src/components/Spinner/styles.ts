import {StyleSheet} from 'react-native';
import {ThemeColors} from '~assets/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: ThemeColors.white,
  },
});

export default styles;
