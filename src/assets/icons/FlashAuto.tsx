import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FlashAuto() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30">
      <Path
        d="M21.186 3.002s-8.765 10.801-9.202 11.719c-.268 1.05.892 1.953 2 1.953h.598L10 27s8.763-10.801 9.2-11.719c.268-1.05-.893-1.953-2-1.953h-.598zm-13.78.039l-2.414 8h1.963l.404-1.72h2.332l.416 1.72h2.008l-2.412-8zm1.12 1.373l.841 3.533H7.682z"
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

export default FlashAuto;
