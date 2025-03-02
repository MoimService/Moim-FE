import { cn } from '@/util/cn';
import { Search } from 'lucide-react';
import * as React from 'react';

interface SearchInputProps {
  onSearch?: () => void;
}

type CombinedSearchInputProps = React.ComponentProps<'input'> &
  SearchInputProps;

const SearchInput = React.forwardRef<
  HTMLInputElement,
  CombinedSearchInputProps
>(({ className, type, onSearch, ...props }, ref) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        placeholder="검색어를 입력하세요"
        className={cn(
          'typo-button1 flex h-12 w-full rounded-2xl border border-main bg-transparent px-3 py-1 text-base text-Cgray500 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        )}
        ref={ref}
        {...props}
      />
      <Search
        className="absolute right-4 top-3 stroke-Cgray500"
        width={24}
        height={24}
        onClick={onSearch}
      />
    </div>
  );
});
SearchInput.displayName = 'SearchInput';

export { SearchInput };
