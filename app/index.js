
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import UrunKarti from '../components/UrunKarti';
import { useSepet } from '../context/SepetContext';

export default function AnaSayfa() {
  const [urunler, setUrunler] = useState([]);
  const [arama, setArama] = useState('');
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');

  const router = useRouter();
  const { toplamAdet } = useSepet();

  const urunleriGetir = async () => {
    try {
      setYukleniyor(true);
      setHata('');

      const cevap = await fetch(
        'https://dummyjson.com/products?limit=20'
      );

      if (!cevap.ok) {
        throw new Error('Ürünler alınamadı.');
      }

      const veri = await cevap.json();
      setUrunler(veri.products);

    } catch (error) {
      setHata('Ürünler yüklenirken bir hata oluştu.');
    } finally {
      setYukleniyor(false);
    }
  };

  useEffect(() => {
    urunleriGetir();
  }, []);

  const filtrelenmisUrunler = urunler.filter((urun) =>
    urun.title.toLocaleLowerCase('tr-TR')
      .includes(arama.toLocaleLowerCase('tr-TR'))
  );

  if (yukleniyor) {
    return (
      <View style={styles.merkez}>
        <ActivityIndicator size="large" color="#A78BCE" />
        <Text style={styles.bilgi}>
          Ürünler yükleniyor...
        </Text>
      </View>
    );
  }

  if (hata) {
    return (
      <View style={styles.merkez}>
        <Text style={styles.hata}>{hata}</Text>

        <Pressable
          style={styles.buton}
          onPress={urunleriGetir}
        >
          <Text style={styles.butonYazi}>
            Tekrar Dene
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ustAlan}>
        <Text style={styles.baslik}>Ürünler</Text>

        <Pressable
          style={styles.sepetButon}
          onPress={() => router.push('/sepet')}
        >
          <Text style={styles.sepetYazi}>
            🛒 Sepetim ({toplamAdet})
          </Text>
        </Pressable>
      </View>

      <TextInput
        style={styles.aramaKutusu}
        placeholder="Ürün ara..."
        placeholderTextColor="#968BA5"
        value={arama}
        onChangeText={setArama}
      />

      <FlatList
        data={filtrelenmisUrunler}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UrunKarti
            urun={item}
            onPress={() => router.push(`/urun/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.liste}
        ListEmptyComponent={
          <Text style={styles.bulunamadi}>
            Aradığınız ürün bulunamadı.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7FB',
    padding: 16,
  },
  ustAlan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  baslik: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#51436B',
  },
  sepetButon: {
    backgroundColor: '#A78BCE',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  sepetYazi: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  aramaKutusu: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDE9FE',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: '#51436B',
    marginBottom: 15,
  },
  liste: {
    paddingBottom: 20,
  },
  merkez: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FDF7FB',
  },
  bilgi: {
    marginTop: 12,
    fontSize: 16,
    color: '#51436B',
  },
  hata: {
    color: '#A85591',
    fontSize: 16,
    marginBottom: 15,
  },
  buton: {
    backgroundColor: '#A78BCE',
    padding: 12,
    borderRadius: 10,
  },
  butonYazi: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bulunamadi: {
    textAlign: 'center',
    color: '#968BA5',
    fontSize: 15,
    marginTop: 30,
  },
});
