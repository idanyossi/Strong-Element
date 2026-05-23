import React, { useState, useEffect, useMemo } from "react";
import { api } from "@/api/client";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SlidersHorizontal,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import ListingFilters from "../components/listings/ListingFilters";
import ListingCard from "../components/listings/ListingCard";
import ListingModal from "../components/listings/ListingModal";
import AddListingDialog from "../components/listings/AddListingDialog";

const ITEMS_PER_PAGE = 12;

export default function Listings() {
  const [filters, setFilters] = useState({
    search: "",
    property_type: "all",
    status: "all",
    min_price: "",
    max_price: "",
    bedrooms: "all",
    city: "",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: () => api.listings.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.listings.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["featured-listings"] });
    },
  });

  // Apply filters
  const filteredListings = useMemo(() => {
    let result = [...listings];

    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(
        (l) =>
          l.title?.toLowerCase().includes(s) ||
          l.city?.toLowerCase().includes(s) ||
          l.neighborhood?.toLowerCase().includes(s) ||
          l.description?.toLowerCase().includes(s),
      );
    }
    if (filters.property_type !== "all") {
      result = result.filter((l) => l.property_type === filters.property_type);
    }
    if (filters.status !== "all") {
      result = result.filter((l) => l.status === filters.status);
    }
    if (filters.bedrooms !== "all") {
      result = result.filter(
        (l) => (l.bedrooms || 0) >= Number(filters.bedrooms),
      );
    }
    if (filters.city) {
      const c = filters.city.toLowerCase();
      result = result.filter((l) => l.city?.toLowerCase().includes(c));
    }
    if (filters.min_price) {
      result = result.filter(
        (l) => (l.price || 0) >= Number(filters.min_price),
      );
    }
    if (filters.max_price) {
      result = result.filter(
        (l) => (l.price || 0) <= Number(filters.max_price),
      );
    }

    // Sort
    if (sortBy === "price_asc")
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortBy === "price_desc")
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    else
      result.sort(
        (a, b) =>
          new Date(b.created_date).getTime() -
          new Date(a.created_date).getTime(),
      );

    return result;
  }, [listings, filters, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredListings.length / ITEMS_PER_PAGE),
  );
  const paginatedListings = filteredListings.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setPage(1);
  }, [filters, sortBy]);

  return (
    <div className="bg-[#f4f4f4] pt-24">
      {/* Header */}
      <section className="px-5 pb-8 pt-8 sm:px-8 lg:pt-14">
        <div className="mx-auto flex max-w-[1760px] flex-col items-start justify-between gap-8 rounded-[34px] bg-[#082b86] px-7 py-14 text-white sm:flex-row sm:items-end sm:px-10 lg:rounded-[44px] lg:px-14 lg:py-20">
          <div>
            <p className="mb-4 text-sm font-black text-white/75">Properties</p>
            <h1 className="text-5xl font-black leading-none tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              All Listings
            </h1>
            <p className="mt-5 text-lg font-bold text-white/75">
              {filteredListings.length}{" "}
              {filteredListings.length === 1 ? "property" : "properties"} found
            </p>
          </div>
          {isAdmin && <AddListingDialog />}
        </div>
      </section>

      {/* Mobile filters toggle */}
      <div className="mx-5 mb-4 flex items-center justify-between rounded-full bg-white px-4 py-3 sm:mx-8 lg:hidden">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 text-sm font-extrabold text-[#082b86]"
          type="button"
          aria-expanded={showMobileFilters}
          aria-controls="mobile-listing-filters"
        >
          <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger
            className="h-10 w-40 rounded-full border-slate-200 text-xs"
            aria-label="Sort listings"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price_asc">Price: Low → High</SelectItem>
            <SelectItem value="price_desc">Price: High → Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile filters */}
      {showMobileFilters && (
        <div className="lg:hidden" id="mobile-listing-filters">
          <ListingFilters filters={filters} setFilters={setFilters} isMobile />
        </div>
      )}

      {/* Main content */}
      <section className="min-h-[60vh] px-5 pb-20 pt-6 sm:px-8 lg:pb-28 lg:pt-8">
        <div className="mx-auto max-w-[1760px]">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <ListingFilters
                filters={filters}
                setFilters={setFilters}
                isMobile={false}
              />
            </div>

            {/* Listings Grid */}
            <div className="flex-1">
              {/* Desktop sort bar */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-sm font-bold text-slate-500">
                  Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(page * ITEMS_PER_PAGE, filteredListings.length)} of{" "}
                  {filteredListings.length}
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger
                    className="h-11 w-52 rounded-full border-slate-200"
                    aria-label="Sort listings"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price_asc">Price: Low → High</SelectItem>
                    <SelectItem value="price_desc">
                      Price: High → Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-32" role="status" aria-live="polite">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" aria-hidden="true" />
                  <span className="sr-only">Loading listings</span>
                </div>
              ) : paginatedListings.length === 0 ? (
                <div className="text-center py-32">
                  <p className="text-slate-400 text-lg">
                    No properties match your criteria
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        search: "",
                        property_type: "all",
                        status: "all",
                        min_price: "",
                        max_price: "",
                        bedrooms: "all",
                        city: "",
                      })
                    }
                    className="mt-4 rounded-full bg-[#082b86] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#06216b]"
                    type="button"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {paginatedListings.map((listing) => (
                      <div
                        key={listing.id}
                        onClick={() => setSelectedListing(listing)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedListing(listing);
                          }
                        }}
                        className="cursor-pointer text-start"
                        role="button"
                        tabIndex={0}
                        aria-label={`View details for ${listing.title}`}
                      >
                        <ListingCard
                          listing={listing}
                          isAdmin={isAdmin}
                          onDelete={(id) => deleteMutation.mutate(id)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="h-11 w-11 rounded-full border-slate-200 bg-white"
                        aria-label="Previous listings page"
                      >
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                          (p) =>
                            p === 1 ||
                            p === totalPages ||
                            Math.abs(p - page) <= 1,
                        )
                        .reduce((acc, p, i, arr) => {
                          if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
                          acc.push(p);
                          return acc;
                        }, [])
                        .map((p, i) =>
                          p === "..." ? (
                            <span key={`e${i}`} className="px-2 text-slate-400">
                              …
                            </span>
                          ) : (
                            <Button
                              key={p}
                              variant={page === p ? "default" : "outline"}
                              onClick={() => setPage(p)}
                              aria-label={`Go to listings page ${p}`}
                              aria-current={page === p ? "page" : undefined}
                              className={`rounded-none w-10 h-10 ${
                                page === p
                                  ? "bg-[#082b86] text-white hover:bg-[#06216b]"
                                  : "border-slate-200 bg-white"
                              }`}
                            >
                              {p}
                            </Button>
                          ),
                        )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page === totalPages}
                        className="h-11 w-11 rounded-full border-slate-200 bg-white"
                        aria-label="Next listings page"
                      >
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <ListingModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />
    </div>
  );
}
