
import React from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  Alert
} from 'react-native';

import { useSepet } from '../context/SepetContext';

export default function Sepet() {
  const {
    sepet,
    urunSil,
    adetArtir,
    adetAzalt,
    toplamAdet,
    toplamTutar
  } = useSepet();

  const silmeOnayi = (id) => {
    Alert.alert(
      'Ürünü Sil',
      'Bu ürünü sepetten çıkarmak istiyor musunuz?',
      [
        {
          text: 'Vazgeç',
          style: 'cancel'
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => urunSil(id)
        }
      ]
    );
  };

  if (sepet.length === 0) {
    return (
      <View style={styles.bosSepet}>
        <Text style={styles.bosIkon}>🛒</Text>

        <Text style={styles.bosBaslik}>
          Sepetiniz Boş
        </Text>

        <Text style={styles.bosAciklama}>
          Henüz sepetinize ürün eklemediniz.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sepet}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.liste}
        renderItem={({ item }) => (
          <View style={styles.urunKart}>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.resim}
              resizeMode="contain"
            />

            <View style={styles.urunBilgi}>
              <Text style={styles.urunBaslik} numberOfLines={2}>
                {item.title}
              </Text>

              <Text style={styles.fiyat}>
                ${item.price.toFixed(2)}
              </Text>

              <View style={styles.adetAlan}>
                <Pressable
                  style={styles.adetButon}
                  onPress={() => adetAzalt(item.id)}
                >
                  <Text style={styles.adetButonYazi}>-</Text>
                </Pressable>

                <Text style={styles.adet}>
                  {item.adet}
                </Text>

                <Pressable
                  style={styles.adetButon}
                  onPress={() => adetArtir(item.id)}
                >
                  <Text style={styles.adetButonYazi}>+</Text>
                </Pressable>
              </View>

              <Text style={styles.araToplam}>
                Ürün Toplamı: ${(item.price * item.adet).toFixed(2)}
              </Text>

              <Pressable
                style={styles.silButon}
                onPress={() => silmeOnayi(item.id)}
              >
                <Text style={styles.silYazi}>
                  Sepetten Sil
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <View style={styles.altAlan}>
        <View style={styles.toplamSatir}>
          <Text style={styles.toplamEtiket}>
            Toplam Ürün:
          </Text>

          <Text style={styles.toplamDeger}>
            {toplamAdet}
          </Text>
        </View>

        <View style={styles.toplamSatir}>
          <Text style={styles.toplamEtiket}>
            Genel Toplam:
          </Text>

          <Text style={styles.genelToplam}>
            ${toplamTutar.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7FB'
  },
  liste: {
    padding: 15
  },
  urunKart: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E9DFF5',
    elevation: 2
  },
  resim: {
    width: 100,
    height: 120,
    marginRight: 12
  },
  urunBilgi: {
    flex: 1
  },
  urunBaslik: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#51436B',
    marginBottom: 8
  },
  fiyat: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#8B68B5',
    marginBottom: 10
  },
  adetAlan: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  adetButon: {
    backgroundColor: '#EDE9FE',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  adetButonYazi: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#51436B'
  },
  adet: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#51436B',
    marginHorizontal: 15
  },
  araToplam: {
    fontSize: 14,
    color: '#51436B',
    marginBottom: 10
  },
  silButon: {
    backgroundColor: '#FCE7F3',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  silYazi: {
    color: '#A85591',
    fontWeight: 'bold'
  },
  altAlan: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderTopWidth: 1,
    borderColor: '#E9DFF5'
  },
  toplamSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  toplamEtiket: {
    fontSize: 16,
    color: '#51436B'
  },
  toplamDeger: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#51436B'
  },
  genelToplam: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#8B68B5'
  },
  bosSepet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF7FB'
  },
  bosIkon: {
    fontSize: 55,
    marginBottom: 15
  },
  bosBaslik: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#51436B',
    marginBottom: 8
  },
  bosAciklama: {
    fontSize: 15,
    color: '#968BA5'
  }
});
