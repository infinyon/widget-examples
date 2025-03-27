import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from "react-dom/client";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styleText from "./App.css?inline";

function App({ wsUrl }) {
    const [count, setCount] = useState(0);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const ws = new WebSocket(wsUrl);
        ws.onmessage = (event) => {
            setEvents((prevEvents) => [...prevEvents, event.data]);
        };

        return () => {
            ws.close();
        };
    }, [wsUrl]);

    return (
        <div id="main">
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

            <div>
                <h3>WebSocket Events:</h3>
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>{event}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// Define the Web Component inside App.jsx
if (!customElements.get("infinyon-vite-react-template-0-0-3")) {
    class MyWebComponent extends HTMLElement {
        constructor() {
            super();

            this.root = this.attachShadow({ mode: "open" });
            this.root.innerHTML = `
              <!-- Styles are scoped -->
              <style>
                ${styleText}
              </style>
            `;
        }

        connectedCallback() {
            const mountPoint = document.createElement("div");
            this.root.appendChild(mountPoint);

            const wsUrl = this.getAttribute("ws-gateway-url");
            if (!wsUrl) {
                throw new Error("ws-gateway-url attribute is required");
            }

            createRoot(mountPoint).render(
                <StrictMode>
                    <App wsUrl={wsUrl} />
                </StrictMode>
            );
        }
    }

    customElements.define("infinyon-vite-react-template-0-0-3", MyWebComponent);
}

export default App;
