import { Router } from 'express';
const { Octokit } = require("@octokit/rest");

export const repos = Router();

repos.get('/', async (req, res) => {
  res.header('Cache-Control', 'no-store');

  const octokit = new Octokit({
    auth: "0acfb7a6a3c3b0f4891e6fb997a8e095ae97a32f",
  });

  octokit.repos
    .listForOrg({
      org: "octokit",
      type: "public",
    })
    .then(({ data }) => {
      res.json(data)
    });
});
