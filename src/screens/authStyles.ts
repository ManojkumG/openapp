import { Platform, StyleSheet } from 'react-native';

export const DARK_BLUE = '#12285a';
export const PAPER = '#f5efe3';
export const INK = '#111111';
export const MUTED = '#6e675c';

export const monoFont = Platform.select({
  ios: 'Courier',
  android: 'monospace',
  default: 'monospace',
});

export const serifFont = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'serif',
});

export const styles = StyleSheet.create({
  screenLock: {
    backgroundColor: '#f5efe3',
    flex: 1,
    height: '100%',
    minHeight: '100%',
    overflow: 'hidden',
  },
  grid: {
    alignSelf: 'center',
    backgroundColor: PAPER,
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  loginScreen: {
    overflow: 'hidden',
    position: 'relative',
  },
  loginForm: {
    marginTop: 92,
  },
  scriptLabel: {
    color: MUTED,
    fontFamily: serifFont,
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 21.75,
    marginBottom: 11,
    verticalAlign: 'middle',
  },
  scriptLabelStrong: {
    color: INK,
    fontFamily: serifFont,
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 21.75,
    verticalAlign: 'middle',
  },
  phoneInput: {
    borderColor: '#373737',
    borderWidth: 1,
    color: '#6b645b',
    fontFamily: monoFont,
    fontSize: 24,
    height: 63,
    letterSpacing: 1.33,
    paddingHorizontal: 19,
  },
  helperCopy: {
    color: MUTED,
    fontFamily: monoFont,
    fontSize: 10,
    letterSpacing: 1.33,
    lineHeight: 17,
    marginLeft: 7,
    marginTop: 13,
  },
  primaryButton: {
    alignItems: 'center',
    borderColor: '#222222',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    marginTop: 18,
  },
  primaryButtonActive: {
    backgroundColor: DARK_BLUE,
  },
  primaryButtonText: {
    color: '#333333',
    fontFamily: monoFont,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.64,
  },
  primaryButtonTextActive: {
    color: '#ffffff',
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
  },
  divider: {
    backgroundColor: '#b9b4aa',
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: '#7d5c3b',
    fontFamily: serifFont,
    fontSize: 11,
    fontStyle: 'italic',
  },
  socialRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 22,
  },
  socialButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  socialButtonImage: {
    height: 44,
    width: 44,
  },
  envelopeImage: {
    bottom: 0,
    position: 'absolute',
  },
  otpScreen: {
    overflow: 'hidden',
    paddingTop: 76,
    position: 'relative',
  },
  backButton: {
    alignItems: 'flex-start',
    height: 40,
    justifyContent: 'center',
    marginBottom: 14,
    width: 40,
  },
  backIcon: {
    color: INK,
    fontSize: 41,
    lineHeight: 43,
  },
  otpIntro: {
    color: MUTED,
    fontFamily: serifFont,
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 8,
  },
  phonePreview: {
    color: INK,
    fontFamily: monoFont,
    fontSize: 14,
    letterSpacing: 0.52,
    marginTop: 8,
  },
  otpRow: {
    flexDirection: 'row',
    marginTop: 14,
  },
  otpBox: {
    borderColor: '#333333',
    borderWidth: 1,
    color: INK,
    fontFamily: monoFont,
    fontSize: 23,
    textAlign: 'center',
  },
  otpBoxFocused: {
    borderColor: DARK_BLUE,
    shadowColor: '#aeb3aa',
    shadowOffset: { height: 4, width: -4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  expiresRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
    marginTop: 24,
  },
  expiresText: {
    color: MUTED,
    fontFamily: monoFont,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  dotLine: {
    borderColor: '#beb9ae',
    borderStyle: 'dotted',
    borderTopWidth: 3,
    flex: 1,
    height: 1,
  },
  timerText: {
    color: INK,
    fontFamily: monoFont,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  marketButton: {
    alignItems: 'center',
    borderColor: '#222222',
    borderRadius: 2,
    borderWidth: 1,
    height: 52,
    justifyContent: 'center',
    marginTop: 27,
  },
  marketButtonActive: {
    backgroundColor: DARK_BLUE,
  },
  marketButtonText: {
    color: '#333333',
    fontFamily: monoFont,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.68,
    textAlign: 'center',
  },
  marketButtonTextActive: {
    color: '#ffffff',
  },
  resendRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  resendMuted: {
    color: MUTED,
    fontFamily: monoFont,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  resendLink: {
    color: INK,
    fontFamily: monoFont,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  mailboxImage: {
    bottom: 0,
    position: 'absolute',
  },
});
