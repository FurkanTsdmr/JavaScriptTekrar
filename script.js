// Zaman Yönetimi
let currentSection = 1;
const totalSections = 6;
const sectionTime = 15; // Her bölüm 15 dk

function updateProgress() {
  const progress = (currentSection / totalSections) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;

  // Aktif section'ı güncelle
  document.querySelectorAll(".time-slot").forEach((slot, index) => {
    slot.classList.toggle("active", index < currentSection);
  });
}

// Bölüme scroll fonksiyonu - SMOOTH
function scrollToSection(sectionNumber) {
  const sections = document.querySelectorAll(".section");
  if (sections[sectionNumber - 1]) {
    sections[sectionNumber - 1].scrollIntoView({
      behavior: "smooth",
      block: "start", // Yukarıya yapıştırmak yerine başlangıcı göster
    });

    // Progress'i de güncelle
    currentSection = sectionNumber;
    updateProgress();
  }
}

// Canlı Demo Fonksiyonları
function degiskenDeneme() {
  const input = document.getElementById("degiskenInput").value;
  let tip = typeof input;
  let deger = input;

  if (!isNaN(input) && input.trim() !== "") {
    tip = "number";
    deger = Number(input);
  } else if (
    input.toLowerCase() === "true" ||
    input.toLowerCase() === "false"
  ) {
    tip = "boolean";
    deger = input.toLowerCase() === "true";
  } else if (input.startsWith("[") && input.endsWith("]")) {
    tip = "array";
    deger = JSON.parse(input);
  }

  document.getElementById("degiskenResult").innerHTML = `
                <strong>Değer:</strong> ${deger}<br>
                <strong>Tip:</strong> ${tip}<br>
                <strong>React'ta kullanım:</strong> ${
                  tip === "array" || tip === "object"
                    ? "useState([]) veya useState({})"
                    : "useState()"
                }
            `;
}

function fonksiyonTest() {
  const sayi1 = parseInt(document.getElementById("sayi1").value) || 0;
  const sayi2 = parseInt(document.getElementById("sayi2").value) || 0;

  const topla = (a, b) => a + b;
  const carp = (a, b) => a * b;

  document.getElementById("fonksiyonResult").innerHTML = `
                <strong>Toplam:</strong> ${topla(sayi1, sayi2)}<br>
                <strong>Çarpım:</strong> ${carp(sayi1, sayi2)}<br>
                <strong>React bağlantısı:</strong> Arrow functions event handler'lar için ideal
            `;
}

function diziMap() {
  const urunler = [
    { id: 1, ad: "Laptop", fiyat: 15000 },
    { id: 2, ad: "Telefon", fiyat: 8000 },
    { id: 3, ad: "Tablet", fiyat: 5000 },
  ];

  const urunListesi = urunler
    .map(
      (urun) => `
                <div style="margin: 5px 0; padding: 5px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                    <strong>${urun.ad}</strong>: ${urun.fiyat} TL
                </div>
            `
    )
    .join("");

  document.getElementById("diziResult").innerHTML = `
                <strong>map() ile render edilen ürünler:</strong><br>
                ${urunListesi}<br>
                <small>React'ta JSX içinde tam bu şekilde kullanılır</small>
            `;
}

function diziFilter() {
  const urunler = [
    { id: 1, ad: "Laptop", fiyat: 15000 },
    { id: 2, ad: "Telefon", fiyat: 8000 },
    { id: 3, ad: "Tablet", fiyat: 5000 },
  ];

  const pahaliUrunler = urunler.filter((urun) => urun.fiyat > 10000);

  document.getElementById("diziResult").innerHTML = `
                <strong>filter() ile pahalı ürünler:</strong><br>
                ${JSON.stringify(pahaliUrunler, null, 2)}<br>
                <small>React'ta state'den filtreleme yaparken kullanılır</small>
            `;
}

function diziFind() {
  const urunler = [
    { id: 1, ad: "Laptop", fiyat: 15000 },
    { id: 2, ad: "Telefon", fiyat: 8000 },
    { id: 3, ad: "Tablet", fiyat: 5000 },
  ];

  const laptop = urunler.find((urun) => urun.ad === "Laptop");

  document.getElementById("diziResult").innerHTML = `
                <strong>find() ile laptop bulma:</strong><br>
                ${JSON.stringify(laptop, null, 2)}<br>
                <small>React'ta ID ile eleman bulmak için kullanılır</small>
            `;
}

function destructuringTest() {
  const kullanici = {
    ad: "Ayşe",
    yas: 30,
    sehir: "İstanbul",
    email: "ayse@example.com",
  };

  // Destructuring
  const { ad, yas, sehir } = kullanici;

  document.getElementById("destructuringResult").innerHTML = `
                <strong>Destructuring ile çıkarılan değerler:</strong><br>
                Ad: ${ad}<br>
                Yaş: ${yas}<br>
                Şehir: ${sehir}<br>
                <small>React'ta props alırken: ({ ad, yas }) şeklinde</small>
            `;
}

function spreadTest() {
  const kullanici = { ad: "Ali", yas: 25 };
  const ayarlar = { tema: "koyu", dil: "tr" };

  // Spread ile birleştirme
  const birlesik = {
    ...kullanici,
    ...ayarlar,
    yas: 26, // Güncelleme
  };

  document.getElementById("spreadResult").innerHTML = `
                <strong>Spread ile birleştirilmiş obje:</strong><br>
                <pre>${JSON.stringify(birlesik, null, 2)}</pre>
                <small>React'ta state güncellerken: setUser({...user, yas: 26})</small>
            `;
}

function asyncTest() {
  document.getElementById("asyncResult").innerHTML = `
                <div id="asyncLoader">⏳ Veriler yükleniyor (2 saniye simülasyonu)...</div>
            `;

  // Promise simülasyonu
  const fakeAPI = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 1, title: "React Öğren" },
            { id: 2, title: "JavaScript Tekrarı Yap" },
          ],
        });
      }, 2000);
    });
  };

  // Async/await kullanımı
  async function loadData() {
    try {
      const result = await fakeAPI();
      document.getElementById("asyncResult").innerHTML = `
                        <strong>✅ API Yanıtı:</strong><br>
                        <pre>${JSON.stringify(result, null, 2)}</pre>
                        <small>React'ta useEffect içinde bu şekilde kullanılır</small>
                    `;
    } catch (error) {
      document.getElementById("asyncResult").innerHTML = `
                        <strong>❌ Hata:</strong> ${error}
                    `;
    }
  }

  loadData();
}

// Otomatik zamanlayıcı (DÜZELTİLDİ: sectionTime düzgün hesaplandı)
let timerInterval = setInterval(() => {
  currentSection = Math.min(currentSection + 1, totalSections);
  updateProgress();

  // Tüm bölümler tamamlandığında timer'ı durdur
  if (currentSection >= totalSections) {
    clearInterval(timerInterval);
  }
}, (sectionTime * 60 * 1000) / 4); // Daha hızlı demo için 1/4 hızında

// İlk yükleme
updateProgress();

// BUTONLARA EVENT PREVENTION EKLE
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Sayfanın yukarı atılmasını engelle
    e.stopPropagation();
  });
});

// INPUT'lara tıklamada da engelle
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
