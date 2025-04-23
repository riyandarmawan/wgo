import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import React from "react";

interface SearchInputProps {
  search: string;
  onChange: (value: string) => void;
}

export function SearchInput({ search, onChange }: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <>
      <Input
        type="search"
        placeholder="Search by username"
        value={search}
        onChange={handleChange}
      />
      {!!search && (
        <>
          <Separator />
          <div className="grow">
            {/* Insert search results or components here */}
          </div>
        </>
      )}
    </>
  );
}
