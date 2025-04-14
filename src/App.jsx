
import { useState } from "react";
import Perfil from "./components/Perfil";
import ReposList from "./components/ReposList";

const App = () => {
  const [nomeUser, setNomeUser] = useState("");
  return (
    <>
      <div className={`input_initial ${nomeUser.length > 4 ? 'position' : ''}` }>
        <input type="text" onBlur={({ target }) => setNomeUser(target.value)} placeholder="Qual o seu usuário?"/>
      </div>

      {nomeUser.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUser} />

          <ReposList nomeUsuario={nomeUser} />
        </>
      )}
    </>
  );
};

export default App;
