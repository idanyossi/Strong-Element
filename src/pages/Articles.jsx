import React, { useState } from "react";
import { api } from "@/api/client";
import { useAuth } from "@/lib/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Calendar, Trash2, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { he } from "@/locales/he";

const { articles: t } = he;

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

  const categories = [
    { value: "all", label: t.allCategory },
    ...Object.entries(t.categoryLabels).map(([k, v]) => ({ value: k, label: v })),
  ];

  return (
    <div className="bg-[#f4f4f4] pt-24">
      <section className="px-5 pb-8 pt-8 sm:px-8 lg:pt-14">
        <div className="mx-auto max-w-[1760px] rounded-[34px] bg-[#082b86] px-7 py-14 text-white sm:px-10 lg:rounded-[44px] lg:px-14 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-black text-white/75">{t.eyebrow}</p>
              <h1 className="text-5xl font-black leading-none tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                {t.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-bold leading-relaxed text-white/75">
                {t.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-20 z-30 px-5 py-4 sm:px-8">
        <div className="mx-auto max-w-[1760px] overflow-x-auto rounded-full bg-white p-2 shadow-sm">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                type="button"
                aria-pressed={selectedCategory === cat.value}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-extrabold transition-colors ${
                  selectedCategory === cat.value
                    ? "bg-[#082b86] text-white"
                    : "text-[#082b86] hover:bg-[#f4f4f4]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="px-5 pb-20 pt-8 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-[1760px]">
          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" role="status" aria-live="polite">
              <span className="sr-only">{t.loading}</span>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="overflow-hidden rounded-[24px] bg-white">
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
            <div className="rounded-[28px] bg-white py-32 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-[#082b86]" aria-hidden="true" />
              <p className="text-xl font-black text-[#082b86]">{t.emptyTitle}</p>
              <p className="mt-1 font-medium text-slate-500">{t.emptyBody}</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group cursor-pointer overflow-hidden rounded-[24px] bg-white"
                  onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setExpandedId(expandedId === article.id ? null : article.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedId === article.id}
                  aria-label={
                    expandedId === article.id
                      ? t.closeAria(article.title)
                      : t.openAria(article.title)
                  }
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
                    <img
                      src={
                        article.cover_image_url ||
                        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&q=80"
                      }
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(t.deleteConfirm(article.title)))
                            deleteMutation.mutate(article.id);
                        }}
                        className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-red-600/90 text-white transition-colors hover:bg-red-700"
                        type="button"
                        aria-label={t.deleteAria(article.title)}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                    <div className="absolute right-4 top-4">
                      <span className="rounded-md bg-white px-4 py-2 text-xs font-extrabold text-[#082b86]">
                        {t.categoryLabels[article.category] || article.category}
                      </span>
                    </div>
                  </div>
                  <div className="px-1 py-5">
                    <div className="mb-3 flex items-center gap-4 text-xs font-bold text-slate-500">
                      {article.created_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          {format(new Date(article.created_date), "MMM d, yyyy")}
                        </span>
                      )}
                      {article.author_name && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" aria-hidden="true" />
                          {article.author_name}
                        </span>
                      )}
                    </div>
                    <h3 className="line-clamp-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[#082b86]">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-slate-600">
                        {article.summary}
                      </p>
                    )}
                    <div className="mt-4 flex items-center text-sm font-extrabold text-[#082b86]">
                      {expandedId === article.id ? t.collapse : t.readMore}{" "}
                      <ArrowLeft className="me-1 h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>

                  {expandedId === article.id && (
                    <div className="border-t border-slate-100 px-6 pb-6 pt-4">
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
