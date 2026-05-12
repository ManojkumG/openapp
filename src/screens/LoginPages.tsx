import { type JSX, useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, Text, TextInput, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import type { AuthGrid } from './AuthScreen';
import { DARK_BLUE, styles } from './authStyles';

const envelopeHand = require('../../images/envelope-hand.png');
const wheelImage = require('../../images/boat-steering.png');

function GoogleButtonIcon(): JSX.Element {
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
      <Rect width={44} height={44} rx={2} fill="#FBF7EC" />
      <Rect
        x={0.5}
        y={0.5}
        width={43}
        height={43}
        rx={1.5}
        stroke="black"
        strokeOpacity={0.8}
      />
      <Path
        d="M21.6486 14C18.6623 14 16.0523 15.6468 14.8222 18.1254C14.282 19.1684 14 20.3258 14 21.5004C14 22.675 14.282 23.8324 14.8222 24.8754C16.0523 27.3532 18.6623 29 21.6486 29C23.7081 29 25.4757 28.3295 26.7114 27.1968C28.7255 25.4349 29.2939 22.657 28.8666 20.1524C28.8586 20.1053 28.8342 20.0626 28.7977 20.0317C28.7612 20.0008 28.7149 19.9839 28.6672 19.9838H21.6486C21.5949 19.9838 21.5433 20.0051 21.5053 20.0432C21.4673 20.0812 21.4459 20.1327 21.4459 20.1865V22.8865C21.4459 22.9984 21.5367 23.0892 21.6486 23.0892H25.5146C25.38 23.6892 24.9576 24.5057 24.1484 25.0538L24.1419 25.0578C23.5865 25.4649 22.7351 25.7486 21.6486 25.7486C19.268 25.7486 17.3715 23.7581 17.3715 21.427C17.3715 19.1705 19.3759 17.1784 21.6486 17.1784C23.0027 17.1784 23.8541 17.7322 24.4289 18.2243C24.4674 18.2572 24.5167 18.2745 24.5673 18.2729C24.6179 18.2712 24.666 18.2507 24.7022 18.2154L26.7925 16.1722C26.8126 16.1526 26.8284 16.129 26.8389 16.103C26.8494 16.077 26.8544 16.0491 26.8536 16.021C26.8527 15.993 26.8461 15.9654 26.834 15.9401C26.822 15.9147 26.8048 15.8921 26.7836 15.8738C25.479 14.7484 23.7154 14 21.6486 14Z"
        fill="black"
        fillOpacity={0.8}
      />
    </Svg>
  );
}

function AppleButtonIcon(): JSX.Element {
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
      <Rect width={44} height={44} rx={2} fill="#FBF7EC" />
      <Rect
        x={0.5}
        y={0.5}
        width={43}
        height={43}
        rx={1.5}
        stroke="black"
        strokeOpacity={0.8}
      />
      <Path
        d="M26.5309 28.4C25.7142 29.1917 24.8226 29.0667 23.9642 28.6917C23.0559 28.3083 22.2226 28.2917 21.2642 28.6917C20.0642 29.2083 19.4309 29.0583 18.7142 28.4C14.6476 24.2083 15.2476 17.825 19.8642 17.5917C20.9892 17.65 21.7726 18.2083 22.4309 18.2583C23.4142 18.0583 24.3559 17.4833 25.4059 17.5583C26.6642 17.6583 27.6142 18.1583 28.2392 19.0583C25.6392 20.6167 26.2559 24.0417 28.6392 25C28.1642 26.25 27.5476 27.4917 26.5226 28.4083L26.5309 28.4ZM22.3476 17.5417C22.2226 15.6833 23.7309 14.15 25.4642 14C25.7059 16.15 23.5142 17.75 22.3476 17.5417Z"
        fill="black"
        fillOpacity={0.8}
      />
    </Svg>
  );
}

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
  const wheelSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(wheelSpin, {
        duration: 7000,
        easing: Easing.linear,
        isInteraction: false,
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => animation.stop();
  }, [wheelSpin]);

  const wheelRotate = wheelSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={[
        styles.loginScreen,
        { flex: 1, minHeight: '100%', paddingHorizontal: grid.gutter },
      ]}
    >
      <View style={[styles.loginTopObject, { left: grid.gutter }]}>
        <Animated.Image
          resizeMode="contain"
          source={wheelImage}
          style={[styles.loginTopObjectImage, { transform: [{ rotate: wheelRotate }] }]}
        />
      </View>

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
            <AppleButtonIcon />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <GoogleButtonIcon />
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
