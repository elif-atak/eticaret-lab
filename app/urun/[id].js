
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSepet } from '../../context/SepetContext';

export default function UrunDetay() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { sepeteEkle } = useSepet();

  const [urun, setUrun] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setUrun(data))
      .catch(() => {
        Alert.alert('Hata', 'Ürün bilgileri alınamadı.');
      })
      .finally(() => setYukleniyor(false));
  }, [id]);

  if (yukleniyor) {
    return (
      <View style={styles.merkez}>
        <Text style={styles.bilgi}>Ürün yükleniyor...</Text>
      </View>
    );
  }

  if (!urun) {
    return (
      <View style={styles.merkez}>
        <Text style={styles.bilgi}>Ürün bulunamadı.</Text>
      </View>
    );
  }

  const indirimliFiyat =
    urun.price * (1 - urun.discountPercentage / 100);

  const sepeteEkleVeBilgiVer = () => {
    sepeteEkle(urun);

    Alert.alert(
      'Başarılı',
      'Ürün sepetinize eklendi.',
      [
        {
          text: 'Alışverişe Devam Et',
          style: 'cancel',
        },
        {
          text: 'Sepete Git',
          onPress: () => router.push('/sepet'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: urun.thumbnail }}
        style={styles.resim}
        resizeMode="contain"
      />

      <View style={styles.icerik}>
        <Text style={styles.baslik}>{urun.title}</Text>

        <Text style={styles.puan}>
          ⭐ {urun.rating} / 5
        </Text>

        <Text style={styles.eskiFiyat}>
          ${urun.price.toFixed(2)}
        </Text>

        <Text style={styles.indirimliFiyat}>
          ${indirimliFiyat.toFixed(2)}
        </Text>

        <Text style={styles.indirimEtiketi}>
          %{urun.discountPercentage.toFixed(0)} indirim
        </Text>

        <Text style={styles.aciklamaBaslik}>
          Ürün Açıklaması
        </Text>

        <Text style={styles.aciklama}>
          {urun.description}
        </Text>

        <Text style={styles.stok}>
          Stok: {urun.stock} adet
        </Text>

        <Pressable
          style={styles.sepetButon}
          onPress={sepeteEkleVeBilgiVer}
        >
          <Text style={styles.butonYazi}>
            🛒 Sepete Ekle
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7FB',
  },
  merkez: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF7FB',
  },
  bilgi: {
    color: '#51436B',
    fontSize: 16,
  },
  resim: {
    width: '100%',
    height: 280,
    backgroundColor: '#FFFFFF',
  },
  icerik: {
    padding: 20,
  },
  baslik: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#51436B',
  },
  puan: {
    fontSize: 14,
    color: '#968BA5',
    marginTop: 8,
  },
  eskiFiyat: {
    fontSize: 15,
    color: '#968BA5',
    textDecorationLine: 'line-through',
    marginTop: 15,
  },
  indirimliFiyat: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#8B68B5',
    marginTop: 3,
  },
  indirimEtiketi: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDE9FE',
    color: '#8B68B5',
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
  },
  aciklamaBaslik: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#51436B',
    marginTop: 25,
    marginBottom: 8,
  },
  aciklama: {
    fontSize: 14,
    color: '#51436B',
    lineHeight: 22,
  },
  stok: {
    fontSize: 14,
    color: '#968BA5',
    marginTop: 15,
  },
  sepetButon: {
    backgroundColor: '#A78BCE',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  butonYazi: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
