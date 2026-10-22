import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/anton";
import "@fontsource-variable/inter-tight";
import "@fontsource/jetbrains-mono";
import "./styles.css";
import { Stage } from "./components/Stage";
import { Chrome } from "./components/Chrome";
import { Preloader } from "./components/Preloader";
import { Hero } from "./scenes/Hero";
import { About } from "./scenes/About";
import { Work } from "./scenes/Work";
import { Journey } from "./scenes/Journey";
import { Skills } from "./scenes/Skills";
import { Awards } from "./scenes/Awards";
import { Contact } from "./scenes/Contact";
import { director } from "./engine/director";

function App() {
  return <>
    <div className="layer-back" aria-hidden="true"><div className="back-about"/><div className="back-grid"/></div>
    <Stage />
    <div className="layer-front" aria-hidden="true"/>
    <Chrome />
    <main>
      <Hero/><About/><Work/><Journey/><Skills/><Awards/><Contact/>
    </main>
    <Preloader />
    <div className="cursor-dot" aria-hidden="true"/><div className="cursor-ring" aria-hidden="true"/>
  </>;
}

createRoot(document.getElementById("root")!).render(<App />);