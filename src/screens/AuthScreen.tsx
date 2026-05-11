import { type JSX, useMemo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';

import LoginPage from './LoginPages';
import OtpPage from './OtpPages';
import { styles } from './authStyles';

export type AuthGrid = {
  column: number;
  gap: number;
  gutter: number;
  height: number;
  maxWidth: number;
  span: (columns: number) => number;
  width: number;
};

export default function AuthScreen(): JSX.Element {
  const { height, width } = useWindowDimensions();
  const [screen, setScreen] = useState<'login' | 'otp'>('login');
  const [phone, setPhone] = useState('');

  const grid = useMemo<AuthGrid>(() => {
    const maxWidth = Math.min(width, 430);
    const gutter = Math.max(18, Math.round(maxWidth * 0.052));
    const gap = Math.max(8, Math.round(maxWidth * 0.018));
    const contentWidth = maxWidth - gutter * 2;
    const column = (contentWidth - gap * 11) / 12;

    return {
      column,
      gap,
      gutter,
      height,
      maxWidth,
      span: (columns: number) => column * columns + gap * (columns - 1),
      width,
    };
  }, [height, width]);

  return (
    <View style={styles.screenLock}>
      <View style={[styles.grid, { maxWidth: grid.maxWidth }]}>
        {screen === 'login' ? (
          <LoginPage
            grid={grid}
            onPhoneChange={setPhone}
            onVerify={() => setScreen('otp')}
            phone={phone}
          />
        ) : (
          <OtpPage grid={grid} onBack={() => setScreen('login')} phone={phone} />
        )}
      </View>
    </View>
  );
}
