import React, { useState } from "react";
import { api } from "@/api/client";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, BookOpen, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import AddArticleDialog from "../components/articles/AddArticleDialog";

const CATEGORY_LABELS = {
  market_insights: "Market Insights",
  investment_tips: "Investment Tips",
  neighborhood_guides: "Neighborhood Guides",
  company_news: "Company News",
  guides: "Guides",
};

export default function Articles() {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: () => api.articles.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.articles.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["articles"] }),
  });

  const filtered =
    selectedCategory === "all"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-[#0A1628] py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.04] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium tracking-[0.2em] uppercase">
                Insights
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Articles & Insights
            </h1>
            <p className="mt-2 text-slate-400">
              Market intelligence, investment strategies, and expert
              perspectives.
            </p>
          </div>
          {isAdmin && <AddArticleDialog />}
        </div>
      </section>

      {/* Category filter */}
      <div className="bg-white border-b border-slate-200 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
            {[
              { value: "all", label: "All" },
              ...Object.entries(CATEGORY_LABELS).map(([k, v]) => ({
                value: k,
                label: v,
              })),
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.value
                    ? "bg-[#0A1628] text-white"
                    : "text-slate-500 hover:text-[#0A1628] hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <section className="py-16 lg:py-20 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white">
                  <Skeleton className="aspect-[16/10] w-full rounded-none" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No articles yet</p>
              <p className="text-slate-400 text-sm mt-1">
                Check back soon for new insights.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-white shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === article.id ? null : article.id)
                  }
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={
                        article.cover_image_url ||
                        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"
                      }
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete "${article.title}"?`))
                            deleteMutation.mutate(article.id);
                        }}
                        className="absolute top-2 right-2 z-10 w-7 h-7 bg-red-600/90 hover:bg-red-700 flex items-center justify-center text-white transition-colors"
                        title="Delete article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#0A1628]/90 text-white text-[10px] font-semibold px-3 py-1 tracking-wider uppercase">
                        {CATEGORY_LABELS[article.category] || article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                      {article.created_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(
                            new Date(article.created_date),
                            "MMM d, yyyy",
                          )}
                        </span>
                      )}
                      {article.author_name && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {article.author_name}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-[#0A1628] text-lg leading-tight line-clamp-2">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="mt-3 text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {article.summary}
                      </p>
                    )}
                    <div className="mt-4 flex items-center text-sm font-medium text-[#C9A84C] group-hover:text-[#0A1628] transition-colors">
                      Read Article <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>

                  {/* Expanded content */}
                  {expandedId === article.id && (
                    <div className="px-6 pb-6 border-t border-slate-100 pt-4">
                      <div className="prose prose-sm max-w-none text-slate-600">
                        {article.content?.split("\n").map((p, idx) => (
                          <p key={idx}>{p}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
