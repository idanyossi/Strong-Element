import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
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
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import ListingFilters from "../components/listings/ListingFilters";
import ListingCard from "../components/listings/ListingCard";
import AddListingDialog from "../components/listings/AddListingDialog";

const ITEMS_PER_PAGE = 12;

export default function Listings() {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    base44.auth
      .me()
      .then(setUser)
      .catch(() => {});
  }, []);

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: () => base44.entities.Listing.list("-created_date", 200),
  });

  const isAdmin = user?.role === "admin";

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
        (a, b) => new Date(b.created_date) - new Date(a.created_date),
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
    <div className="pt-20">
      {/* Header */}
      <section className="bg-[#0A1628] py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.04]">
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
                Properties
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              All Listings
            </h1>
            <p className="mt-2 text-slate-400">
              {filteredListings.length}{" "}
              {filteredListings.length === 1 ? "property" : "properties"} found
            </p>
          </div>
          {isAdmin && <AddListingDialog />}
        </div>
      </section>

      {/* Mobile filters toggle */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 text-sm font-medium text-[#0A1628]"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-36 rounded-none h-9 text-xs border-slate-200">
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
        <div className="lg:hidden">
          <ListingFilters filters={filters} setFilters={setFilters} isMobile />
        </div>
      )}

      {/* Main content */}
      <section className="py-8 lg:py-12 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
                <p className="text-sm text-slate-500">
                  Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(page * ITEMS_PER_PAGE, filteredListings.length)} of{" "}
                  {filteredListings.length}
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44 rounded-none h-10 border-slate-200">
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
                <div className="flex items-center justify-center py-32">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
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
                    className="mt-4 text-[#C9A84C] text-sm font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedListings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
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
                        className="rounded-none w-10 h-10 border-slate-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
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
                              className={`rounded-none w-10 h-10 ${
                                page === p
                                  ? "bg-[#0A1628] hover:bg-[#1B2D4F] text-white"
                                  : "border-slate-200"
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
                        className="rounded-none w-10 h-10 border-slate-200"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
