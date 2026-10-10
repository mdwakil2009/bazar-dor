
"use client";

interface Props {
  sort: string;
  setSort: (value: string) => void;
}

const SortProducts = ({ sort, setSort }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">সাজান</span>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="select select-sm"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-low">দাম: কম থেকে বেশি</option>
        <option value="price-high">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
};

export default SortProducts;
