import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Trash2, LogOut, ArrowUpRight, Building2, Users, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddListingDialog from "@/components/listings/AddListingDialog";
import AddAgentDialog from "@/components/agents/AddAgentDialog";
import AddArticleDialog from "@/components/articles/AddArticleDialog";

export default function Admin() {
  const { user, isAdmin, isLoading, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState("listings");
  const queryClient = useQueryClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(username, password);
    } catch {
      setError("Invalid username or password");
    } finally {
      setSubmitting(false);
    }
  };

  const { data: listings = [] } = useQuery({
    queryKey: ["listings"],
    queryFn: () => api.listings.list(),
    enabled: isAdmin,
  });
  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: () => api.agents.list(),
    enabled: isAdmin,
  });
  const { data: articles = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: () => api.articles.list(),
    enabled: isAdmin,
  });

  const deleteListingMutation = useMutation({
    mutationFn: (id) => api.listings.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["featured-listings"] });
    },
  });
  const deleteAgentMutation = useMutation({
    mutationFn: (id) => api.agents.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["agents"] }),
  });
  const deleteArticleMutation = useMutation({
    mutationFn: (id) => api.articles.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["articles"] }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]">
        <Loader2 className="h-6 w-6 animate-spin text-[#082b86]" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white rounded-[16px] shadow-sm p-8">
          <h1 className="text-2xl font-black text-[#082b86] mb-1">Admin</h1>
          <p className="text-sm text-slate-400 mb-6">Strong Element</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label>Username</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 rounded-none"
                autoFocus
                required
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 rounded-none"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#082b86] hover:bg-[#06216b] rounded-none"
            >
              {submitting && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "listings", label: "Listings", count: listings.length, icon: Building2 },
    { key: "agents", label: "Agents", count: agents.length, icon: Users },
    { key: "articles", label: "Articles", count: articles.length, icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="bg-[#082b86] text-white px-8 py-4 flex items-center justify-between">
        <span className="text-lg font-black tracking-[-0.04em]">STRONGELEMENT. Admin</span>
        <div className="flex items-center gap-5">
          <Link
            to={createPageUrl("Home")}
            className="flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white transition-colors"
          >
            <ArrowUpRight className="h-4 w-4" />
            View Site
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white transition-colors"
            type="button"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-8 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {tabs.map(({ key, label, count, icon: Icon }) => (
            <div key={key} className="bg-white rounded-[12px] p-6">
              <Icon className="h-5 w-5 text-[#082b86] mb-3" aria-hidden="true" />
              <p className="text-3xl font-black text-[#082b86]">{count}</p>
              <p className="text-sm font-bold text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-5">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              type="button"
              className={`px-5 py-2.5 rounded-full text-sm font-extrabold transition-colors ${
                tab === key
                  ? "bg-[#082b86] text-white"
                  : "bg-white text-[#082b86] hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[16px] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-[#082b86]">
              {tabs.find((t) => t.key === tab)?.label}
            </h2>
            {tab === "listings" && <AddListingDialog />}
            {tab === "agents" && <AddAgentDialog />}
            {tab === "articles" && <AddArticleDialog />}
          </div>

          {tab === "listings" && (
            <div className="space-y-3">
              {listings.length === 0 && (
                <p className="text-sm text-slate-400 py-8 text-center">No listings yet.</p>
              )}
              {listings.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-[10px] bg-[#f4f4f4] p-4">
                  <div>
                    <p className="font-bold text-[#082b86]">{item.title}</p>
                    <p className="text-sm text-slate-500">
                      {item.city}{item.neighborhood ? ` · ${item.neighborhood}` : ""} · ${item.price?.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${item.title}"?`))
                        deleteListingMutation.mutate(item.id);
                    }}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    type="button"
                    aria-label={`Delete ${item.title}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "agents" && (
            <div className="space-y-3">
              {agents.length === 0 && (
                <p className="text-sm text-slate-400 py-8 text-center">No agents yet.</p>
              )}
              {agents.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-[10px] bg-[#f4f4f4] p-4">
                  <div>
                    <p className="font-bold text-[#082b86]">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.title || "—"}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${item.name}"?`))
                        deleteAgentMutation.mutate(item.id);
                    }}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    type="button"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "articles" && (
            <div className="space-y-3">
              {articles.length === 0 && (
                <p className="text-sm text-slate-400 py-8 text-center">No articles yet.</p>
              )}
              {articles.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-[10px] bg-[#f4f4f4] p-4">
                  <div>
                    <p className="font-bold text-[#082b86]">{item.title}</p>
                    <p className="text-sm text-slate-500">
                      {item.author_name || "—"} · {item.category}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${item.title}"?`))
                        deleteArticleMutation.mutate(item.id);
                    }}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    type="button"
                    aria-label={`Delete ${item.title}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
