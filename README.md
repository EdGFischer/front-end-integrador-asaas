

<h1 align="center">
   Front-End Integrador Asaas
  <br>
  Carteira de clientes
</h1>

<br>

<p align="center">
  <img
    src="https://img.shields.io/badge/vue.js-42b883?style=for-the-badge&logo=vue.js&logoColor=white"
    alt="Vue.js"
  >
  <img
    src="https://img.shields.io/badge/nuxt-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white"
    alt="Nuxt"
  >
  <img
    src="https://img.shields.io/badge/vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white"
    alt="Vuetify"
  >
  <img
    src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"
    alt="TypeScript"
  >
</p>

<br>

### 📝 Descrição

Aplicação front-end desenvolvida em Nuxt.js. A interface permite cadastro, autenticação e controle completo dos clientes via dashboard.

> 🔗 O projeto **back-end** está disponível em: [github.com/EdGFischer/api-integrador-asaas](https://github.com/EdGFischer/api_integrador_asaas)

---

### :hammer_and_wrench: Tecnologias
- [Vue.js](https://vuejs.org/)
- [Nuxt](https://nuxt.com/)
- [Vuetify](https://vuetifyjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

### :fire: Execução do projeto
  1. Instalação das dependências:
     ```
     npm i 
     ```
  2. Execução:
     ```
     npm run dev
     ```

### :link: Páginas
#### Usuários
  - `/`: tela inicial, rota pública para criação/solicitação de cliente.
  - `/login`: tela para login no sistema interno.
    

#### Rotas Internas - Necessário Autenticação
  - `system/dashboard`: página com dashboard, atualmente um gráfico com estatísticas da quantidade de clientes registrados nos últimos meses;
  - `system/client`: tela para controle de clientes. É possível cadastrar, listar, atualizar e deletar clientes;
    
   
