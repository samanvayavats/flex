
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getPullRequestDiff(owner: string, repo: string, pull_number: number) {
  try {
    const response = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number,
      mediaType: {
        format: "diff", 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching PR diff:", error);
    throw error;
  }
}

export async function postReviewComment(owner: string, repo: string, pull_number: number, body: string) {
  try {
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pull_number, // In GitHub's API, PRs are technically issues
      body,
    });
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
}