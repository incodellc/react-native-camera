import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width="30px" height="30px" viewBox="0 0 30 30" fill="#fff">
      <Path
        d="M21.186 3.002s-8.765 10.801-9.202 11.719c-.268 1.05.892 1.953 2 1.953h.598L10 27s8.763-10.801 9.2-11.719c.268-1.05-.893-1.953-2-1.953h-.598z"
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

export default SvgComponent;
