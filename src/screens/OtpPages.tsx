import { type JSX, useEffect, useRef, useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  type TextInputKeyPressEventData,
  type NativeSyntheticEvent,
  View,
} from 'react-native';

import type { AuthGrid } from './AuthScreen';
import { DARK_BLUE, styles } from './authStyles';

const mailbox = require('../../images/mailbox.png');
const DISPLAY_PHONE = '+91-9843215670';
const INITIAL_OTP_SECONDS = 10 * 60;
const RESEND_OTP_SECONDS = 60;

type OtpPageProps = {
  generatedOtp: string;
  grid: AuthGrid;
  onBack: () => void;
  onOtpGenerated: (otp: string) => void;
  onVerified: () => void;
  phone: string;
};

export default function OtpPage({
  generatedOtp,
  grid,
  onBack,
  onOtpGenerated,
  onVerified,
  phone,
}: OtpPageProps): JSX.Element {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_OTP_SECONDS);
  const [resendSecondsRemaining, setResendSecondsRemaining] = useState(0);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const isOtpReady = otp.every(Boolean);
  const boxGap = grid.gap;
  const otpBoxWidth = Math.floor((grid.span(12) - boxGap * 5) / 6);
  const displayPhone = formatPhone(phone);
  const mailboxWidth = Math.min(342, grid.maxWidth - grid.gutter * 2);
  const mailboxHeight = Math.round(mailboxWidth * (313 / 342));
  const timerLabel = formatTimer(secondsRemaining);
  const resendTimerLabel = formatTimer(resendSecondsRemaining, true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((currentSeconds) => Math.max(currentSeconds - 1, 0));
      setResendSecondsRemaining((currentSeconds) => Math.max(currentSeconds - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateOtp = (value: string, index: number) => {
    const digits = value.replace(/\D/g, '').split('');
    const nextOtp = [...otp];

    if (digits.length === 0) {
      nextOtp[index] = '';
      setOtp(nextOtp);
      return;
    }

    digits.forEach((digit, digitIndex) => {
      const targetIndex = index + digitIndex;

      if (targetIndex < nextOtp.length) {
        nextOtp[targetIndex] = digit;
      }
    });

    setOtp(nextOtp);

    const nextFocusIndex = Math.min(index + digits.length, inputRefs.current.length - 1);

    if (index < inputRefs.current.length - 1) {
      inputRefs.current[nextFocusIndex]?.focus();
    }
  };

  const deleteOtpDigit = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (event.nativeEvent.key !== 'Backspace') {
      return;
    }

    setOtp((currentOtp) => {
      const nextOtp = [...currentOtp];
      const deleteIndex = currentOtp[index] || index === 0 ? index : index - 1;

      nextOtp[deleteIndex] = '';

      if (deleteIndex !== index) {
        inputRefs.current[deleteIndex]?.focus();
      }

      return nextOtp;
    });
  };

  const resendOtp = () => {
    const nextOtp = generateOtp();

    setOtp(['', '', '', '', '', '']);
    onOtpGenerated(nextOtp);
    console.log(`[TEST OTP] Phone: ${phone}, OTP: ${nextOtp}`);
    setSecondsRemaining(INITIAL_OTP_SECONDS);
    setResendSecondsRemaining(RESEND_OTP_SECONDS);
    inputRefs.current[0]?.focus();
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join('');
    const isMatch = enteredOtp === generatedOtp;

    console.log(
      `[TEST OTP VERIFY] Entered: ${enteredOtp}, Generated: ${generatedOtp}, Match: ${isMatch}`,
    );
    onVerified();
  };

  return (
    <View
      style={[
        styles.otpScreen,
        { flex: 1, minHeight: '100%', paddingHorizontal: grid.gutter },
      ]}
    >
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backIcon}>{'<'}</Text>
      </Pressable>

      <Text style={styles.otpIntro}>Enter OTP sent to</Text>
      <Text style={styles.phonePreview}>{displayPhone}</Text>

      <View style={[styles.otpRow, { gap: boxGap }]}> 
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(value) => updateOtp(value, index)}
            onKeyPress={(event) => deleteOtpDigit(event, index)}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            selectionColor={DARK_BLUE}
            style={[
              styles.otpBox,
              { width: otpBoxWidth },
              index === 0 && styles.otpBoxFocused,
            ]}
            value={digit}
          />
        ))}
      </View>

      <View style={styles.expiresRow}>
        <Text style={styles.expiresText}>OTP EXPIRES</Text>
        <View style={styles.dotLine} />
        <Text style={styles.timerText}>{timerLabel}</Text>
      </View>

      <Pressable
        disabled={!isOtpReady}
        onPress={verifyOtp}
        style={[styles.marketButton, isOtpReady && styles.marketButtonActive]}
      >
        <Text
          style={[
            styles.marketButtonText,
            isOtpReady && styles.marketButtonTextActive,
          ]}
        >
          VERIFY & ENTER THE MARKET   {'>'}
        </Text>
      </Pressable>

      <View style={styles.resendRow}>
        <Text style={styles.resendMuted}>OTP NOT RECEIVED?</Text>
        <Pressable disabled={resendSecondsRemaining > 0} onPress={resendOtp}>
          <Text style={styles.resendLink}> RE-SEND</Text>
        </Pressable>
        <Text style={styles.resendMuted}> IN {resendTimerLabel}</Text>
      </View>

      <Image
        resizeMode="contain"
        source={mailbox}
        style={[
          styles.mailboxImage,
          {
            height: mailboxHeight,
            left: (grid.maxWidth - mailboxWidth) / 2,
            width: mailboxWidth,
          },
        ]}
      />
    </View>
  );
}

function formatTimer(totalSeconds: number, padMinutes = false): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const minuteLabel = padMinutes ? minutes.toString().padStart(2, '0') : minutes.toString();

  return `${minuteLabel}:${seconds.toString().padStart(2, '0')}`;
}

function formatPhone(phone: string): string {
  if (phone.length !== 10) {
    return DISPLAY_PHONE;
  }
  return `+91-${phone}`;
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
