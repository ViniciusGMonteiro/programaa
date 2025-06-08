module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true, // Isso permite variáveis como require, module, etc.
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    // Suas regras personalizadas aqui
    "react/react-in-jsx-scope": "off", // Desativa a necessidade de importar React em cada arquivo JSX (para React 17+)
    "react/prop-types": "off", // Opcional: desativa a verificação de prop-types se você não estiver usando
  },
  settings: {
    react: {
      version: "detect", // Detecta automaticamente a versão do React
    },
  },
  overrides: [
    {
      // Configurações específicas para arquivos de configuração
      files: ["*.config.js", "*.config.cjs", "vite.config.js", "tailwind.config.js"],
      env: {
        node: true,
      },
    },
  ],
}
