import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { palette } from '@/constants/auth-theme';

type Props = TextInputProps & {
  label: string;
  // Mantido para compatibilidade com os formulários já existentes.
  icon?: string;
  onToggleVisibility?: () => void;
  visible?: boolean;
};

export function AuthField({
  label,
  icon: _icon,
  onToggleVisibility,
  visible,
  onFocus,
  onBlur,
  ...inputProps
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrap, focused && styles.inputFocused]}>
        <TextInput
          {...inputProps}
          accessibilityLabel={label}
          placeholderTextColor="#8B928C"
          selectionColor={palette.accent}
          style={styles.input}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
        {onToggleVisibility ? (
          <Pressable
            onPress={onToggleVisibility}
            accessibilityRole="button"
            accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
            hitSlop={10}>
            <Text style={styles.toggle}>{visible ? 'Ocultar' : 'Mostrar'}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export const authStyles = StyleSheet.create({
  submit: {
    minHeight: 55, backgroundColor: palette.ink, alignItems: 'center',
    justifyContent: 'center', marginTop: 12, flexDirection: 'row', paddingHorizontal: 16,
  },
  submitDisabled: { opacity: 0.6 },
  submitText: { color: '#FFFFFF', fontSize: 14, letterSpacing: 0.2, fontWeight: '700' },
  bottomRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    flexWrap: 'wrap', gap: 6, marginTop: 25,
  },
  secondary: { color: palette.muted, fontSize: 13 },
  link: { color: palette.accent, fontSize: 13, fontWeight: '800' },
  errorBox: {
    backgroundColor: '#FAEEEB', padding: 13, borderLeftWidth: 3,
    borderLeftColor: palette.error, marginBottom: 18,
  },
  errorText: { color: palette.error, fontSize: 13, lineHeight: 19 },
  infoBox: {
    backgroundColor: palette.accentSoft, padding: 13, borderLeftWidth: 3,
    borderLeftColor: palette.accent, marginBottom: 18,
  },
  infoText: { color: palette.ink, fontSize: 13, lineHeight: 20 },
});

const styles = StyleSheet.create({
  field: { marginBottom: 21 },
  label: { color: palette.ink, fontSize: 12, fontWeight: '700', marginBottom: 9 },
  inputWrap: {
    minHeight: 52, borderWidth: 1, borderColor: palette.border, backgroundColor: palette.surface,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 8,
  },
  inputFocused: { borderColor: palette.accent },
  input: { minHeight: 50, paddingVertical: 11, flex: 1, minWidth: 0, fontSize: 15, color: palette.ink },
  toggle: { fontSize: 12, fontWeight: '800', color: palette.accent, paddingVertical: 10 },
});
