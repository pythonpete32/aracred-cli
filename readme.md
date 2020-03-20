# Aracred CLI

Aracred CLI runs SourceCred on a Discorse server, and mints the cred on chain in an Aragon DAO

## Deployment

Clone the SourceCred Repo and install deps

```
git clone https://github.com/sourcecred/sourcecred.git && cd sourcecred && npm i
```

install the aragonCLI globally. If you have trouble installing the cli, check out [this guide](https://hack.aragon.org/docs/guides-faq)

```
npm i -g @aragon/cli
```

clone this repo and install deps

```
git clone https://github.com/pythonpete32/aracred-cli/ && cd aracred && npm i
```

link the package so it can be refrenced globaly

```
npm link
```

navigate back to the SourceCred folder and type `aracred` into the terminal
