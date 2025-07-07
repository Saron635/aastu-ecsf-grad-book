import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Cctv,
  ChevronLeft,
  ChevronRight,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "./ui/carousel";
import { Button } from "./ui/button";

interface ImageModalProps {
  fullscreenStartIndex: number;
  fullscreenImages: string[] | null;
  setFullscreenImages: Dispatch<SetStateAction<string[] | null>>;
}

export default function ImageModal({
  fullscreenImages,
  setFullscreenImages,
  fullscreenStartIndex,
}: ImageModalProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(fullscreenImages ? fullscreenImages.length : 0);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
    // Set initial index if images or start index changes
    if (fullscreenImages && fullscreenImages.length > 0) {
      api.scrollTo(fullscreenStartIndex || 0);
    }
  }, [api, fullscreenImages, fullscreenStartIndex]);

  // Reset current index when images or start index changes
  useEffect(() => {
    setCurrent(fullscreenStartIndex || 0);
  }, [fullscreenStartIndex, fullscreenImages]);

  // Always render the Dialog, control open state
  return (
    <Dialog
      open={!!fullscreenImages && fullscreenImages.length > 0}
      onOpenChange={() => setFullscreenImages(null)}
    >
      <DialogContent className="!max-w-full !w-screen !h-screen !p-0 !grid-cols-1 flex items-center justify-center bg-black/90">
        <DialogTitle className="sr-only">Student Image Gallery</DialogTitle>
        <div className="w-full h-full flex items-center justify-center relative">
          {fullscreenImages && fullscreenImages.length > 0 && (
            <>
              {/* Overlay Previous Button */}
              {fullscreenImages.length > 1 && (
                <Button
                  onClick={() => api && api.scrollPrev()}
                  size={"icon"}
                  className="rounded-full hidden md:absolute md:flex z-20 left-10 p-6"
                  variant={"secondary"}
                  title="Previous image"
                  tabIndex={0}
                >
                  <ChevronLeft />
                </Button>
              )}
              {/* Overlay Next Button */}
              {fullscreenImages.length > 1 && (
                <Button
                  onClick={() => api && api.scrollNext()}
                  size={"icon"}
                  className="rounded-full hidden md:absolute md:flex z-20 right-10 p-6"
                  variant={"secondary"}
                  title="Next image"
                  tabIndex={0}
                >
                  <ChevronRight />
                </Button>
              )}
              <Carousel
                setApi={setApi}
                opts={{ startIndex: fullscreenStartIndex }}
              >
                <CarouselContent className="items-center">
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
                <div className="flex w-full  items-center justify-center gap-4 mt-3">
                  {Array.from({ length: count }).map((_, index) => (
                    <div
                      key={index}
                      className={`size-3 transition-colors duration-200 rounded-full ${
                        index === current ? "bg-white" : "bg-white/40"
                      }`}
                    ></div>
                  ))}
                </div>
              </Carousel>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
