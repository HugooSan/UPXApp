import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useMemo, useState } from "react";
import {
  Card,
  IndexPath,
  Input,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import useCurrency from "@/hooks/currency/useCurrency";

export default function ExploreScreen() {
  const { currencies, consolidateCurrencies } = useCurrency();

  const [amount, setAmount] = useState("1");
  const [selectedFromIndex, setSelectedFromIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const [selectedToIndex, setSelectedToIndex] = useState<IndexPath>(
    new IndexPath(0)
  );

  const currentRate = useMemo(
    () =>
      consolidateCurrencies[selectedFromIndex.row]?.rates?.[
        currencies[selectedToIndex.row].code
      ] || 1,
    [consolidateCurrencies, currencies, selectedFromIndex, selectedToIndex]
  );

  const currentAmount = useMemo(
    () => (amount ? parseInt(amount) : 1),
    [amount]
  );

  if (!currencies.length) return; // TODO: empty page

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="cash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>

      {consolidateCurrencies.length > 0 ? (
        <>
          <Input
            placeholder="Place your amount"
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
          />

          <View style={[styles.containerFromTo]}>
            <View style={styles.containerFrom}>
              <Select
                style={styles.select}
                placeholder="Default"
                value={consolidateCurrencies[selectedFromIndex.row].code}
                selectedIndex={selectedFromIndex}
                onSelect={(index) =>
                  !Array.isArray(index) && setSelectedFromIndex(index)
                }
              >
                {consolidateCurrencies.map(
                  (currency): React.ReactElement => (
                    <SelectItem key={currency.code} title={currency.code} />
                  )
                )}
              </Select>
            </View>
            <View style={styles.containerTo}>
              <Select
                style={styles.select}
                placeholder="Default"
                value={currencies[selectedToIndex.row].code}
                selectedIndex={selectedToIndex}
                onSelect={(index) =>
                  !Array.isArray(index) && setSelectedToIndex(index)
                }
              >
                {currencies.map(
                  (currency): React.ReactElement => (
                    <SelectItem key={currency.code} title={currency.code} />
                  )
                )}
              </Select>
            </View>
          </View>

          <ThemedText>
            Convert{" "}
            <ThemedText type="defaultSemiBold">
              {currencies[selectedFromIndex.row].name}
            </ThemedText>{" "}
            to{" "}
            <ThemedText type="defaultSemiBold">
              {currencies[selectedToIndex.row].name}
            </ThemedText>{" "}
            equals{" "}
            <ThemedText type="defaultSemiBold">
              {(currentAmount * currentRate).toFixed(5)}
            </ThemedText>
          </ThemedText>
        </>
      ) : (
        <Card status="warning">
          <ThemedText>Configure the currency</ThemedText>
        </Card>
      )}

      <Collapsible title="How to">
        <ThemedText>Configure the currency converter</ThemedText>
      </Collapsible>

      <Collapsible title="Learn more">
        <ThemedText>
          Using an API to convert the amount into the desired currency
        </ThemedText>
        <ExternalLink href="https://www.exchangerate-api.com/docs/overview">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  select: {
    flex: 1,
    margin: 2,
  },
  containerFromTo: {
    flexDirection: "row",
  },
  containerFrom: {
    flex: 1,
  },
  containerTo: {
    flex: 1,
  },
});
