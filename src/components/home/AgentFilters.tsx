"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setFilters, clearFilters } from "@/store/agentSlice";
import { Search, X, Filter, ChevronDown } from "lucide-react";

export function AgentFilters() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { filters, agents } = useAppSelector((state) => state.agents);
  const [statusOpen, setStatusOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Get unique values for filter options
  const categories = [...new Set(agents.map((agent) => agent.category))];
  const statuses = [...new Set(agents.map((agent) => agent.status))];
  const pricingModels = [...new Set(agents.map((agent) => agent.pricingModel))];

  // Update URL with current filters
  const updateURL = (newFilters: typeof filters) => {
    const params = new URLSearchParams();

    if (newFilters.search) {
      params.set("search", newFilters.search);
    }

    if (newFilters.status.length > 0) {
      params.set("status", newFilters.status.join(","));
    }

    if (newFilters.category.length > 0) {
      params.set("category", newFilters.category.join(","));
    }

    if (newFilters.pricingModel) {
      params.set("pricing", newFilters.pricingModel);
    }

    const paramString = params.toString();
    const url = paramString ? `${pathname}?${paramString}` : pathname;

    // Update URL without causing a full page reload
    router.replace(url, { scroll: false });
  };

  // Initialize filters from URL on mount only
  useEffect(() => {
    if (!isInitialized) {
      const urlSearch = searchParams.get("search") || "";
      const urlStatus =
        searchParams.get("status")?.split(",").filter(Boolean) || [];
      const urlCategory =
        searchParams.get("category")?.split(",").filter(Boolean) || [];
      const urlPricing = searchParams.get("pricing") || "";

      const urlFilters = {
        search: urlSearch,
        status: urlStatus,
        category: urlCategory,
        pricingModel: urlPricing,
      };

      // Only update if there are URL parameters
      if (
        urlSearch ||
        urlStatus.length > 0 ||
        urlCategory.length > 0 ||
        urlPricing
      ) {
        dispatch(setFilters(urlFilters));
      }

      setIsInitialized(true);
    }
  }, [searchParams, dispatch, isInitialized]);

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value };
    dispatch(setFilters({ search: value }));
    updateURL(newFilters);
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...filters.status, status]
      : filters.status.filter((s) => s !== status);
    const newFilters = { ...filters, status: newStatuses };
    dispatch(setFilters({ status: newStatuses }));
    updateURL(newFilters);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.category, category]
      : filters.category.filter((c) => c !== category);
    const newFilters = { ...filters, category: newCategories };
    dispatch(setFilters({ category: newCategories }));
    updateURL(newFilters);
  };

  const handlePricingChange = (value: string) => {
    const pricingModel = value === "all" ? "" : value;
    const newFilters = { ...filters, pricingModel };
    dispatch(setFilters({ pricingModel }));
    updateURL(newFilters);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters =
    filters.search ||
    filters.status.length > 0 ||
    filters.category.length > 0 ||
    filters.pricingModel;

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-blue-50/80 to-purple-50/80 dark:from-slate-800/80 dark:via-slate-700/80 dark:to-slate-800/80 backdrop-blur-sm" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl opacity-60" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl opacity-60" />

      {/* Border gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-200/50 via-purple-200/50 to-pink-200/50 dark:from-blue-800/50 dark:via-purple-800/50 dark:to-pink-800/50 p-[1px]">
        <div className="w-full h-full bg-white/90 dark:bg-slate-900/90 rounded-xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex flex-col gap-6">
          {/* Search Input */}
          <motion.div
            className="w-full relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents by name or description..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-blue-200/50 dark:border-blue-800/50"
            />
          </motion.div>

          {/* Filter Row */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Status Filter */}
            <motion.div
              className="flex-1 min-w-[150px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Popover open={statusOpen} onOpenChange={setStatusOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between hover:bg-accent transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Status{" "}
                      {filters.status.length > 0 &&
                        `(${filters.status.length})`}
                    </div>
                    <motion.div
                      animate={{ rotate: statusOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <div className="p-4">
                    <div className="space-y-2">
                      {statuses.map((status, index) => (
                        <motion.div
                          key={status}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Checkbox
                            id={`status-${status}`}
                            checked={filters.status.includes(status)}
                            onCheckedChange={(checked) =>
                              handleStatusChange(status, checked as boolean)
                            }
                          />
                          <label
                            htmlFor={`status-${status}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {status}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              className="flex-1 min-w-[150px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between hover:bg-accent transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Category{" "}
                      {filters.category.length > 0 &&
                        `(${filters.category.length})`}
                    </div>
                    <motion.div
                      animate={{ rotate: categoryOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <div className="p-4">
                    <div className="space-y-2">
                      {categories.map((category, index) => (
                        <motion.div
                          key={category}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Checkbox
                            id={`category-${category}`}
                            checked={filters.category.includes(category)}
                            onCheckedChange={(checked) =>
                              handleCategoryChange(category, checked as boolean)
                            }
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </motion.div>

            {/* Pricing Filter */}
            <motion.div
              className="flex-1 min-w-[150px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Select
                value={filters.pricingModel || "all"}
                onValueChange={handlePricingChange}
              >
                <SelectTrigger className="transition-all duration-200 hover:bg-accent bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700">
                  <SelectValue placeholder="Pricing Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pricing Models</SelectItem>
                  {pricingModels.map((pricing) => (
                    <SelectItem key={pricing} value={pricing}>
                      {pricing}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Clear Filters Button */}
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 whitespace-nowrap hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-red-200/50 dark:border-red-800/50 hover:border-red-300 dark:hover:border-red-700"
                  >
                    <X className="h-4 w-4" />
                    Clear All
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
