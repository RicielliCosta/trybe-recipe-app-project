import mealsData from './mealsData';

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(mealsData),
});

export default mockFetch;
