import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Bath, Bed, Maximize } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedListings() {
  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["featured-listings"],
    queryFn: () => api.listings.featured(),
  });

  const displayListings = listings.length > 0 ? listings : [];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1760px] px-5 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-5xl font-black leading-none tracking-[-0.055em] text-[#082b86] sm:text-6xl">
            Selected Properties
          </h2>
          <p className="mt-5 text-lg font-medium leading-relaxed text-slate-600">
            Check out some of our most exclusive houses, apartments, townhomes,
            penthouses, and more.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-[18px] bg-white">
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
          <div className="rounded-[18px] bg-[#f4f4f4] py-20 text-center text-slate-500">
            <p className="text-lg font-bold">Featured properties coming soon</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayListings.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group overflow-hidden rounded-[18px] bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-slate-200">
                  <img
                    src={
                      listing.image_url ||
                      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80"
                    }
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-md bg-white px-4 py-2 text-xs font-extrabold text-[#082b86]">
                    {listing.status?.replace("_", " ") || "For Sale"}
                  </div>
                </div>
                <div className="px-1 py-5">
                  <p className="text-2xl font-black tracking-[-0.04em] text-[#082b86]">
                    ${listing.price?.toLocaleString()}
                  </p>
                  <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[#111]">
                    {listing.title}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-slate-500">
                    {listing.neighborhood}
                    {listing.city ? `, ${listing.city}` : ""}
                  </p>
                  <div className="mt-4 flex items-center gap-5 text-sm font-bold text-slate-600">
                    {listing.bedrooms && (
                      <span className="flex items-center gap-1.5">
                        <Bed className="h-4 w-4" aria-hidden="true" /> {listing.bedrooms}
                      </span>
                    )}
                    {listing.bathrooms && (
                      <span className="flex items-center gap-1.5">
                        <Bath className="h-4 w-4" aria-hidden="true" /> {listing.bathrooms}
                      </span>
                    )}
                    {listing.area_sqft && (
                      <span className="flex items-center gap-1.5">
                        <Maximize className="h-4 w-4" aria-hidden="true" /> {listing.area_sqft} sqft
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <Link
          to={createPageUrl("Listings")}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#082b86] px-7 py-4 text-sm font-extrabold text-white hover:bg-[#06216b]"
        >
          View All Listings
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
