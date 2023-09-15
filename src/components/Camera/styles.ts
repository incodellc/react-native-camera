import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    position: 'absolute',
    left: 20,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  focusCircle: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
});

export default styles;
