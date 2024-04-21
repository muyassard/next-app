import { ImageResponse } from 'next/og';
import favicon from '../../public/favicon.png';

export const size = {
  width: 32,
  height: 32
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}
      >
        <link rel="shortcut icon" href={favicon.src} type="image/png" sizes="32x32" />a
      </div>
    ),
    {
      ...size
    }
  );
}
