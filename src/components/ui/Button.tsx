import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';
import { createButtonStyles } from '@styles/components/buttons';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = PressableProps & {
  title: string;
  variant?: Variant;
  size?: Size;
  mode?: 'light' | 'dark';
};

export default function Button({
  title,
  variant = 'primary',
  size = 'md',
  mode = 'light',
  style,
  disabled,
  ...rest
}: ButtonProps) {
  const styles = React.useMemo(() => createButtonStyles(mode), [mode]);
  const containerStyles = [
    styles.base,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'ghost' && styles.ghost,
    size === 'sm' && styles.sizeSm,
    size === 'lg' && styles.sizeLg,
    style,
    disabled && { opacity: 0.5 },
  ];
  const labelStyles = [
    styles.label,
    variant === 'secondary' && styles.labelSecondary,
    variant === 'ghost' && styles.labelGhost,
  ];
  return (
    <Pressable style={containerStyles as any} disabled={disabled} {...rest}>
      <Text style={labelStyles as any}>{title}</Text>
    </Pressable>
  );
}


