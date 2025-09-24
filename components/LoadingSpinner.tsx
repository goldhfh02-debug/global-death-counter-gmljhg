
import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { colors } from '../styles/commonStyles';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export default function LoadingSpinner({ 
  size = 24, 
  color = colors.primary 
}: LoadingSpinnerProps) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          width: size,
          height: size,
          borderWidth: 2,
          borderColor: color,
          borderTopColor: 'transparent',
          borderRadius: size / 2,
          transform: [{ rotate }],
        }}
      />
    </View>
  );
}
