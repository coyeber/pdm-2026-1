import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { palette } from '@/constants/auth-theme';

type Props = TextInputProps & {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onToggleVisibility?: () => void;
  visible?: boolean;
};

export function AuthField({ label, icon, onToggleVisibility, visible, ...inputProps }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name={icon} size={19} color={palette.muted} />
        <TextInput
          {...inputProps}
          accessibilityLabel={label}
          placeholderTextColor="#91A0B4"
          style={styles.input}
        />
        {onToggleVisibility ? (
          <Pressable
            onPress={onToggleVisibility}
            accessibilityRole="button"
            accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
            hitSlop={8}>
            <Ionicons name={visible ? 'eye-off-outline' : 'eye-outline'} size={20} color={palette.muted} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export const authStyles = StyleSheet.create({
  submit: {
    minHeight: 52, borderRadius: 13, backgroundColor: palette.accent,
    alignItems: 'center', justifyContent: 'center', marginTop: 10, flexDirection: 'row', gap: 10,
  },
  submitDisabled: { opacity: 0.65 },
  submitText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  bottomRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24, gap: 5, flexWrap: 'wrap' },
  secondary: { color: palette.muted, fontSize: 13 },
  link: { color: palette.accent, fontWeight: '800', fontSize: 13 },
  errorBox: { padding: 12, borderRadius: 10, backgroundColor: '#FFF0F1', marginBottom: 16 },
  errorText: { color: palette.error, fontSize: 13, lineHeight: 19 },
  infoBox: { padding: 12, borderRadius: 10, backgroundColor: palette.accentSoft, marginBottom: 16 },
  infoText: { color: palette.accent, fontSize: 12, lineHeight: 18 },
});

const styles = StyleSheet.create({
  wrapper: { marginBottom: 17 },
  label: { fontSize: 13, color: palette.ink, fontWeight: '700', marginBottom: 8 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FBFCFE',
    borderWidth: 1, borderColor: palette.border, minHeight: 53,
    borderRadius: 12, paddingHorizontal: 14, gap: 11,
  },
  input: { flex: 1, paddingVertical: 12, color: palette.ink, fontSize: 15, minWidth: 0 },
});
