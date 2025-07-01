"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import StudentCard from "@/components/StudentCard";
import { useTheme } from "@/contexts/ThemeContext";
import { translations } from "@/data/translations";
import { studentsData } from "@/data/studentsData";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Add Student type
interface Student {
  name: string;
  quote: string;
  image_urls: string[];
  video_urls: string[];
  fieldOfStudy: string;
}

export default function StudentsSection() {
  const { isDark, language } = useTheme();
  const t = translations[language];
  const students = studentsData;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const studentsPerPage = 2;
  const [fullscreenImages, setFullscreenImages] = useState<string[] | null>(
    null
  );
  const [fullscreenStartIndex, setFullscreenStartIndex] = useState(0);
  const [fieldFilter, setFieldFilter] = useState<string>("all");

  const uniqueFields = Array.from(
    new Set(students.map((s) => s.fieldOfStudy).filter(Boolean))
  );

  const filteredStudents = students.filter((student) => {
    const matchesName = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesField =
      fieldFilter === "all" ? true : student.fieldOfStudy === fieldFilter;
    return matchesName && matchesField;
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsFlipping(false);
    }, 300);
  };

  return (
    <div>
      {/* Filter and Search */}
      <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Select value={fieldFilter} onValueChange={setFieldFilter}>
          <SelectTrigger
            className={`w-full sm:w-56 text-sm sm:text-base rounded-md shadow-sm transition-colors
              ${
                isDark
                  ? "bg-gray-800/70 border-gray-600/50 text-blue-200"
                  : "bg-white/70 border-gray-200/50 text-blue-700"
              }
              backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
          >
            <SelectValue placeholder="All Fields" />
          </SelectTrigger>
          <SelectContent
            className={`rounded-md shadow-lg mt-1
              ${
                isDark
                  ? "bg-gray-800 text-blue-200 border-gray-700"
                  : "bg-white text-blue-700 border-gray-200"
              }`}
          >
            <SelectItem value="all">All Fields</SelectItem>
            {uniqueFields.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1">
          <Search
            className={`absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 ${
              isDark ? "text-gray-400" : "text-gray-400"
            } w-3 h-3 sm:w-4 sm:h-4`}
          />
          <Input
            placeholder={t.searchStudents}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-6 sm:pl-10 text-sm sm:text-base ${
              isDark
                ? "bg-gray-800/70 border-gray-600/50"
                : "bg-white/70 border-gray-200/50"
            } backdrop-blur-sm`}
          />
        </div>
      </div>

      {/* Book Pages */}
      <div className="relative">
        {/* Decorative Book Corners */}
        <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-4 h-4 sm:w-8 sm:h-8 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-amber-400 opacity-30"></div>
        <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-4 h-4 sm:w-8 sm:h-8 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-amber-400 opacity-30"></div>
        <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-4 h-4 sm:w-8 sm:h-8 border-l-2 sm:border-l-4 border-b-2 sm:border-b-4 border-amber-400 opacity-30"></div>
        <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-4 h-4 sm:w-8 sm:h-8 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 border-amber-400 opacity-30"></div>

        {/* Book Page */}
        <div
          className={`${
            isDark ? "bg-gray-800/90" : "bg-white/90"
          } backdrop-blur-sm rounded-lg shadow-2xl border ${
            isDark ? "border-gray-700/50" : "border-gray-200/50"
          } p-3 sm:p-4 md:p-6 lg:p-8 min-h-[500px] sm:min-h-[600px] md:min-h-[700px] transition-all duration-300 ${
            isFlipping ? "transform scale-95 opacity-50" : ""
          }`}
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(17, 24, 39, 0.9) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
            boxShadow: isDark
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
          }}
        >
          {/* Page Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h2
              className={`text-lg sm:text-xl md:text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-800"
              } mb-1 sm:mb-2 ${language === "am" ? "font-serif" : ""}`}
            >
              {language === "en"
                ? "Class of 2025 - AASTU ECSF"
                : "የ2025 ክፍል - አስቱ ኢክስኤፍ"}
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-16 sm:w-24 md:w-32 mx-auto"></div>
          </div>

          {/* Students Rows - 2 per page, each as a flex row */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12 mb-4 sm:mb-6 md:mb-8">
            {currentStudents.map((student, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={student.name + "-" + startIndex + "-" + idx}
                  className={`flex flex-col lg:flex-row items-center lg:items-stretch bg-gradient-to-r from-blue-50/40 to-cyan-50/40 dark:from-gray-800/60 dark:to-gray-900/60 rounded-lg sm:rounded-xl shadow-lg overflow-hidden min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[420px] ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Side */}
                  <div className="flex-shrink-0 w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-blue-100/40 to-cyan-100/40 dark:from-gray-900/60 dark:to-gray-800/60">
                    <Image
                      src={student.image_urls[0] || "/placeholder.svg"}
                      alt={student.name}
                      width={420}
                      height={420}
                      className="rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl object-contain w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] border-2 sm:border-4 border-white dark:border-gray-700 bg-white dark:bg-gray-900"
                      onClick={() => {
                        if (student.image_urls.length > 0) {
                          setFullscreenImages(student.image_urls);
                          setFullscreenStartIndex(0);
                        }
                      }}
                      style={{
                        cursor:
                          student.image_urls.length > 0 ? "pointer" : "default",
                      }}
                    />
                  </div>
                  {/* Details Side */}
                  <div className="flex-1 flex flex-col justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 md:mb-4 tracking-tight ${
                        isDark ? "text-white" : "text-gray-800"
                      } ${language === "am" ? "font-serif" : ""}`}
                    >
                      {student.name}
                    </h3>
                    <span
                      className={`inline-block mb-2 sm:mb-3 md:mb-4 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm ${
                        isDark
                          ? "bg-blue-900 text-blue-200"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {student.fieldOfStudy}
                    </span>
                    <blockquote
                      className={`text-sm sm:text-base md:text-lg lg:text-xl italic font-medium leading-relaxed mb-2 ${
                        isDark ? "text-blue-200" : "text-blue-700"
                      } ${language === "am" ? "text-right font-serif" : ""}`}
                    >
                      {student.quote || (
                        <span className="text-gray-400">
                          No quote provided.
                        </span>
                      )}
                    </blockquote>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 w-full">
              <div className="w-full overflow-x-auto custom-scrollbar">
                <div className="flex flex-row justify-center items-center gap-1 sm:gap-2 min-w-[240px] w-max mx-auto px-1">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className={`text-xs sm:text-sm px-2 sm:px-3 ${
                      isDark
                        ? "bg-gray-700/70 border-gray-600"
                        : "bg-white/70 border-gray-200"
                    } backdrop-blur-sm`}
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {t.previous}
                  </Button>
                  <div className="flex gap-1 sm:gap-2">
                    {(() => {
                      const windowSize =
                        typeof window !== "undefined" && window.innerWidth < 640
                          ? 3
                          : 5;
                      let start = Math.max(
                        1,
                        currentPage - Math.floor(windowSize / 2)
                      );
                      let end = start + windowSize - 1;
                      if (end > totalPages) {
                        end = totalPages;
                        start = Math.max(1, end - windowSize + 1);
                      }
                      return Array.from(
                        { length: end - start + 1 },
                        (_, i) => start + i
                      ).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => handlePageChange(page)}
                          className={`text-xs sm:text-sm px-2 sm:px-3 min-w-[32px] ${
                            currentPage === page
                              ? "bg-blue-500 hover:bg-blue-600"
                              : `${
                                  isDark
                                    ? "bg-gray-700/70 border-gray-600"
                                    : "bg-white/70 border-gray-200"
                                } backdrop-blur-sm`
                          }`}
                        >
                          {page}
                        </Button>
                      ));
                    })()}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`text-xs sm:text-sm px-2 sm:px-3 ${
                      isDark
                        ? "bg-gray-700/70 border-gray-600"
                        : "bg-white/70 border-gray-200"
                    } backdrop-blur-sm`}
                  >
                    {t.next}
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Image Dialog */}
      {fullscreenImages && (
        <Dialog
          open={!!fullscreenImages}
          onOpenChange={() => setFullscreenImages(null)}
        >
          <DialogContent className="!max-w-full !w-screen !h-screen !p-0 !grid-cols-1 flex items-center justify-center bg-black/90">
            <DialogTitle className="sr-only">Student Image Gallery</DialogTitle>
            <div className="w-full h-full flex items-center justify-center relative">
              <Carousel opts={{ startIndex: fullscreenStartIndex }}>
                <CarouselContent>
                  {fullscreenImages.map((img, idx) => (
                    <CarouselItem
                      key={idx}
                      className="flex items-center justify-center w-full h-full"
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Student Image ${idx + 1}`}
                        width={1600}
                        height={1200}
                        className="object-contain w-full h-full max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {fullscreenImages.length > 1 && <CarouselPrevious />}
                {fullscreenImages.length > 1 && <CarouselNext />}
              </Carousel>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
