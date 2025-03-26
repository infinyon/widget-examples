import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styleText from "./App.css?inline"

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

// Define the Web Component inside App.jsx
if (!customElements.get("my-react-app")) {
    class MyWebComponent extends HTMLElement {
        constructor() {
            super();

            this.root = this.attachShadow({ mode: "open" });
            this.root.innerHTML = `
              <!-- Styles are scoped -->
              <style>
                ${styleText}
              </style>
              <div>
                <p>Hello World</p>
              </div>
            `;
        }

        connectedCallback() {
            const mountPoint = document.createElement("div");

            // Inject styles into the Shadow DOM
            const style = document.createElement("style");
            style.textContent = `
                @import url('./App.css'); /* Ensure animations and styles are loaded */
            `;

            this.root.appendChild(style);
            this.root.appendChild(mountPoint);

            createRoot(mountPoint).render(
                <StrictMode>
                    <App />
                </StrictMode>
            );
        }
    }

    customElements.define("my-react-app", MyWebComponent);
}

export default App;
