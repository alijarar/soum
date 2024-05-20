import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SelectedVariantsProps {
  selectedItems: { [key: string]: any };
  testID?: string;
}

// SelectedVariants component displays selected models and their variants
export const SelectedVariants: React.FC<SelectedVariantsProps> = ({ selectedItems, testID }) => {
  // Object to store selected data
  const selectedData: { [key: string]: Set<string> } = {};

  Object.entries(selectedItems).forEach(([key, item]) => {
    const variantName = item.name.split(" ").slice(-2).join(" ");

    // Check if the item is a model, brand, category, or variant and update the selectedData object accordingly
    if (item.type === 'model' || item.type === 'brand' || item.type === "category") {
      if (!selectedData[item.name]) {
        selectedData[item.name] = new Set();
      }
      selectedData[item.name] = new Set(['all']);
    } else {
      if (!selectedData[item.model]) {
        selectedData[item.model] = new Set();
      }
      selectedData[item.model].add(variantName);
    }
  });

  return (
    <View style={styles.container} testID={testID}>
      {/* Iterate through selected models and their variants and display them */}
      {Object.entries(selectedData).map(([model, variants]) => (
        <View key={model} style={styles.tagContainer} testID={`selected-model-${model}`}>
          <View style={styles.variantContainer}>
            {variants.has("all") ? (
              <Text style={styles.tag}>{`All ${model} devices`}</Text>
            ) : (
              <View style={styles.tag}>
                <View style={styles.variantContainer}>
                  <Text>{`${model} `}</Text>
                  {Array.from(variants).map((variant, index, arr) => (
                    <Text key={index}>
                      {variant}
                      { ", "}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagContainer: {
    marginBottom: 2,
  },
  variantContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginRight: 5,
    borderRadius: 4,
  },
});

export default SelectedVariants;
