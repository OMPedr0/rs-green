"use client"

import React, { useEffect, useState } from "react";
import BackgroundFeed from "../components/bgtodos/bgfeed/bgfeed";
import { NavBar } from "../components/navbar/navbar";




import { auth, db } from "@/api/firebaseConfig";

import { onAuthStateChanged } from 'firebase/auth';
import { collection, where, query, getDocs, updateDoc } from 'firebase/firestore';
import { PostCreate } from "../components/posts/create/post";
import { PostCard } from "../components/posts/feed/feed";

interface Post {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  likes: number;
  userLogo: string;
  userName: string;
  imageURLs: string[]; // Agora, imageURLs é uma matriz de URLs das imagens
  // Adicione outras propriedades do post conforme necessário
}


export default function Feed() {
  const [showPostCreate, setShowPostCreate] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]); // State para armazenar os posts
  const [postsFetched, setPostsFetched] = useState(false);



  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, you can access the user's email.
        const userEmail = user.email;

        // Access the Firestore collection and query for the document with matching email.
        const userCollection = collection(db, 'users');
        const q = query(userCollection, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Retrieve the first document (there should be only one with the same email).
          const userData = querySnapshot.docs[0].data();

          // Store userData in localStorage.
          localStorage.setItem('userData', JSON.stringify(userData));
        } else {
          // Handle the case where no matching user was found.
        }
      } else {
        // Handle the case where no user is signed in.
      }
    });

    return () => unsubscribe();
  }, []);


  const handleShowPostCreate = () => {
    setShowPostCreate(true);
  };



  const fetchPostsFromFirestore = async (): Promise<Post[]> => {
    const postsRef = collection(db, "posts");
    const querySnapshot = await getDocs(postsRef);
    const posts: Post[] = [];

    querySnapshot.forEach((doc) => {
      // Converte o documento Firestore em um objeto JavaScript
      const post: Post = {
        id: doc.id,
        nome: doc.data().nome, // Use doc.data().nome para obter o nome do Firestore
        categoria: doc.data().categoria, // Use doc.data().categoria para obter a categoria do Firestore
        descricao: doc.data().descricao, // Use doc.data().descricao para obter a descrição do Firestore
        imageURLs: doc.data().imgs,
        userName: doc.data().userName,
        userLogo: doc.data().userLogo,
        likes: doc.data().likes, // Use doc.data().imgs para obter as imagens do Firestore
      };
      posts.push(post);
    });

    return posts;
  };


  useEffect(() => {
    if (!postsFetched) {
      const fetchPosts = async () => {
        const postsData = await fetchPostsFromFirestore();
        setPosts(postsData);
        
        setPostsFetched(true); 
      };
      fetchPosts();
    }
  }, [postsFetched]);


  console.log(posts)

  return (
    <BackgroundFeed>
      <div className="flex relative h-screen">
        <NavBar handleShowPostCreate={handleShowPostCreate} />

        {showPostCreate && (
          <div className="post-create-modal">
            <PostCreate onClose={() => setShowPostCreate(false)} />
          </div>
        )}

        {!showPostCreate && (
          <div className="fixed top-0 left-1/3 max-h-screen overflow-y-auto overflow-hidden">
            <div className="flex flex-col items-center">
              {posts.map((post) => (
                <div key={post.id} className="mb-4">
                      <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </BackgroundFeed>
  );
}
