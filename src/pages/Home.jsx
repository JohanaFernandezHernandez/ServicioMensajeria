import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useThreadData } from "../hooks/useThreadData";
import {useStore} from "../Stores/store"
import DOMPurify from 'dompurify'; // Si decides usar sanitización

export const Home = () => {
  const threadData = useStore((state) => state.threadData);
  const {gethilo} = useThreadData();

  useEffect(() => {
    gethilo(); 
  }, [])

  // Sanitiza el contenido para evitar XSS si es necesario
  const sanitizedContent = DOMPurify.sanitize(threadData?.content || '');

  return (
    <div>
      <Navbar />
      <h1>Hola</h1>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
};
