import { Router } from 'express';
const { Octokit } = require("@octokit/rest");

export const languages = Router();

languages.get('/', async (req, res) => {

  const { Octokit } = require("@octokit/rest");

  const octokit = new Octokit({
    auth: "0acfb7a6a3c3b0f4891e6fb997a8e095ae97a32f",
  });

  octokit.repos
  .listForOrg({
    org: "silverorange",
    type: "public",
  })
  .then(({ data }: {data: any}) => {

    let languages = {};
    let id = 0;
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const repo = data[key];
        if (repo.fork !== false) {
          continue;
        }
        if (repo.language === null) {
          continue;
        }
        if (!languages[repo.language]) {
         languages[repo.language] = {id, language: repo.language};
        }
      }
      id++
    }
    res.json(languages)
  });
});
