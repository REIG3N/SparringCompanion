import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { OPACITY, RADIUS } from '../../../styles';

export const ShimmerPlaceholder = ({ width, height, style = {} }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(shimmerAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] });

  return (
    <Animated.View
      style={[{ width, height, backgroundColor: `rgba(255,255,255,${OPACITY.o10})`, borderRadius: RADIUS.xs, opacity }, style]}
    />
  );
};


