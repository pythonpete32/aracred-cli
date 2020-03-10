# Aracred CLI

Aracred CLI runs SourceCred on a Discorse server, and mints the cred on chain in an Aragon DAO

## Deployment

Clone the SourceCred Repo and install deps

```
https://github.com/sourcecred/sourcecred.git && cd sourcecred && npm i
```

install the aragonCLI globally. If you have trouble installing the cli, check out [this guide](./)

```
npm i -g @aragon/cli
```

clone this repo and install deps

```
[add when push] && cd aracred && npm i
```

open the `config.json` file and edit insert your GitHib token, Forum URL, and DAO addresses

link the package so it can be refrenced globaly

```
npm link
```

navigate back to the SourceCred folder and type `aracli` into the terminal
