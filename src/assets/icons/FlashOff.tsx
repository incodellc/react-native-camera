import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FlashOff() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30">
      <Path
        d="M21.186 3.002s-8.765 10.801-9.202 11.719c-.092.36-.007.7.178.996l6.076-6.076zm4.068 1.037L4.039 25.254l1.414 1.414 8.44-8.44L10 27s8.763-10.801 9.2-11.719c.164-.642-.208-1.226-.774-1.586l8.242-8.242z"
        transform="translate(0 -289.063) translate(0 289.063)"
        opacity={1}
        fill="#fff"
        fillOpacity={1}
        stroke="none"
        strokeWidth={1.99999988}
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
      />
    </Svg>
  );
}

export default FlashOff;
