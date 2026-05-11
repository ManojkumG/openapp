import { type JSX } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

import type { AuthGrid } from './AuthScreen';
import { DARK_BLUE, styles } from './authStyles';

const envelopeHand = require('../../images/envelope-hand.png');
const appleButton = require('../../images/apple-button.png');
const googleButton = require('../../images/google-button.png');

type LoginPageProps = {
  grid: AuthGrid;
  onPhoneChange: (phone: string) => void;
  onVerify: () => void;
  phone: string;
};

export default function LoginPage({
  grid,
  onPhoneChange,
  onVerify,
  phone,
}: LoginPageProps): JSX.Element {
  const isPhoneReady = phone.length === 10;
  const formWidth = grid.span(12);
  const envelopeWidth = Math.min(380, grid.maxWidth - grid.gutter * 2);
  const envelopeHeight = Math.round(envelopeWidth * (369 / 380));

  return (
    <View
      style={[
        styles.loginScreen,
        { flex: 1, minHeight: '100%', paddingHorizontal: grid.gutter },
      ]}
    >
      <View style={[styles.loginForm, { width: formWidth }]}>
        <Text style={styles.scriptLabel}>
          Enter <Text style={styles.scriptLabelStrong}>Phone Number</Text>
        </Text>

        <TextInput
          autoFocus
          keyboardType="number-pad"
          maxLength={10}
          onChangeText={(text) => onPhoneChange(text.replace(/\D/g, '').slice(0, 10))}
          placeholder="-"
          placeholderTextColor={DARK_BLUE}
          selectionColor={DARK_BLUE}
          style={styles.phoneInput}
          value={phone}
        />

        <Text style={styles.helperCopy}>
          AN SMS MESSAGE OF SIX DIGITS SHALL BE{'\n'}MESSAGED TO YOUR NUMBER
        </Text>

        <Pressable
          disabled={!isPhoneReady}
          onPress={onVerify}
          style={[styles.primaryButton, isPhoneReady && styles.primaryButtonActive]}
        >
          <Text
            style={[
              styles.primaryButtonText,
              isPhoneReady && styles.primaryButtonTextActive,
            ]}
          >
            VERIFY OTP
          </Text>
        </Pressable>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or, by other means</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <Pressable style={styles.socialButton}>
            <Image
              resizeMode="contain"
              source={appleButton}
              style={styles.socialButtonImage}
            />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Image
              resizeMode="contain"
              source={googleButton}
              style={styles.socialButtonImage}
            />
          </Pressable>
        </View>
      </View>

      <Image
        resizeMode="contain"
        source={envelopeHand}
        style={[
          styles.envelopeImage,
          {
            height: envelopeHeight,
            left: (grid.maxWidth - envelopeWidth) / 2,
            width: envelopeWidth,
          },
        ]}
      />
    </View>
  );
}
