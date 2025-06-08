import TrilhaHTML from "./components-trilhas/TrilhaHTML";
import TrilhaCSS from "./components-trilhas/TrilhaCSS";
import TrilhaJavaScript from "./components-trilhas/TrilhaJavaScript";

function App() {
  return (
    <main className="min-h-screen p-8 bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Trilhas de Aprendizado
        </h1>
        <p className="text-gray-400 text-center mb-10">
          Siga o caminho de cada trilha para dominar as tecnologias web
          fundamentais
        </p>

        <div className="space-y-12">
          <TrilhaHTML />
          <TrilhaCSS />
          <TrilhaJavaScript />
        </div>
      </div>
    </main>
  );
}

export default App;
