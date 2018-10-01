import axios from 'axios';

const getProfile = username => {
  return axios.get(`https://api.github.com/users/${username}`).then(user => {
    return user.data;
  });
};

const getRepos = username => {
  return axios.get(`https://api.github.com/users/${username}/repos`);
};

const getgetStarCount = repos => {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
};

const calculateScore = (profile, repos) => {
  let followers = profile.followers;
  let totalStars = getgetStarCount(repos);

  return followers * 3 + totalStars;
};

const handleError = error => {
  console.warn(error);
  return null;
};

const getUserData = player => {
  return axios.all([getProfile(player), getRepos(player)]).then(data => {
    let profile = data[0];
    let repos = data[1];

    return {
      profile,
      score: calculateScore(profile, repos)
    };
  });
};

const sortPlayers = players => {
  return players.sort((a, b) => {
    return b.score - a.score;
  });
};

const Api = {
  battle: players => {
    return axios
      .all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },

  fetchPopularRepos: language => {
    var encodeURI = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );

    return axios.get(encodeURI).then(response => {
      return response.data.items;
    });
  }
};

export default Api;
