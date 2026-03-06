import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Bed, Bath, Maximize } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedListings() {
  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["featured-listings"],
    queryFn: () =>
      base44.entities.Listing.filter({ is_featured: true }, "-created_date", 6),
  });

  const displayListings = listings.length > 0 ? listings : [];

  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium tracking-[0.2em] uppercase">
                Featured
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] tracking-tight">
              Selected Properties
            </h2>
          </div>
          <Link
            to={createPageUrl("Listings")}
            className="inline-flex items-center text-[#0A1628] font-semibold hover:text-[#C9A84C] transition-colors group"
          >
            View All Listings
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : displayListings.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">Featured properties coming soon</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayListings.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={
                      listing.image_url ||
                      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
                    }
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#0A1628]/90 text-white text-xs font-medium px-3 py-1.5 tracking-wider uppercase">
                    {listing.status?.replace("_", " ") || "For Sale"}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#C9A84C] font-bold text-xl">
                    ${listing.price?.toLocaleString()}
                  </p>
                  <h3 className="mt-2 font-semibold text-[#0A1628] text-lg leading-tight">
                    {listing.title}
                  </h3>
                  <p className="mt-1 text-slate-400 text-sm">
                    {listing.neighborhood}
                    {listing.city ? `, ${listing.city}` : ""}
                  </p>
                  <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-5 text-slate-500 text-sm">
                    {listing.bedrooms && (
                      <span className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4" /> {listing.bedrooms}
                      </span>
                    )}
                    {listing.bathrooms && (
                      <span className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4" /> {listing.bathrooms}
                      </span>
                    )}
                    {listing.area_sqft && (
                      <span className="flex items-center gap-1.5">
                        <Maximize className="w-4 h-4" /> {listing.area_sqft}{" "}
                        sqft
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
