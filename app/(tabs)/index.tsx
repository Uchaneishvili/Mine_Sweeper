import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useState } from 'react'

export default function HomeScreen() {
  const RealMap = '1 x 1 1 x 1 2 2 2 1 2 2 2 x 2 0 1 x 2 x 2 1 2 2 1 1 1 1 x 1 0 0 0 1 1 1'
  const map = '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? 0 ? ? ? ? ? ? ? ? ? ? ? ? ? ? 0 0 0 ? ? ?'
  const n = 6

  const [layout, setLayout] = useState(() => {
    const mapArray = map.split(' ')
    const initialLayout: string[][] = []

    for (let i = 0; i < mapArray.length / n; i++) {
      const rowArray: string[] = []
      for (let j = 0; j < n; j++) {
        const index = i * n + j
        rowArray.push(mapArray[index])
      }
      initialLayout.push(rowArray)
    }

    return initialLayout
  })

  const realMapArray = RealMap.split(' ')

  const open = (row: number, column: number) => {
    const newLayout = layout.map((rowArray) => [...rowArray])

    newLayout[column][row] = realMapArray[column * n + row]

    setLayout(newLayout)
  }

  return (
    <View style={styles.container}>
      {layout.map((item: string[], columnIndex: number) => (
        <View key={columnIndex} style={styles.innerView}>
          <View style={styles.row}>
            {item.map((value: string, rowIndex: number) => (
              <View key={rowIndex} style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: value === '0' ? 'green' : 'gray' }]}
                  disabled={value === '0'}
                  key={rowIndex}
                  onPress={() => {
                    open(rowIndex, columnIndex)
                  }}
                >
                  <Text style={styles.buttonText}>{value}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerView: {
    height: 50
  },
  buttonContainer: {
    width: 50,
    height: 50,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  }
})
