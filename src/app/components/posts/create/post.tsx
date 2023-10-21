import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaTrash } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Post {
  nome: string;
  categoria: string;
  descricao: string;
  imgs: File[];
}

export function PostCreate({ onClose }: { onClose: () => void }) {
  const [post, setPost] = useState<Post>({
    nome: '',
    categoria: '',
    descricao: '',
    imgs: [],
  });

  const [isVisible, setIsVisible] = useState(true);

  const onDrop = (acceptedFiles: File[]) => {
    setPost({ ...post, imgs: [...post.imgs, ...acceptedFiles] });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImgs = [...post.imgs];
    updatedImgs.splice(index, 1);
    setPost({ ...post, imgs: updatedImgs });
  };

  const handleCreatePost = () => {
    console.log('Novo post:', post);
    setPost({
      nome: '',
      categoria: '',
      descricao: '',
      imgs: [],
    });
  };

  const handleCancel = () => {
    setPost({
      nome: '',
      categoria: '',
      descricao: '',
      imgs: [],
    });
    onClose();
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed top-1/3 left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-text2 bg-opacity-25 p-8 rounded-lg shadow-lg z-50 mt-4 ${post.imgs.length > 0 ? 'h-auto' : 'h-[28rem]'}`}>
    <h2 className="text-2xl font-semibold mb-4">Criar um novo post</h2>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={post.nome}
          onChange={handleInputChange}
          className="w-1/2 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          name="categoria"
          value={post.categoria}
          onChange={handleCategoriaChange}
          placeholder="Escolha a categoria"
          className="w-1/2 ml-2 gap-2 p-2 border rounded text-text2 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" disabled className='text-text2'>Selecione uma categoria</option>
          <option value="categoria1" className='text-text2'>Categoria 1</option>
          <option value="categoria2" className='text-text2'>Categoria 2</option>
          <option value="categoria3" className='text-text2'>Categoria 3</option>
        </select>
      </div>

      <textarea
        name="descricao"
        placeholder="Descrição"
        value={post.descricao}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />

      <div {...getRootProps()} className="dropzone w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300">
        <input {...getInputProps()} />
        <p>Arraste e solte algumas imagens ou clique para selecionar.</p>
      </div>


      <div className="mb-4 max-w-lg mx-auto">
  {post.imgs.length ? (
    <Slider {...settings} slidesToShow={post.imgs.length > 2 ? 3 : post.imgs.length}>
      {post.imgs.map((file, index) => (
        <div key={index} className="relative">
          <div className="w-40 h-40 relative">
            <img
              src={URL.createObjectURL(file)}
              alt="Imagem selecionada"
              className="w-full h-full object-cover rounded-lg shadow-md m-1"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 m-1 bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition duration-300 ease-in-out flex items-center justify-center"
            >
              <FaTrash /> {/* Ícone de lixo do react-icons */}
            </button>
          </div>
        </div>
      ))}
    </Slider>
  ) : null}
</div>







      <div className="flex justify-end">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover-bg-gray-500 mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleCreatePost}
          className="px-4 py-2 bg-blue hover-bg-blue1  text-white rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>
    </div>
  );
}
