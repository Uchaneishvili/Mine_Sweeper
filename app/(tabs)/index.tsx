import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView
} from 'react-native'
import { useEffect, useState } from 'react'
import { HappyEmoji, SadEmoji } from '@/components/ui/Icons'
import FormatData from '@/utils/FormatData'
export default function HomeScreen() {
  const RealMap =
    '1 x 1 1 x 1 2 2 2 1 2 2 1 x 1 1 x 1 2 2 2 1 2 2 2 x 2 0 1 x 2 x 2 1 2 2 1 1 1 1 x 1 0 0 0 1 1 1'
  const map =
    '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'
  const screenWidth = Dimensions.get('window').width
  // Adjust grid size for very small screens
  const n = screenWidth < 350 ? 5 : 6

  const buttonValue = {
    x: '💣',
    '?': ' ',
    '0': ' ',
    '1': '1',
    '2': '2'
  }

  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(0)
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

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [gameOver])

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
      setScore((score) => score + 5)
      newLayout[column][row] = realMapArray[column * n + row]
      setLayout(newLayout)
    }
  }

  // Get screen dimensions
  const buttonSize = Math.min(35, (screenWidth - 60) / n) // Adaptive button size based on screen width

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.gameContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.headerButton}>
                  <Text>{FormatData.formatDigits(timer)}</Text>
                </View>

                <View style={styles.headerButton}>{gameOver ? <SadEmoji /> : <HappyEmoji />}</View>
                <View style={styles.headerButton}>
                  <Text>{FormatData.formatDigits(score)}</Text>
                </View>
              </View>

              <View style={styles.layoutContainer}>
                {layout.map((item: string[], columnIndex: number) => (
                  <View key={columnIndex} style={styles.innerView}>
                    <View style={styles.row}>
                      {item.map((value: string, rowIndex: number) => (
                        <View key={rowIndex} style={styles.buttonContainer}>
                          <TouchableOpacity
                            style={[
                              styles.button,
                              {
                                width: buttonSize,
                                height: buttonSize,
                                backgroundColor:
                                  value === 'x' ? 'red' : value !== '?' ? 'green' : '#BDBDBD'
                              }
                            ]}
                            key={rowIndex}
                            disabled={value !== '?'}
                            onPress={() => {
                              open(rowIndex, columnIndex)
                            }}
                          >
                            <Text style={[styles.buttonText, { fontSize: buttonSize * 0.5 }]}>
                              {buttonValue[value as keyof typeof buttonValue]}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
              {gameOver && <Text style={styles.gameOverText}>Game Over</Text>}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1
    // justifyContent: 'center',
    // alignItems: 'center'
    // width: '100%',
    // height: '100%',
    // backgroundColor: '#BDBDBD'
  },
  innerContainer: {
    flex: 1
    // marginTop: 40
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  innerView: {
    backgroundColor: '#BDBDBD'
  },

  gameContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#BDBDBD',
    padding: 10,
    borderWidth: 5,
    borderLeftColor: 'white',
    borderRightColor: 'black',
    borderTopColor: 'white',
    borderBottomColor: 'black'
  },

  layoutContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#BDBDBD',
    borderWidth: 5,
    marginTop: 10,
    borderLeftColor: 'black',
    borderRightColor: 'white',
    borderTopColor: 'black',
    borderBottomColor: 'white',
    paddingTop: 10
  },
  buttonContainer: {
    width: `${100 / 6}%`,
    padding: 10
    // padding: 20
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
    fontWeight: 'bold',
    color: 'white'
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red'
  },
  headerContainer: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BDBDBD',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderWidth: 5,
    borderTopColor: 'black',
    borderLeftColor: 'black',
    borderRightColor: 'white',
    borderBottomColor: 'white'
  },
  headerButton: {
    width: 100,
    height: 200,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center'
  }
})
