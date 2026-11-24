
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function UrunKarti({ urun, onPress }) {
  const indirimliFiyat =
    urun.price * (1 - urun.discountPercentage / 100);

  return (
    <Pressable style={styles.kart} onPress={onPress}>
      <Image
        source={{ uri: urun.thumbnail }}
        style={styles.resim}
        resizeMode="contain"
      />

      <Text style={styles.baslik} numberOfLines={2}>
        {urun.title}
      </Text>

      <Text style={styles.puan}>
        ⭐ {urun.rating} / 5
      </Text>

      <View style={styles.fiyatAlani}>
        <Text style={styles.eskiFiyat}>
          ${urun.price.toFixed(2)}
        </Text>

        <Text style={styles.indirimliFiyat}>
          ${indirimliFiyat.toFixed(2)}
        </Text>
      </View>

      <Text style={styles.indirimEtiketi}>
        %{urun.discountPercentage.toFixed(0)} indirim
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kart: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 9,
    margin: 5,
    flex: 1,
    elevation: 3,
  },
  resim: {
    width: '100%',
    height: 105,
    marginBottom: 5,
  },
  baslik: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#51436B',
    minHeight: 34,
  },
  puan: {
    color: '#968BA5',
    fontSize: 12,
    marginTop: 5,
  },
  fiyatAlani: {
    marginTop: 5,
  },
  eskiFiyat: {
    fontSize: 12,
    color: '#968BA5',
    textDecorationLine: 'line-through',
  },
  indirimliFiyat: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8B68B5',
    marginTop: 1,
  },
  indirimEtiketi: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDE9FE',
    color: '#8B68B5',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
  },
});
