<<<<<<< HEAD
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
=======
# Power tools

> For Aragon Power users
> These are a collection of power tools for Aragon power users.

### Problem: CLI Too Difficult For Most Power Users

-   Cli is a very powerfull tool.
-   However it requires a degree of technical sofistication
-   most of its potential users [.......]

### Solution:

### Result:

npm i
node index.js

```
## behaviour
- [x] on start up it loads the last DAO if there was one
- [x] asks user to use this dao or new
  - [x] if new enter the add dao flow
- [x] drops into tool selection, displys all 4 tools with information
  - [x] drops into tool flow
  - [x] confirm submittion
- [x] submit transaction
- [ ] add sourcecred

```
>>>>>>> start SC logic
