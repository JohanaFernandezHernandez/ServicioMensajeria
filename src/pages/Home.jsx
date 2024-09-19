import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useThreadData } from "../hooks/useThreadData";
import { useStore } from "../Stores/store";
import DOMPurify from "dompurify"; // Si decides usar sanitización
import Form from "../components/Form";
import { Footer } from "../components/Footer";
import "../styles/home.scss";

export const Home = () => {
  const threadData = useStore((state) => state.threadData);
  const { getHilo } = useThreadData();

  useEffect(() => {
    getHilo();
  }, []);

  // Sanitiza el contenido para evitar XSS si es necesario
  const sanitizedContent = DOMPurify.sanitize(threadData?.content || "");

  return (
    <div className="home">
      <Navbar />
      <main className="home__main">
        <div
          className="home__thread-content"
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
