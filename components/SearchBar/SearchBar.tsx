import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
}

const SearchBar = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
}: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" color="primary" variant="bordered">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
