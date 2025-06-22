"use client";
import { useRouter } from "next/navigation";

export default function Pagination({
  currPage,
  totalItems,
  perPage,
  ...props
}) {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / perPage);
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    router.push(`?page=${page}`);
  };
  return (
    <div {...props}>
      <div className="flex justify-center gap-2">
        <button
        disabled={currPage==0}
          onClick={() => handlePageChange(parseInt(currPage) - 1)}
          className={`px-2 py-1 border rounded-md text-gray-200 flex gap-2 items-center ${
            currPage == 1 ? "text-gray-400 cursor-not-allowed " : ""
          }`}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          return (
            <button
            onClick={()=>handlePageChange(index+1)}
              className={`px-2 py-1 text-sm border rounded-md ${
                currPage == index + 1 ? "bg-gray-600/40" : "bg-transparent"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
        <button
        disabled={currPage ==totalPages}
          onClick={() => handlePageChange(parseInt(currPage) + 1)}
          className={`px-2 py-1 border rounded-md text-gray-200 flex gap-2 items-center ${
            currPage == totalPages ? "text-gray-400 cursor-not-allowed " : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
