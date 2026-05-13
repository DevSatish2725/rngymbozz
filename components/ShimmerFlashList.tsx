import { useShimmerAnimation } from "@/hooks/use-shimmer-animation";
import { FlashList } from "@shopify/flash-list";
import React, { JSX, ReactNode, useCallback } from "react";
import { useWindowDimensions } from "react-native";

interface ShimmerFlashListProps {
  itemCount?: number;
  estimatedItemSize?: number;
  renderShimmerCard: ({
    translateX,
    screenWidth,
  }: {
    translateX: ReturnType<typeof useShimmerAnimation>;
    screenWidth: number;
  }) => ReactNode;
}

export default function ShimmerFlashList({
  itemCount = 5,
  estimatedItemSize = 100,
  renderShimmerCard,
}: ShimmerFlashListProps) {
  const { width } = useWindowDimensions();
  const translateX = useShimmerAnimation(width);

  const renderItem = useCallback(
    ({ item }: { item: { id: string } }) =>
      renderShimmerCard({ translateX, screenWidth: width }) as JSX.Element,
    [translateX, width, renderShimmerCard],
  );

  const data = Array.from({ length: itemCount }, (_, i) => ({
    id: i.toString(),
  }));

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  );
}