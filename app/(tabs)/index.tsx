import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useState } from 'react'

export default function HomeScreen() {
  const RealMap = '1 x 1 1 x 1 2 2 2 1 2 2 2 x 2 0 1 x 2 x 2 1 2 2 1 1 1 1 x 1 0 0 0 1 1 1'
  const map = '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'
  const n = 6

  const buttonValue = {
    x: '💣',
    '?': ' ',
    '0': '0',
    '1': '1',
    '2': '2'
  }

  const [gameOver, setGameOver] = useState(false)
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

    if (realMapArray[column * n + row] === 'x') {
      setGameOver(true)
      const revealedLayout = Array(realMapArray.length / n)
        .fill(null)
        .map((_, i) => realMapArray.slice(i * n, (i + 1) * n))

      setLayout(revealedLayout)
    } else {
      newLayout[column][row] = realMapArray[column * n + row]
      setLayout(newLayout)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {gameOver && <Text style={styles.gameOverText}>Game Over</Text>}

        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.headerButton}>1</View>
            <View style={styles.headerButton}>1</View>
            <View style={styles.headerButton}>1</View>
          </View>

          {layout.map((item: string[], columnIndex: number) => (
            <View key={columnIndex} style={styles.innerView}>
              <View style={styles.row}>
                {item.map((value: string, rowIndex: number) => (
                  <View key={rowIndex} style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        {
                          backgroundColor: value === 'x' ? 'red' : value !== '?' ? 'green' : 'gray'
                        }
                      ]}
                      key={rowIndex}
                      disabled={value !== '?'}
                      onPress={() => {
                        open(rowIndex, columnIndex)
                      }}
                    >
                      <Text style={styles.buttonText}>
                        {buttonValue[value as keyof typeof buttonValue]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerView: {
    backgroundColor: 'gray'
  },
  buttonContainer: {
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderBottomColor: 'black',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'black'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderWidth: 5,
    borderTopColor: 'black',
    borderLeftColor: 'black',
    borderRightColor: 'white',
    borderBottomColor: 'white'
  },
  headerButton: {
    width: 85,
    height: 88,
    backgroundColor: 'gray',
    justifyContent: 'center'
  }
})
