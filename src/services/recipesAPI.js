// const URL = 'www.themealdb.com/api/json/v1/1/random.php';

const requestRecipes = async (url) => {
  console.log(url);
  try {
    const data = await fetch(url);
    const json = await data.json();
    return json;
  } catch (error) {
    return error;
  }
};

export default requestRecipes;
