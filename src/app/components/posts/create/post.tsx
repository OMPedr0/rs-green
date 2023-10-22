import React, { useState,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { FaTrash } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { auth, db, storage } from '@/api/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Post {
  nome: string;
  categoria: string;
  descricao: string;
  likes: number;
  user_id:string;
  userName:string;
  userLogo:string;
  imgs: File[];
}

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  userLogo: string;
  username: string;
}


export function PostCreate({ onClose }: { onClose: () => void }) {
  const [post, setPost] = useState<Post>({
    nome: '',
    categoria: '',
    descricao: '',
    userName: '',
    user_id: '',
    userLogo: '',
    likes: 0,
    imgs: [],
  });
  const [userData, setUserData] = useState<UserData | null>(null);

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


  useEffect(() => {
    // Carregar dados do usuário atual a partir do localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userDataObj: UserData = JSON.parse(userDataString);
      setUserData(userDataObj);
    }
  }, []);

  const handleCreatePost = async () => {
    if (!post.nome || !post.categoria || !post.descricao || post.imgs.length === 0) {
      toast.error("Preencha todos os campos obrigatórios e adicione pelo menos uma imagem.");
      return;
    }
    try {
      // Crie uma referência ao Firebase Storage para cada imagem e faça upload
      const imageURLs = await Promise.all(
        post.imgs.map(async (image) => {
          const storageRef = ref(storage, `images/${image.name}`);
          const uploadTask = uploadBytes(storageRef, image);
          await uploadTask;
          return getDownloadURL(storageRef);
        })
      );
  
      // Crie uma referência à coleção "posts" no Firestore
      
  
      if (userData && userData.username) {
        const postsRef = collection(db, "posts");

        const postData = {
          nome: post.nome,
          categoria: post.categoria,
          descricao: post.descricao,
          user_id: auth.currentUser?.uid,
          userName: userData.username,
          userLogo: userData.userLogo,
          likes: 0,
          imgs: imageURLs,
        };
      
        await addDoc(postsRef, postData);
      } else {
        console.error("userData or userData.userName is undefined.");
        // Lide com a situação em que userData ou userData.userName são undefined
      }
      // Adicione os dados do post ao Firestore
      
  
      // Limpe o estado do post após a criação bem-sucedida
      setPost({
        nome: "",
        categoria: "",
        descricao: "",
        userLogo:"",
        userName:"",
        user_id: "",
        likes: 0,
        imgs: [],
      });
  
      toast.success("Publicação publicada com sucesso!", { theme: "dark" });
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar documento: ", error);
    }
  };
  

  const handleCancel = () => {
    setPost({
      nome: "",
      categoria: "",
      descricao: "",
      userLogo:"",
      userName:"",
      user_id: "",
      likes: 0,
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
    <div>
    <ToastContainer />
   <div className={`fixed top-1/4 left-1/2 mt-8 transform -translate-x-1/2 -translate-y-1/2 bg-text2 bg-opacity-25 p-8 rounded-lg shadow-lg z-50 max-h-screen h-auto transition-height duration-300 ease-in-out overflow-y-auto ${post.imgs.length > 0 ? 'h-auto mt-32' : 'h-[30rem]'}`}>
      <h2 className="text-2xl font-semibold mb-4">Criar um novo post</h2>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={post.nome}
          onChange={handleInputChange}
          className="w-1/2 p-2 border rounded bg-text1 focus:outline-none focus:ring-2 ring-bg1 ring-opacity-25 focus:border-bg1 placeholder:text-text3"
        />

        <select
          name="categoria"
          value={post.categoria}
          onChange={handleCategoriaChange}
          className="w-1/2 ml-2 gap-2 p-2 border rounded bg-text1 focus:outline-none focus:ring-2 ring-bg1 ring-opacity-25 focus:border-bg1 text-text3 placeholder-text-text3"
        >
          <option value="" disabled hidden>Escolha a categoria</option>
          <option value="Agricultural Techniques">Agricultural Techniques</option>
          <option value="Medicinal Techniques">Medicinal Techniques</option>
          <option value="Solving Problems About Agriculture<">Solving Problems About Agriculture</option>
        </select>

      </div>

      <textarea
        name="descricao"
        placeholder="Descrição"
        value={post.descricao}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 h-40 order rounded bg-text1 focus:outline-none focus:ring-2 ring-bg1 ring-opacity-25 focus:border-bg1  placeholder:text-text3"
      />


      <div {...getRootProps()} className="dropzone w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 ring-bg1 ring-opacity-25 focus:border-bg1 ">
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
    </div>
  );
}
