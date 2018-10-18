import axios from 'axios';

const getProfile = username => {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then(({ data }) => data);
};

const getRepos = username =>
  axios.get(`https://api.github.com/users/${username}/repos`);
const getgetStarCount = repos => {
  return repos.data.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
};

const calculateScore = ({ followers }, repos) => {
  return followers * 3 + getgetStarCount(repos);
};

const handleError = error => {
  console.warn(error);
  return null;
};

const getUserData = player => {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile, repos)
    })
  );
};

const sortPlayers = players => {
  return players.sort((a, b) => b.score - a.score);
};

const Api = {
  battle: players => {
    return Promise.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },

  fetchPopularRepos: language => {
    var encodeURI = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );

    return axios.get(encodeURI).then(({ data }) => data.items);
  }
};

export default Api;
