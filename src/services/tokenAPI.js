const URL = 'www.themealdb.com/api/json/v1/1/random.php';

const requestToken = async () => {
  try {
    const data = await fetch(URL);
    const json = await data.json();
    return json;
  } catch (error) {
    return error;
  }
};

export default requestToken;
