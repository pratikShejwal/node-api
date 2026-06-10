# create-prtk-nodekit

A simple CLI tool to create a Node.js project with a predefined folder structure and configuration.

## Getting Started

Create a new project:

```bash
npx create-prtk-nodekit my-app
```

This will generate a new Node.js application inside the `my-app` directory.

## Why?

Every time I started a Node.js project, I found myself creating the same folders, configuration files, and setup repeatedly.

`create-prtk-nodekit` automates that process so you can start coding right away.

## Usage

```bash
npx create-prtk-nodekit project-name
```

Example:

```bash
npx create-prtk-nodekit url-shortener
```

## Generated Structure

```text
project-name/
├── src/
├── config/
├── routes/
├── controllers/
├── models/
├── package.json
└── ...
```

## Requirements

* Node.js
* npm

## Contributing

Feel free to open issues or submit pull requests.

## License

MIT
