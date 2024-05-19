import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SelectedVariantsProps {
  selectedItems: { [key: string]: any };
}

export const SelectedVariants: React.FC<SelectedVariantsProps> = ({ selectedItems }) => {
  const selectedModels: { [key: string]: Set<string> } = {};

  // console.log("selectedItems",selectedItems)

  Object.entries(selectedItems).forEach(([key, item]) => {
    console.log("item", item);
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
    <View>
      {Object.entries(selectedModels).map(([model, variants]) => (
        <View key={model} style={styles.tagContainer}>
          <Text style={styles.selectedHeader}>{model}</Text>
          <View style={styles.variantContainer}>
            {variants.has('all') ? (
              <Text style={styles.selectedText}>All variants</Text>
            ) : (
              Array.from(variants).map((variant, index, arr) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.selectedText}>
                    {variant}
                    {index !== arr.length - 1 && ','}
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    marginBottom: 10,
  },
  variantContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginRight: 5,
  },
  selectedHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedText: {
    fontSize: 16,
  },
});

export default SelectedVariants;

