import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import {
  Button,
  Card,
  IndexPath,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import useCurrency from "@/hooks/currency/useCurrency";

export default function ConfigureScreen() {
  const { currencies, consolidateCurrencyRates } = useCurrency();

  const [selectedConfigureIndex, setSelectedConfigureIndex] =
    useState<IndexPath>(new IndexPath(0));

  if (!currencies.length) return; // TODO: empty page

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Configure</ThemedText>
      </ThemedView>

      <View style={[styles.container]}>
        <View style={styles.containerItem}>
          <Select
            style={styles.select}
            placeholder="Default"
            value={currencies[selectedConfigureIndex.row].code}
            selectedIndex={selectedConfigureIndex}
            onSelect={(index) =>
              !Array.isArray(index) && setSelectedConfigureIndex(index)
            }
          >
            {currencies.map(
              (currency): React.ReactElement => (
                <SelectItem key={currency.code} title={currency.code} />
              )
            )}
          </Select>
        </View>
        <View style={styles.containerItem}>
          <Button
            size="tiny"
            style={styles.button}
            onPress={() => {
              consolidateCurrencyRates(
                currencies[selectedConfigureIndex.row].code
              );
            }}
          >
            RETRIEVE
          </Button>
        </View>
      </View>

      <View style={[styles.cardContainer]}>
        {currencies.map((v) => (
          <Card
            key={v.code}
            style={styles.card}
            status={v.rates ? "success" : "basic"}
          >
            <ThemedText>{v.code}</ThemedText>
          </Card>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  select: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    gap: 12,
  },
  containerItem: {
    flex: 1,
  },
  button: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    margin: 2,
  },
});
