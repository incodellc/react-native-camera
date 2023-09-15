import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function HdrOff() {
  return (
    <Svg width={40} height={40} viewBox="0 0 30 30">
      <G
        style={{
          lineHeight: 1.25,
        }}
        fontStyle="normal"
        fontWeight={400}
        fontSize="12.90474415px"
        fontFamily="sans-serif"
        letterSpacing={0}
        wordSpacing={0}
        fill="#fff"
        fillOpacity={1}
        stroke="none"
        strokeWidth={1.19999993}>
        <Path
          d="M25.607 4.393L4.393 25.607l1.414 1.414 8.3-8.3h.11c.996 0 1.803-.208 2.42-.623a3.562 3.562 0 001.345-1.668c.242-.6.372-1.266.405-1.989l1.396-1.396-.795 5.676h1.57l.399-2.914h.838l1.172 2.914h1.72l-1.43-3.172c.639-.244 1.088-.563 1.347-.957.265-.402.396-.856.396-1.365 0-.624-.226-1.107-.678-1.444-.451-.337-1.118-.504-2-.504h-.773l5.472-5.472-1.414-1.414zM6.043 11.279L5 18.721h1.559l.462-3.258H9.43l-.366 2.644 1.815-1.814.703-5.014h-1.559l-.42 2.936h-2.41l.42-2.936h-1.57zm7.1 0l-.45 3.2 1.817-1.817.031-.223h.191l1.11-1.109a6.198 6.198 0 00-.785-.05h-1.914zm8.287 1.139h.732c.423 0 .73.069.924.205.194.136.289.358.289.666 0 .38-.11.71-.332.99-.222.273-.584.409-1.086.409h-.838l.31-2.27zm-5.297 4.277c-.166.257-.362.47-.61.61l.61-.61z"
          transform="translate(0 -289.063) matrix(.83333 0 0 .83333 2.5 50.677) matrix(1.2 0 0 1.2 -3 286.063)"
          aria-label="HDR"
          strokeWidth={0.99999994}
        />
      </G>
    </Svg>
  );
}

export default HdrOff;