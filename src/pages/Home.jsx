import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useThreadData } from "../hooks/useThreadData";
import { useStore } from "../Stores/store";
import DOMPurify from "dompurify"; // Si decides usar sanitización
import Form from "../components/Form";
import { Footer } from "../components/Footer";
import "../styles/main.scss";

export const Home = () => {
  const threadData = useStore((state) => state.threadData);
  const { getHilo } = useThreadData();

  useEffect(() => {
    getHilo();
  }, []);

  // Sanitiza el contenido para evitar XSS si es necesario
  const sanitizedContent = DOMPurify.sanitize(threadData?.content || "");

  return (
    <div className="container_principal">
      <Navbar />
      <main className="main">
        <div
          className="thread-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <Form
          forms={threadData?.agreement?.forms}
          button={threadData?.agreement}
        />
      </main>

      <Footer />
    </div>
  );
};
