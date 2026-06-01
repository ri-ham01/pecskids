"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "ابحث عن صورة رمزية...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40"
        aria-hidden
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-12"
        aria-label="بحث في الصور الرمزية"
      />
    </div>
  );
}
