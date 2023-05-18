# Boas-vindas ao repositório do projeto App de Receitas realizado na Trybe!

Esse foi um projeto final do módulo de front-end que foi realizado em grupo. Nele aplicamos os seguintes conceitos:
- Context API do React para gerenciar estados,
- React Hooks
- HTML  
- CSS.
- kanban para organização

Nesse projeto consumimos duas API's externas.
<br />
O layout tem como foco dispositivos móveis, dessa forma todos os protótipos vão estar desenvolvidos em telas menores.

<details>
<summary><strong>👥 Integrantes do grupo:</strong></summary><br />
<ul>
  <li><a href="https://www.linkedin.com/in/ricielli-costa/"> Ricielli Costa </a></li>
  <li><a href="https://www.linkedin.com/in/carlosparaujo/"> Carlos Alberto P. Araújo </a></li>
  <li><a href="https://www.linkedin.com/in/pedro-santana-dev/"> Pedro Santana </a></li>
  <li><a href="https://www.linkedin.com/in/lucas-baach-dev/"> Lucas Baach </a></li>
  <li><a href="https://www.linkedin.com/in/silmar-lessa/"> Silmar Lessa Seixas Junior </a></li>
</ul>
</details>
  
Esse projeto é um app de receitas onde é possível: ver, buscar, filtrar, favoritar e acompanhar o progresso de preparação de receitas de comidas e bebidas!
Grande parte desse projeto foi realizado em pair programming pois nas dailys meeting realizadas, observamos algumas dificuldades e decidimos seguir por esse caminho.

   <details>
   <summary><strong>‼️ Orientações</strong></summary><br />

  1. Clone o repositório

  - Use o comando: `git clone git@github.com:RicielliCosta/trybe-recipe-app-project.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd trybe-recipe-app-project
  
  2. Instale as dependências e inicialize o projeto
  
  - Certifique que está na versão 16 do node:
    - nvm use 16
  - Instale as dependências:
    - `npm install`
  - Inicialize o projeto:
    - `npm start
     <br />
  
    <details><summary><b> Rotas</b></summary>

      * Tela de login: `/`;
      * Tela principal de receitas de comidas: `/meals`;
      * Tela principal de receitas de bebidas: `/drinks`;
      * Tela de detalhes de uma receita de comida: `/meals/{id-da-receita}`;
      * Tela de detalhes de uma receita de bebida: `/drinks/{id-da-receita}`;
      * Tela de receita em progresso de comida: `/meals/{id-da-receita}/in-progress`;
      * Tela de receita em progresso de bebida: `/drinks/{id-da-receita}/in-progress`;
      * Tela de perfil: `/profile`;
      * Tela de receitas feitas: `/done-recipes`;
      * Tela de receitas favoritas: `/favorite-recipes`.
      </details>

</details>


<details>
<summary><strong>💾 Arquivos desenvolvidos pelo grupo:</strong></summary><br />
- src/App.js<br />
- src/App.css<br />
- src/components/Drinks.jsx<br />
- src/components/DrinksDetail.jsx<br />
- src/components/Footer.jsx<br />
- src/components/Header.jsx<br />
- src/components/Meals.jsx<br />
- src/components/MealsDetail.jsx<br />
- src/components/SearchBar.jsx<br />
- src/context/RecipesContext.js<br />
- src/context/RecipesProvider.jsx<br />
- src/css/Footer.css<br />
- src/css/Header.css<br />
- src/css/Recipes.css<br />
- src/css/RecipesDetails.css<br />
- src/css/RecipesInProgress.css<br />
- src/pages/DoneRecipes.jsx<br />
- src/pages/FavoriteRecipes.jsx<br />
- src/pages/Login.jsx<br />
- src/pages/Profile.jsx<br />
- src/pages/RecipeDetails.jsx<br />
- src/pages/RecipeInProgress.jsx<br />
- src/pages/Recipes.jsx<br />
- src/services/recipesAPI.js<br />
- src/tests/DoneRecipes.test.js<br />
- src/tests/FavoriteRecipes.test.js<br />
- src/tests/Header.test.js<br />
- src/tests/Login.test.js<br />
- src/tests/Profile.test.js<br />
- src/tests/RecipeDetails.test.js<br />
- src/tests/RecipeInProgress.test.js<br />
- src/tests/Recipes.test.js<br />
- src/tests/SearchBar.test.js<br />
- src/tests/helpers/renderPath.js<br />
- src/tests/helpers/renderWithRouter.js<br />
- src/tests/mocks/mealsData.js<br />
- src/tests/mocks/mockFetch.js<br />
- src/tests/mocks/storageDefault.js<br />
- src/tests/mocks/vegetarianMeals.js<br />
</details>

<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
