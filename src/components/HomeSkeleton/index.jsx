import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import styled from "styled-components/native";

const ContainerTop = styled(Animated.View)`
  height: 80px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const DashContainer = styled(Animated.View)`
  height: 280px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const DetailContainer = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 16px;
  border-radius: 4px;
`;

export function HomeSkeleton() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#c3c3c3", "#e1e2e1"],
  });

  return (
    <View>
      <ContainerTop style={{ backgroundColor }} />
      <DashContainer style={{ backgroundColor }} />
      <DetailContainer style={{ backgroundColor }} />
      <DetailContainer style={{ backgroundColor }} />
    </View>
  );
}
