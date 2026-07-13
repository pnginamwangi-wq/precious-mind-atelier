import { describe, expect, test } from "bun:test";

import { normalizeGithubRepoInput } from "../src/lib/github.functions";

describe("normalizeGithubRepoInput", () => {
  describe("repo normalization", () => {
    test("accepts owner/name as-is", () => {
      expect(normalizeGithubRepoInput({ repo: "octocat/Hello-World" })).toEqual({
        repo: "octocat/Hello-World",
        branch: undefined,
      });
    });

    test("trims surrounding whitespace", () => {
      expect(normalizeGithubRepoInput({ repo: "  octocat/Hello-World  " }).repo).toBe(
        "octocat/Hello-World",
      );
    });

    test("strips trailing .git", () => {
      expect(normalizeGithubRepoInput({ repo: "octocat/Hello-World.git" }).repo).toBe(
        "octocat/Hello-World",
      );
    });

    test("strips leading and trailing slashes", () => {
      expect(normalizeGithubRepoInput({ repo: "/octocat/Hello-World/" }).repo).toBe(
        "octocat/Hello-World",
      );
    });

    test("extracts owner/name from https URL", () => {
      expect(
        normalizeGithubRepoInput({ repo: "https://github.com/octocat/Hello-World" }).repo,
      ).toBe("octocat/Hello-World");
    });

    test("extracts owner/name from https URL with .git", () => {
      expect(
        normalizeGithubRepoInput({ repo: "https://github.com/octocat/Hello-World.git" }).repo,
      ).toBe("octocat/Hello-World");
    });

    test("extracts owner/name from URL with trailing slash", () => {
      expect(
        normalizeGithubRepoInput({ repo: "https://github.com/octocat/Hello-World/" }).repo,
      ).toBe("octocat/Hello-World");
    });

    test("extracts from SSH-style git@github.com:owner/name", () => {
      expect(
        normalizeGithubRepoInput({ repo: "git@github.com:octocat/Hello-World.git" }).repo,
      ).toBe("octocat/Hello-World");
    });

    test("handles owner names with dashes", () => {
      expect(
        normalizeGithubRepoInput({ repo: "pnginamwangi-wq/precious-mind-atelier" }).repo,
      ).toBe("pnginamwangi-wq/precious-mind-atelier");
    });

    test("handles URL with query and hash", () => {
      expect(
        normalizeGithubRepoInput({
          repo: "https://github.com/octocat/Hello-World?tab=readme#top",
        }).repo,
      ).toBe("octocat/Hello-World");
    });
  });

  describe("validation errors", () => {
    test("rejects empty string", () => {
      expect(() => normalizeGithubRepoInput({ repo: "" })).toThrow(
        /Enter a repository as owner\/name/,
      );
    });

    test("rejects whitespace only", () => {
      expect(() => normalizeGithubRepoInput({ repo: "   " })).toThrow(
        /Enter a repository as owner\/name/,
      );
    });

    test("rejects owner without name", () => {
      expect(() => normalizeGithubRepoInput({ repo: "pnginamwangi-wq" })).toThrow(
        /Repo must be in the form owner\/name/,
      );
    });

    test("rejects too many segments", () => {
      expect(() => normalizeGithubRepoInput({ repo: "a/b/c" })).toThrow(
        /Repo must be in the form owner\/name/,
      );
    });

    test("rejects internal whitespace", () => {
      expect(() => normalizeGithubRepoInput({ repo: "owner /name" })).toThrow(
        /Repo must be in the form owner\/name/,
      );
    });

    test("error message echoes the raw input", () => {
      expect(() => normalizeGithubRepoInput({ repo: "bogus" })).toThrow(/"bogus"/);
    });
  });

  describe("branch normalization", () => {
    test("passes through a plain branch name", () => {
      expect(
        normalizeGithubRepoInput({ repo: "octocat/Hello-World", branch: "main" }).branch,
      ).toBe("main");
    });

    test("trims branch whitespace", () => {
      expect(
        normalizeGithubRepoInput({ repo: "octocat/Hello-World", branch: "  dev  " }).branch,
      ).toBe("dev");
    });

    test("empty branch becomes undefined", () => {
      expect(
        normalizeGithubRepoInput({ repo: "octocat/Hello-World", branch: "" }).branch,
      ).toBeUndefined();
    });

    test("extracts branch from GitHub tree URL", () => {
      expect(
        normalizeGithubRepoInput({
          repo: "octocat/Hello-World",
          branch: "https://github.com/octocat/Hello-World/tree/feature-x",
        }).branch,
      ).toBe("feature-x");
    });

    test("discards a non-tree URL", () => {
      expect(
        normalizeGithubRepoInput({
          repo: "octocat/Hello-World",
          branch: "https://github.com/octocat/Hello-World",
        }).branch,
      ).toBeUndefined();
    });

    test("omitted branch is undefined", () => {
      expect(normalizeGithubRepoInput({ repo: "octocat/Hello-World" }).branch).toBeUndefined();
    });
  });
});
