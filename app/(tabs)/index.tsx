import { StyleSheet, View, Button } from 'react-native'

export default function HomeScreen() {
  const map = '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? 0 ? ? ? ? ? ? ? ? ? ? ? ? ? ? 0 0 0 ? ? ?'
  const n = 6
  const mapArray = map.split(' ')
  const layout: string[][] = []
  let rowArray: string[] = []

  for (let i = 0; i < mapArray.length / n; i++) {
    for (let j = 0; j < n; j++) {
      const index = i * n + j

      rowArray.push(mapArray[index])
    }

    layout.push(rowArray)
    rowArray = []
  }

  return (
    <View style={styles.container}>
      {layout.map(
        (item: string[], index: number) => (
          console.log('item', item),
          (
            <View key={index} style={styles.innerView}>
              <View style={styles.row}>
                {item.map(
                  (value: string, innerIndex: number) => (
                    console.log('valuee', value),
                    (
                      <View key={innerIndex} style={styles.buttonContainer}>
                        <Button key={innerIndex} title={value} />
                      </View>
                    )
                  )
                )}
              </View>
            </View>
          )
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    verticalAlign: 'middle',
    alignItems: 'center'
  },
  innerView: {
    height: 50
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  }
})
// }
