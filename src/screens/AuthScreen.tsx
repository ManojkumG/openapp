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
  const [generatedOtp, setGeneratedOtp] = useState('');

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

  const verifyPhone = () => {
    const nextOtp = generateOtp();

    setGeneratedOtp(nextOtp);
    console.log(`[TEST OTP] Phone: ${phone}, OTP: ${nextOtp}`);
    setScreen('otp');
  };

  return (
    <View style={styles.screenLock}>
      <View style={[styles.grid, { maxWidth: grid.maxWidth }]}>
        {screen === 'login' ? (
          <LoginPage
            grid={grid}
            onPhoneChange={setPhone}
            onVerify={verifyPhone}
            phone={phone}
          />
        ) : (
          <OtpPage
            generatedOtp={generatedOtp}
            grid={grid}
            onBack={() => setScreen('login')}
            onOtpGenerated={setGeneratedOtp}
            phone={phone}
          />
        )}
      </View>
    </View>
  );
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
