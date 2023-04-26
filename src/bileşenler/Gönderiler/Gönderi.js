import React, {useState} from 'react';
import Yorumlar from '../Yorumlar/Yorumlar';
import BeğenBölümü from './BeğenBölümü';
import GönderiBaşlığı from './GönderiBaşlığı';

const Gönderi = props => {
  // 🔥 Bu bileşenin parentının aşağıdaki propları düzgün gönderdiğinden emin olun.
  const { gönderi, gonderiyiBegen } = props,
        [likesList, setLikesList] = useState([]),
        [heartColor, setHeartColor] = useState("black");

  const likesControl = (gonderiID) => {
    let like = likesList.includes(gonderiID);
    if(like) {
      setLikesList(likesList.filter(id => id !== gonderiID));
      setHeartColor("black");
      gonderiyiBegen(gonderiID, false);
    }else{
      let newList = [...likesList];
      newList.push(gonderiID)
      setLikesList(newList);
      setHeartColor("red");
      gonderiyiBegen(gonderiID, false);
    }
  };

  return (
    <div className='post-border'>
      <GönderiBaşlığı
        username={gönderi.username}
        thumbnailUrl={gönderi.thumbnailUrl}
      />
      <div className='post-image-wrapper'>
        <img
          alt='post thumbnail'
          className='post-image'
          src={gönderi.imageUrl}
        />
      </div>
      {/* BeğenBölümü düzgün çalışması için ihtiyaç duyduğu tüm proplara sahip mi? */}
      <BeğenBölümü begeniSayisi={gönderi.likes} gonderiyiBegen={() => likesControl(gönderi.id)} heartColor={heartColor}/>
      {/* Yorumlar da proplara dikkat istiyor! */}
      <Yorumlar yorumlar={gönderi.comments}/>
    </div>
  );
};

export default Gönderi;