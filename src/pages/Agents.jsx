import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, Linkedin, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Agents() {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: () => base44.entities.Agent.list("-created_date"),
  });

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-[#0A1628] py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium tracking-[0.2em] uppercase">
                Our Team
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Meet Our Agents
            </h1>
            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              Our agents combine deep market knowledge with personalized
              service. Each member of our team is dedicated to delivering
              exceptional results.
            </p>
          </div>
        </div>
      </section>

      {/* Agent Grid */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white shadow-sm">
                  <Skeleton className="aspect-[3/4] w-full rounded-none" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : agents.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#0A1628]">
                Team Coming Soon
              </h3>
              <p className="mt-2 text-slate-400 max-w-md mx-auto">
                We're putting together our team profiles. Check back soon to
                meet our expert agents.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-white shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                    {agent.photo_url ? (
                      <img
                        src={agent.photo_url}
                        alt={agent.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0A1628]">
                        <span className="text-5xl font-bold text-[#C9A84C] opacity-30">
                          {agent.name?.charAt(0) || "A"}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover overlay contact */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex gap-3">
                        {agent.email && (
                          <a
                            href={`mailto:${agent.email}`}
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#C9A84C] transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                        {agent.phone && (
                          <a
                            href={`tel:${agent.phone}`}
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#C9A84C] transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        )}
                        {agent.linkedin_url && (
                          <a
                            href={agent.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#C9A84C] transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-[#0A1628] text-lg">
                      {agent.name}
                    </h3>
                    {agent.title && (
                      <p className="text-[#C9A84C] text-sm font-medium mt-1">
                        {agent.title}
                      </p>
                    )}
                    {agent.bio && (
                      <p className="mt-3 text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {agent.bio}
                      </p>
                    )}
                    {agent.specializations?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {agent.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="bg-slate-50 text-slate-600 text-xs px-3 py-1 font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                    {agent.years_experience && (
                      <p className="mt-4 text-xs text-slate-400 font-medium tracking-wide uppercase">
                        {agent.years_experience} Years Experience
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
