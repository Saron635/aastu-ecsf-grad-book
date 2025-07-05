import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

interface JourneyImageModalProps {
  fullscreenStartIndex: number;
  fullscreenImages: string[] | null;
  setFullscreenImages: Dispatch<SetStateAction<string[] | null>>;
}

export default function JourneyImageModal({
  fullscreenImages,
  setFullscreenImages,
  fullscreenStartIndex,
}: JourneyImageModalProps) {
  if (!fullscreenImages) {
    return;
  }

  return (
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
  );
}
