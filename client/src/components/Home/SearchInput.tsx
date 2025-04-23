import useFetch from "@/hooks/useFetch";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import React from "react";

interface SearchInputProps {
  search: string;
  onChange: (value: string) => void;
}

export function SearchInput({ search, onChange }: SearchInputProps) {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const {
    data: users,
    error,
    loading,
  } = useFetch(`${SERVER_URL}/users/?search=${search}`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <>
      <Input
        type="search"
        placeholder="Search by username or by name"
        value={search}
        onChange={handleChange}
      />
      {!!search && (
        <>
          <Separator />
          <div className="grow flex flex-col gap-2 overflow-y-auto">
            {users.map(({id, name, username}) => (
            <div key={id} className="p-4 transition-all duration-100 ease-in-out rounded flex gap-4 items-center cursor-pointer hover:bg-primary/10">
                <div className="bg-red-500 h-16 w-16 rounded-full" />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <h4 className="text-sm text-foreground/80">@{username}</h4>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
