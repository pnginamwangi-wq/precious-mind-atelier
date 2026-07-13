import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GitBranch, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";

import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { Eyebrow, LuxButton, luxury } from "@/components/luxury";
import { getGithubSyncStatus, type GithubSyncStatus } from "@/lib/github.functions";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "github-sync-panel:config";

export const Route = createFileRoute("/github-sync")({
  head: () => ({
    meta: [
      { title: "GitHub Sync Status, The Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "Inspect the last fetch time, current branch, and sync result for a connected GitHub repository.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: GithubSyncPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen bg-obsidian p-10 text-ivory">
        <h1 className="font-display text-2xl">Sync panel failed to load</h1>
        <p className="mt-2 text-sm text-platinum/80">{error.message}</p>
        <LuxButton
          className="mt-6"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Try again
        </LuxButton>
      </div>
    );
  },
  notFoundComponent: () => <div className="p-10 text-ivory">Not found</div>,
});

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const s = Math.max(1, Math.round(diff / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

function GithubSyncPage() {
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState<GithubSyncStatus | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const fetchStatus = useServerFn(getGithubSyncStatus);

  const mutation = useMutation({
    mutationFn: async (input: { repo: string; branch?: string }) => {
      return await fetchStatus({ data: input });
    },
    onSuccess: (data) => {
      setStatus(data);
      setLastError(null);
    },
    onError: (err: Error) => {
      setLastError(err.message);
    },
  });

  // Load saved config once on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { repo?: string; branch?: string };
        if (parsed.repo) setRepo(parsed.repo);
        if (parsed.branch) setBranch(parsed.branch);
      }
    } catch {
      // ignore
    }
  }, []);

  // Tick every 30s so "x ago" stays fresh.
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const persist = (nextRepo: string, nextBranch: string) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ repo: nextRepo, branch: nextBranch }),
      );
    } catch {
      // ignore
    }
  };

  const onSync = () => {
    if (!repo) {
      setLastError("Enter a repository as owner/name.");
      return;
    }
    persist(repo, branch);
    mutation.mutate({ repo, branch: branch || undefined });
  };

  const state: "idle" | "loading" | "ok" | "error" =
    mutation.isPending ? "loading" : lastError ? "error" : status ? "ok" : "idle";

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      <main id="main" className={cn(luxury.container, "px-6 pb-24 pt-32 md:px-10")}>
        <div className="max-w-3xl">
          <Eyebrow>Operations</Eyebrow>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">GitHub sync status</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-platinum/80">
            Fetch the latest commit for a repository and branch. The panel shows when
            the check ran, the branch it inspected, and the result of the sync.
          </p>
        </div>

        <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="border border-white/10 bg-black/20 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Eyebrow muted>Sync result</Eyebrow>
                <p className="mt-2 font-display text-2xl">
                  {state === "loading" && "Fetching…"}
                  {state === "ok" && "In sync"}
                  {state === "error" && "Failed"}
                  {state === "idle" && "Not yet fetched"}
                </p>
              </div>
              <StatusBadge state={state} />
            </div>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <Field label="Repository" value={status?.repo ?? "—"} />
              <Field
                label="Branch"
                value={
                  status ? (
                    <span className="inline-flex items-center gap-2">
                      <GitBranch className="h-3.5 w-3.5 text-gold" />
                      {status.branch}
                      {status.branch === status.defaultBranch ? (
                        <span className="text-[10px] uppercase tracking-[0.24em] text-platinum/60">
                          default
                        </span>
                      ) : null}
                    </span>
                  ) : (
                    "—"
                  )
                }
              />
              <Field
                label="Last fetch"
                value={
                  status ? (
                    <span title={new Date(status.fetchedAt).toLocaleString()}>
                      {formatRelative(status.fetchedAt)}
                      <span className="ml-2 text-[10px] uppercase tracking-[0.24em] text-platinum/60">
                        (t+{tick})
                      </span>
                    </span>
                  ) : (
                    "—"
                  )
                }
              />
              <Field
                label="Latest commit"
                value={
                  status ? (
                    <a
                      href={status.htmlUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-ivory underline-offset-4 hover:text-gold hover:underline"
                    >
                      {status.shortSha}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    "—"
                  )
                }
              />
              <div className="sm:col-span-2">
                <Field
                  label="Message"
                  value={
                    status ? (
                      <span className="text-ivory/90">
                        {status.commitMessage}
                        <span className="ml-2 text-platinum/60">
                          by {status.commitAuthor},{" "}
                          {new Date(status.commitDate).toLocaleString()}
                        </span>
                      </span>
                    ) : (
                      "—"
                    )
                  }
                />
              </div>
            </dl>

            {lastError ? (
              <div className="mt-6 border-l-2 border-red-400/60 bg-red-400/5 px-4 py-3 text-sm text-red-200">
                {lastError}
              </div>
            ) : null}
          </div>

          <aside className="border border-white/10 bg-black/20 p-6 md:p-8">
            <Eyebrow muted>Configuration</Eyebrow>
            <form
              className="mt-4 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                onSync();
              }}
            >
              <label className="block text-xs uppercase tracking-[0.24em] text-platinum/70">
                Repository
                <input
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="owner/name"
                  className="mt-2 w-full border border-white/10 bg-obsidian px-3 py-2 font-mono text-sm text-ivory outline-none focus:border-gold/60"
                  autoComplete="off"
                  spellCheck={false}
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.24em] text-platinum/70">
                Branch (optional)
                <input
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="defaults to repo default"
                  className="mt-2 w-full border border-white/10 bg-obsidian px-3 py-2 font-mono text-sm text-ivory outline-none focus:border-gold/60"
                  autoComplete="off"
                  spellCheck={false}
                />
              </label>
              <LuxButton
                type="submit"
                className="w-full"
                icon={
                  <RefreshCw
                    className={cn("h-3.5 w-3.5", mutation.isPending && "animate-spin")}
                  />
                }
              >
                {mutation.isPending ? "Syncing…" : "Sync now"}
              </LuxButton>
              <p className="text-[11px] leading-relaxed text-platinum/60">
                Uses the workspace GitHub connector. Config is saved to this browser only.
              </p>
            </form>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.28em] text-platinum/60">{label}</dt>
      <dd className="mt-1.5 font-numeric text-sm text-ivory">{value}</dd>
    </div>
  );
}

function StatusBadge({ state }: { state: "idle" | "loading" | "ok" | "error" }) {
  const map = {
    idle: { label: "Idle", cls: "border-white/15 text-platinum/70", icon: null },
    loading: {
      label: "Syncing",
      cls: "border-gold/40 text-gold",
      icon: <RefreshCw className="h-3 w-3 animate-spin" />,
    },
    ok: {
      label: "OK",
      cls: "border-emerald-400/40 text-emerald-300",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
    error: {
      label: "Error",
      cls: "border-red-400/40 text-red-300",
      icon: <AlertTriangle className="h-3 w-3" />,
    },
  }[state];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] uppercase tracking-[0.28em]",
        map.cls,
      )}
    >
      {map.icon}
      {map.label}
    </span>
  );
}
