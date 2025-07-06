"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const { filters, agents } = useAppSelector((state) => state.agents);
  const [statusOpen, setStatusOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  // Get unique values for filter options
  const categories = [...new Set(agents.map((agent) => agent.category))];
  const statuses = [...new Set(agents.map((agent) => agent.status))];
  const pricingModels = [...new Set(agents.map((agent) => agent.pricingModel))];

  const handleSearchChange = (value: string) => {
    dispatch(setFilters({ search: value }));
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...filters.status, status]
      : filters.status.filter((s) => s !== status);
    dispatch(setFilters({ status: newStatuses }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.category, category]
      : filters.category.filter((c) => c !== category);
    dispatch(setFilters({ category: newCategories }));
  };

  const handlePricingChange = (value: string) => {
    const pricingModel = value === "all" ? "" : value;
    dispatch(setFilters({ pricingModel }));
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
    <div className="bg-card p-4 sm:p-6 rounded-lg border shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <div className="w-full relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents by name or description..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Status Filter */}
          <div className="flex-1 min-w-[150px]">
            <Popover open={statusOpen} onOpenChange={setStatusOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between hover:bg-accent transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Status{" "}
                    {filters.status.length > 0 && `(${filters.status.length})`}
                  </div>
                  <div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <div className="p-4">
                  <div className="space-y-2">
                    {statuses.map((status) => (
                      <div key={status} className="flex items-center space-x-2">
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
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Category Filter */}
          <div className="flex-1 min-w-[150px]">
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between hover:bg-accent transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Category{" "}
                    {filters.category.length > 0 &&
                      `(${filters.category.length})`}
                  </div>
                  <div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <div className="p-4">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
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
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Pricing Filter */}
          <div className="flex-1 min-w-[150px]">
            <Select
              value={filters.pricingModel || "all"}
              onValueChange={handlePricingChange}
            >
              <SelectTrigger className="transition-all duration-200 hover:bg-accent">
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
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="flex items-center gap-2 whitespace-nowrap hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
              >
                <X className="h-4 w-4" />
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
