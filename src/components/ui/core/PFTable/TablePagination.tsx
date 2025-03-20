import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../button";

const TablePagination = ({ totalPage }: { totalPage: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  const router = useRouter();
  const pathname = usePathname();

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathname}?page=${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathname}?page=${currentPage + 1}`);
    }
  };

  return (
    <div className="flex items-center gap-5 my-5">
      <Button
        disabled={currentPage === 1}
        onClick={handlePrev}
        variant="outline"
        size="sm"
        className={
          currentPage === 1 ? "bg-[#02240e] cursor-not-allowed border-none" : ""
        }
      >
        <ArrowLeft />
      </Button>

      {[...Array(totalPage)].map((_, index) => (
        <Button
          onClick={() => {
            setCurrentPage(index + 1);
            router.push(`${pathname}?page=${index + 1}`);
          }}
          variant={currentPage === index + 1 ? "default" : "outline"}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        disabled={currentPage === totalPage}
        variant="outline"
        size="sm"
        onClick={handleNext}
        className={
          currentPage === totalPage
            ? "bg-[#02240e] cursor-not-allowed border-none"
            : ""
        }
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default TablePagination;
