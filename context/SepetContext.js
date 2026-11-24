
import React, { createContext, useContext, useState } from 'react';

// Sepet için Context oluşturuyoruz.
const SepetContext = createContext();

// Sepet işlemlerini yöneten Provider
export function SepetProvider({ children }) {

  const [sepet, setSepet] = useState([]);

  // Sepete ürün ekleme
  const sepeteEkle = (urun) => {
    setSepet((oncekiSepet) => {
      const mevcutUrun = oncekiSepet.find(
        (item) => item.id === urun.id
      );

      if (mevcutUrun) {
        return oncekiSepet.map((item) =>
          item.id === urun.id
            ? { ...item, adet: item.adet + 1 }
            : item
        );
      }

      return [...oncekiSepet, { ...urun, adet: 1 }];
    });
  };

  // Sepetten ürün silme
  const urunSil = (id) => {
    setSepet((oncekiSepet) =>
      oncekiSepet.filter((item) => item.id !== id)
    );
  };

  // Ürün adedini artırma
  const adetArtir = (id) => {
    setSepet((oncekiSepet) =>
      oncekiSepet.map((item) =>
        item.id === id
          ? { ...item, adet: item.adet + 1 }
          : item
      )
    );
  };

  // Ürün adedini azaltma
  const adetAzalt = (id) => {
    setSepet((oncekiSepet) =>
      oncekiSepet
        .map((item) =>
          item.id === id
            ? { ...item, adet: item.adet - 1 }
            : item
        )
        .filter((item) => item.adet > 0)
    );
  };

  // Sepetteki toplam ürün adedi
  const toplamAdet = sepet.reduce(
    (toplam, item) => toplam + item.adet,
    0
  );

  // Sepetin toplam fiyatı
  const toplamTutar = sepet.reduce(
    (toplam, item) => toplam + item.price * item.adet,
    0
  );

  return (
    <SepetContext.Provider
      value={{
        sepet,
        sepeteEkle,
        urunSil,
        adetArtir,
        adetAzalt,
        toplamAdet,
        toplamTutar
      }}
    >
      {children}
    </SepetContext.Provider>
  );
}

// Context verilerine erişmek için özel Hook
export function useSepet() {
  return useContext(SepetContext);
}
