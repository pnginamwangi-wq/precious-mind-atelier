import { createServerFn } from "@tanstack/react-start";

const GATEWAY = "https://connector-gateway.lovable.dev/github";

export type GithubSyncStatus = {
  repo: string;
  branch: string;
  defaultBranch: string;
  sha: string;
  shortSha: string;
  commitMessage: string;
  commitAuthor: string;
  commitDate: string;
  htmlUrl: string;
  fetchedAt: string;
};

export const getGithubSyncStatus = createServerFn({ method: "GET" })
  .inputValidator((input: { repo: string; branch?: string }) => {
    const raw = (input?.repo ?? "").trim();
    if (!raw) throw new Error("Enter a repository as owner/name.");
    // Accept full GitHub URLs like https://github.com/owner/name(.git)
    const urlMatch = raw.match(/github\.com[/:]([^/\s]+)\/([^/\s#?]+?)(?:\.git)?\/?$/i);
    const normalized = urlMatch ? `${urlMatch[1]}/${urlMatch[2]}` : raw.replace(/\.git$/i, "").replace(/^\/+|\/+$/g, "");
    if (!/^[^/\s]+\/[^/\s]+$/.test(normalized)) {
      throw new Error(`Repo must be in the form owner/name (got "${raw}")`);
    }
    let branch = input.branch?.trim() || undefined;
    if (branch) {
      const bMatch = branch.match(/github\.com\/[^/]+\/[^/]+\/tree\/([^/?#]+)/i);
      if (bMatch) branch = bMatch[1];
      else if (/^https?:\/\//i.test(branch)) branch = undefined;
    }
    return { repo: normalized, branch };
  })
  .handler(async ({ data }): Promise<GithubSyncStatus> => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const githubKey = process.env.GITHUB_API_KEY;
    if (!lovableKey || !githubKey) {
      throw new Error("GitHub connector is not configured.");
    }

    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": githubKey,
    };

    const repoRes = await fetch(`${GATEWAY}/repos/${data.repo}`, { headers });
    if (!repoRes.ok) {
      const body = await repoRes.text();
      throw new Error(`Repo lookup failed [${repoRes.status}]: ${body}`);
    }
    const repoJson = (await repoRes.json()) as {
      default_branch: string;
      html_url: string;
      full_name: string;
    };

    const branch = data.branch || repoJson.default_branch;

    const branchRes = await fetch(
      `${GATEWAY}/repos/${data.repo}/branches/${encodeURIComponent(branch)}`,
      { headers },
    );
    if (!branchRes.ok) {
      const body = await branchRes.text();
      throw new Error(`Branch lookup failed [${branchRes.status}]: ${body}`);
    }
    const branchJson = (await branchRes.json()) as {
      name: string;
      commit: {
        sha: string;
        html_url: string;
        commit: {
          message: string;
          author: { name: string; date: string };
        };
      };
    };

    const sha = branchJson.commit.sha;
    return {
      repo: repoJson.full_name,
      branch: branchJson.name,
      defaultBranch: repoJson.default_branch,
      sha,
      shortSha: sha.slice(0, 7),
      commitMessage: branchJson.commit.commit.message.split("\n")[0],
      commitAuthor: branchJson.commit.commit.author.name,
      commitDate: branchJson.commit.commit.author.date,
      htmlUrl: branchJson.commit.html_url,
      fetchedAt: new Date().toISOString(),
    };
  });
