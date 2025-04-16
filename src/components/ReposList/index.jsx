import { useState, useEffect } from "react";
import {
  list,
  listItem,
  listItemName,
  listItemLanguage,
  listItemLink,
} from "./ReposList.module.css";

export default function ReposList({ nomeUsuario }) {
  const [repos, setRepos] = useState([]);
  const [estaCarregando, setEstacarregando] = useState(true);
  const [erro, setErro] = useState(""); // o lance do desafio

  useEffect(() => {
    const buscarRepos = async () => { // ajuste para uma função asyncrona
      setEstacarregando(true);
      setErro("");

      try { // ajus para try / catch
        const resposta = await fetch(
          `https://api.github.com/users/${nomeUsuario}/repos`
        );

        if (!resposta.ok) {
          throw new Error("Usuário não encontrado ou erro na API.");
        }

        const res = await resposta.json();

        setTimeout(() => {
          setRepos(res);
          setEstacarregando(false);
        }, 2000);
      } catch (e) {
        console.error(e.message);
        setErro(e.message);
        setEstacarregando(false);
        setRepos([]); // deixando o array vazio para evitar erro na hora de validar o repos
      }
    };

    buscarRepos(); // chamando a função asyncrona
  }, [nomeUsuario]);

  return (
    <div className="container">
      {estaCarregando ? (
        <h4>Carregando...</h4>
      ) : erro ? ( // validação para mensagem de erro com ternário
        <h2>{erro}</h2>
      ) : (
        <ul className={list}>
          {repos.map(({ id, name, language, html_url }) => (
            <li key={id} className={listItem}>
              <div className={listItemName}>
                <b>Nome:</b> {name}
              </div>
              <div className={listItemLanguage}>
                <b>Linguagem:</b> {language}
              </div>
              <a
                className={listItemLink}
                href={html_url}
                target="_blank"
              >
                Visitar no GitHub
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
