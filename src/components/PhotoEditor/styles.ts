import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 16,
  },
  gray: {},
  blue: {},
  loaderContainer: {
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default styles;
