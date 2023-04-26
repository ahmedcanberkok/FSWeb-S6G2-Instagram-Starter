/* 
  Buradan başlayın ve iç içe geçmiş bileşenlere doğru ilerleyin.
  Projedeki tüm dosyalara kod eklenmesi gerekmez.
  Nerelerde değişiklik yapmanız gerektiğini anlamak için her dosyayı inceleyin.
*/

// State hook u import edin
import React, { useState } from 'react';

// Gönderiler (çoğul!) ve AramaÇubuğu bileşenlerini import edin, çünkü bunlar App bileşeni içinde kullanılacak
// sahteVeri'yi import edin
import BeğenBölümü from './bileşenler/Gönderiler/BeğenBölümü';
import Gönderi from './bileşenler/Gönderiler/Gönderi';
import GönderiBaşlığı from './bileşenler/Gönderiler/GönderiBaşlığı';
import Gönderiler from './bileşenler/Gönderiler/Gönderiler';
import AramaÇubuğu from './bileşenler/AramaÇubuğu/AramaÇubuğu';
import './App.css';
import sahteVeri from './sahte-veri';
const App = () => {
  const [gonderiler, setGonderiler] = useState(sahteVeri)
  const [arama, setArama] = useState("");
  // Gönderi nesneleri dizisini tutmak için "gonderiler" adlı bir state oluşturun, **sahteVeri'yi yükleyin**.
  // Artık sahteVeri'ye ihtiyacınız olmayacak.
  // Arama çubuğunun çalışması için , arama kriterini tutacak başka bir state'e ihtiyacımız olacak.

  const searchUser = (val) => {
    setArama(val);
    val === undefined || val === "" || val === null ? setGonderiler(sahteVeri) : setGonderiler(sahteVeri.filter(gonderi => gonderi.username.includes(val)));
  }
  const gonderiyiBegen = gonderiID => {
    /*
      Bu fonksiyon, belirli bir id ile gönderinin beğeni sayısını bir artırma amacına hizmet eder.

      Uygulamanın durumu, React ağacının en üstünde bulunur, ancak iç içe geçmiş bileşenlerin stateleri değiştirememesi adil olmaz!
      Bu fonksiyon, belirli bir gönderinin beğeni sayısını artırılmasına olanak sağlamak amacıyla iç içe geçmiş bileşenlere aktarılır.

    "setGonderi" yi çağırın ve state ine "posts.map" çağrısını iletin.
      `map` içine iletilen callback aşağıdaki mantığı gerçekleştirir:
        - gönderinin idsi "gonderiID" ile eşleşirse, istenen değerlerle yeni bir gönderi nesnesi döndürün.
        - aksi takdirde, sadece gönderi nesnesini değiştirmeden döndürün.
     */
    const gonderi = gonderiler.find(g => g.id === gonderiID);
    if (gonderi) {
      const updatedGonderi = {
        ...gonderi,
        likes: gonderi.likes + 1
      };
      setGonderiler(prevState => prevState.map(g => (g.id === gonderiID ? updatedGonderi : g)));
    };

  }
  return (
    <div className='App'>
      <AramaÇubuğu arama={arama} setArama={searchUser} />
      <Gönderiler gonderiler={gonderiler} setGonderiler={gonderiyiBegen} />
      {/* AramaÇubuğu ve Gönderiler'i render etmesi için buraya ekleyin */}
      {/* Her bileşenin hangi proplara ihtiyaç duyduğunu kontrol edin, eğer ihtiyaç varsa ekleyin! */}
      {gonderiler.map((gonderi) => (
        <div key={gonderi.id} >
          <img src={gonderi.thumbnailUrl} ></img>
          <p >{gonderi.username}</p>
          <img src={gonderi.imageUrl} ></img>
          <button onClick={gonderiyiBegen}>Like</button>
          <div >
            <ul>
              {gonderi.comments.map((comment) => (
                  <li key={comment.id}>
                  <p>{comment.username} : {comment.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
