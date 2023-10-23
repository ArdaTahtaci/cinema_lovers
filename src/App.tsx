import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Root from "./routes/Root";
import { DarkContextProvider } from "./context/DarkModeContext";
import { WindowSizeProvider } from "./context/WindowSize";

function App() {


    return (
        <WindowSizeProvider>
            <DarkContextProvider>
                <div className="App" >

                    <Root />

                </div>
            </DarkContextProvider >
        </WindowSizeProvider>
    );
}

export default App;