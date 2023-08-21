import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function TakePhoto() {
  return (
    <Svg width={62} height={62} viewBox="0 0 52 52" fill="none">
      <Path d="M0 0H52V52H0z" />
      <Circle cx={26} cy={26} r={19.5} stroke="#fff" strokeWidth={3} />
      <Circle cx={26} cy={26} r={24.5} stroke="#fff" strokeWidth={3} />
    </Svg>
  );
}

export default TakePhoto;
