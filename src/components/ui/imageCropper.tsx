'use client';

import React, { type SyntheticEvent } from 'react';

import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from 'react-image-crop';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

import 'react-image-crop/dist/ReactCrop.css';
import { CropIcon, Trash2Icon } from 'lucide-react';

interface ImageCropperProps {
  className?: string;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: any | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<any | null>>;
  finalFile: any | null;
  setFinalFile: React.Dispatch<React.SetStateAction<any | null>>;
}

export function ImageCropper({
  className,
  dialogOpen,
  setDialogOpen,
  selectedFile,
  setSelectedFile,
  finalFile,
  setFinalFile,
}: ImageCropperProps) {
  const aspect = 1;

  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const [crop, setCrop] = React.useState<Crop>();
  const [croppedImageUrl, setCroppedImageUrl] = React.useState<string>('');
  const [croppedImage, setCroppedImage] = React.useState<string>('');

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onCropComplete(crop: PixelCrop) {
    if (imgRef.current && crop.width && crop.height ) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      setCroppedImageUrl(croppedImageUrl);
    }
  }

  function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): string {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );
    }

    return canvas.toDataURL('image/png', 1.0);
  }

  async function onCrop() {
    try {
      setCroppedImage(croppedImageUrl);
      setSelectedFile(croppedImageUrl);
      setFinalFile(croppedImageUrl);
      setDialogOpen(false);
    } catch (error) {
      alert('Something went wrong!');
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Avatar className={`size-24 cursor-pointer ring-slate-200 ${className}`}>
          <AvatarImage src={finalFile} alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className='gap-0 p-0'>
        <div className='size-full p-6'>
          <ReactCrop
            minHeight={220}
            minWidth={220}
            
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => onCropComplete(c)}
            aspect={aspect}
            className='w-full'
          >
            <Avatar className='size-full rounded-none'>
              <AvatarImage
                ref={imgRef}
                className='size-full rounded-none'
                alt='Image Cropper Shell'
                src={selectedFile?.preview}
                onLoad={onImageLoad}
              />
              <AvatarFallback className='size-full min-h-[460px] rounded-none'>
                Loading...
              </AvatarFallback>
            </Avatar>
          </ReactCrop>
        </div>
        <DialogFooter className='justify-center p-6 pt-0'>
          <DialogClose asChild>
            <Button
              size={'sm'}
              type='reset'
              className='w-fit'
              variant={'outline'}
              onClick={() => {
                setSelectedFile(null);
              }}
            >
              <Trash2Icon className='mr-1.5 size-4' />
              Cancel
            </Button>
          </DialogClose>
          <Button type='submit' size={'sm'} className='w-fit' onClick={onCrop}>
            <CropIcon className='mr-1.5 size-4' />
            Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to center the crop
export function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 50,
        height: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
