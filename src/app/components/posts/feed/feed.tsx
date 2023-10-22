import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa'; // Importe os ícones desejados
import { ImageCard } from '../ImageCard/ImageCard';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Post {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  likes: number;
  userLogo:string;
  userName: string;
  imageURLs?: string[]; 
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {

  const [likes, setLikes] = useState(post.likes);
  const [isImageCardOpen, setImageCardOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };


  const openImageCard = (index: number) => {
    setSelectedImageIndex(index);
    setImageCardOpen(true);
  };

  const closeImageCard = () => {
    setImageCardOpen(false);
  };



  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="flex mt-8 justify-center w-full h-full">
      <div className="bg-text2 bg-opacity-25 max-w-screen-xl p-8 rounded-lg shadow-lg" style={{ width: '700px', height: '500px', overflowY: 'auto' }}>
      <Link href={`/feed/${post.id}`}>
        <div className="flex items-center justi-fy-between">
          <div className="flex items-center">
            
            <img
              src={post.userLogo}
              alt="Logo do Usuário"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-2">
              <p className="text-lg font-semibold">{post.userName} </p>
            </div>
          </div>
          
          <button className="text-blue-500 flex flex-row items-center">
            <FaShare className="mr-2" /> Compartilhar
          </button>

        </div>

        <div className="flex items-center">
          <div className="flex items-center">
            <p className="text-text text-lg right-full">{post.nome}</p>
          </div>
          <div className="flex items-center ml-auto">
            <h2 className="text-text text-lg font-semibold">{post.categoria}</h2>
          </div>

        </div>
        <p className="text-text text-sm mb-2">{post.descricao}</p>

        {post.imageURLs && post.imageURLs.length > 0 && (
          <div className="image-carousel mt-4">
            <Slider {...settings} slidesToShow={post.imageURLs.length > 2 ? 3 : post.imageURLs.length}>
              {post.imageURLs.map((imageUrl, index) => (
                <div className="w-40 h-40 relative" key={index}>
                  <img
                    src={imageUrl}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-md m-2"
                    style={{ cursor: 'pointer' }}
                  // onClick={() => openImageCard(index)} // Open image card on click
                  />
                </div>
              ))}
            </Slider>

            <div className="text-gray-600 mt-2">
              <span className="mr-2 text-text">{likes} Curtidas</span>
              <span className="text-text"> Comentários</span>
            </div>
          </div>
        )}

</Link>
        {/* {isImageCardOpen && post.imageURLs && (
          <ImageCard imageUrl={post.imageURLs[selectedImageIndex]} closeImageCard={closeImageCard} />
        )}
 */}

        <div className="post-actions border-t border-b mt-4 py-2 flex gap-4 justify-center">
          <button className="text-text mr-4" onClick={handleLikeClick}>
            <FaThumbsUp />
          </button>
          <button className="text-text mr-8 flex flex-row items-center">
            <FaComment className="mr-2" /> Comentar
          </button>
        </div>

      </div>
    </div>
  );



}
