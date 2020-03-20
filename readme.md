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

Navigate back to the SourceCred folder and type `aracred` into the terminal. This will create `toMint.csv` and `addresses.csv` files. Edit `addresses.csv` to add user's addresses and use `aracred addresses` to obtain a new `addresses.json` file that can be uploaded as local labels in Aragon Client.
