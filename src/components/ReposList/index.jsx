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

  useEffect(() => {
    setEstacarregando(true);
    fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
      .then((res) => res.json())
      .then((resJson) => {
        setTimeout(() => {
          setEstacarregando(false);
          setRepos(resJson);
        }, 2000);
        console.log(resJson);
      });
  }, [nomeUsuario]);

  return (
    <div className="container">
      {estaCarregando ? (
        <h4>Carregando ...</h4>
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
                rel="noopener noreferrer"
              >
                Visitar no github
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
