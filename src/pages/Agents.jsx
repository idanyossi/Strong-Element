import React from "react";
import { api } from "@/api/client";
import { useAuth } from "@/lib/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Award, Linkedin, Mail, Phone, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { he } from "@/locales/he";

const { agents: t } = he;

export default function Agents() {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: () => api.agents.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.agents.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["agents"] }),
  });

  return (
    <div className="bg-[#f4f4f4] pt-24">
      <section className="px-5 pb-12 pt-8 sm:px-8 lg:pt-14">
        <div className="mx-auto max-w-[1760px] rounded-[34px] bg-[#082b86] px-7 py-14 text-white sm:px-10 lg:rounded-[44px] lg:px-14 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-black text-white/75">
                {t.eyebrow}
              </p>
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

      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-[1760px]">
          {isLoading ? (
            <div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              role="status"
              aria-live="polite"
            >
              <span className="sr-only">{t.loading}</span>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-[24px] bg-white"
                >
                  <Skeleton className="aspect-[3/4] w-full rounded-none" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : agents.length === 0 ? (
            <div className="rounded-[28px] bg-white py-20 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f4f4]">
                <Award className="h-8 w-8 text-[#082b86]" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-black tracking-[-0.04em] text-[#082b86]">
                {t.emptyTitle}
              </h3>
              <p className="mx-auto mt-2 max-w-md font-medium text-slate-500">
                {t.emptyBody}
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group overflow-hidden rounded-[24px] bg-white"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[7px] bg-[#082b86]">
                    {isAdmin && (
                      <button
                        onClick={() => {
                          if (window.confirm(t.deleteConfirm(agent.name)))
                            deleteMutation.mutate(agent.id);
                        }}
                        className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-red-600/90 text-white transition-colors hover:bg-red-700"
                        type="button"
                        aria-label={t.deleteAria(agent.name)}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                    {agent.photo_url ? (
                      <img
                        src={agent.photo_url}
                        alt={agent.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-7xl font-black text-white/20">
                          {agent.name?.charAt(0) || "A"}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5">
                      <div className="flex gap-3">
                        {agent.email && (
                          <a
                            href={`mailto:${agent.email}`}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#082b86]"
                            aria-label={t.emailAria(agent.name)}
                          >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                          </a>
                        )}
                        {agent.phone && (
                          <a
                            href={`tel:${agent.phone}`}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#082b86]"
                            aria-label={t.phoneAria(agent.name)}
                          >
                            <Phone className="h-4 w-4" aria-hidden="true" />
                          </a>
                        )}
                        {agent.linkedin_url && (
                          <a
                            href={agent.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#082b86]"
                            aria-label={t.linkedinAria(agent.name)}
                          >
                            <Linkedin className="h-4 w-4" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-5">
                    <h3 className="text-2xl font-black tracking-[-0.04em] text-[#082b86]">
                      {agent.name}
                    </h3>
                    {agent.title && (
                      <p className="mt-1 text-sm font-black text-slate-500">
                        {agent.title}
                      </p>
                    )}
                    {agent.bio && (
                      <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-slate-600">
                        {agent.bio}
                      </p>
                    )}
                    {agent.specializations?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {agent.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="rounded-full bg-[#f4f4f4] px-3 py-1 text-xs font-bold text-[#082b86]"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                    {agent.years_experience && (
                      <p className="mt-4 text-xs font-black text-slate-400">
                        {agent.years_experience} {t.experienceSuffix}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
