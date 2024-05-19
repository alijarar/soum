import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SelectedVariantsProps {
  selectedItems: { [key: string]: any };
}

export const SelectedVariants: React.FC<SelectedVariantsProps> = ({ selectedItems }) => {
  const selectedModels: { [key: string]: Set<string> } = {};

  Object.entries(selectedItems).forEach(([key, item]) => {
    const variantName = item.name.split(" ").slice(-2).join(" ");

    if (item.type === 'model' || item.type === 'brand' || item.type === "category") {
      if (!selectedModels[item.name]) {
        selectedModels[item.name] = new Set();
      }
      selectedModels[item.name] = new Set(['all']);
    } else {
      if (!selectedModels[item.model]) {
        selectedModels[item.model] = new Set();
      }
      selectedModels[item.model].add(variantName);
    }
  });

  return (
    <View style={styles.container}>
      {Object.entries(selectedModels).map(([model, variants]) => (
        <View key={model} style={styles.tagContainer}>
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
