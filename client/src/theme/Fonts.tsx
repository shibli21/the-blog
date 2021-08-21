import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Nexa Bold';
        font-style: bold;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/Nexa Bold.otf') format('opentype');
      }
      `}
  />
);
export default Fonts;
