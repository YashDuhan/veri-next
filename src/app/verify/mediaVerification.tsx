import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ClipboardCheck, Upload, X, Image as ImageIcon, Crop, Loader2 } from "lucide-react";
import Cropper from 'react-easy-crop';
import { cropImage } from './cropImage';
import { checkImage } from '@/app/integration/imgCheckIntegration';
import { verifyManually } from '@/app/integration/integration-core';
import { ManualVerificationResponse } from '@/app/integration/integration-types';
import PreviewResponse from './previewResponse';
import Image from 'next/image';

// Define the crop area type
interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Define proper types for the cropped area
interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function MediaVerification() {
  // Image states
  const [claimsImage, setClaimsImage] = useState<string | null>(null);
  const [ingredientsImage, setIngredientsImage] = useState<string | null>(null);
  
  // Text extraction states
  const [claimsText, setClaimsText] = useState<string>('');
  const [ingredientsText, setIngredientsText] = useState<string>('');
  const [isExtractingClaimsText, setIsExtractingClaimsText] = useState(false);
  const [isExtractingIngredientsText, setIsExtractingIngredientsText] = useState(false);
  
  // Verification states
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<ManualVerificationResponse | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  
  // Cropping states
  const [isCropping, setIsCropping] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [imageType, setImageType] = useState<'claims' | 'ingredients' | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  
  // Drag states
  const [isDraggingClaims, setIsDraggingClaims] = useState(false);
  const [isDraggingIngredients, setIsDraggingIngredients] = useState(false);
  
  // Refs for file inputs
  const claimsInputRef = useRef<HTMLInputElement>(null);
  const ingredientsInputRef = useRef<HTMLInputElement>(null);
  
  // Refs for editable divs
  const claimsTextRef = useRef<HTMLDivElement>(null);
  const ingredientsTextRef = useRef<HTMLDivElement>(null);

  // Process image file
  const processImageFile = (file: File, type: 'claims' | 'ingredients') => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result as string;
        setCurrentImage(imageUrl);
        setImageType(type);
        setIsCropping(true);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle claims image upload
  const handleClaimsImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0], 'claims');
    }
  };

  // Handle ingredients image upload
  const handleIngredientsImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0], 'ingredients');
    }
  };

  // Handle drag events for claims
  const handleDragEnterClaims = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingClaims(true);
  };

  const handleDragLeaveClaims = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingClaims(false);
  };

  const handleDragOverClaims = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDraggingClaims) {
      setIsDraggingClaims(true);
    }
  };

  const handleDropClaims = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingClaims(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        processImageFile(file, 'claims');
      }
    }
  };

  // Handle drag events for ingredients
  const handleDragEnterIngredients = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingIngredients(true);
  };

  const handleDragLeaveIngredients = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingIngredients(false);
  };

  const handleDragOverIngredients = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDraggingIngredients) {
      setIsDraggingIngredients(true);
    }
  };

  const handleDropIngredients = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingIngredients(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        processImageFile(file, 'ingredients');
      }
    }
  };

  // Handle button clicks
  const handleClaimsButtonClick = () => {
    claimsInputRef.current?.click();
  };

  const handleIngredientsButtonClick = () => {
    ingredientsInputRef.current?.click();
  };

  // Extract text from image
  const extractTextFromImageHandler = async (imageUrl: string, type: 'claims' | 'ingredients') => {
    try {
      // Set loading state
      if (type === 'claims') {
        setIsExtractingClaimsText(true);
      } else {
        setIsExtractingIngredientsText(true);
      }

      // Use the integration function to extract text
      const result = await checkImage(imageUrl);
      
      // Update state with extracted text or error message
      if (result.success) {
        if (type === 'claims') {
          setClaimsText(result.extractedText);
        } else {
          setIngredientsText(result.extractedText);
        }
      } else {
        if (type === 'claims') {
          setClaimsText(result.error || 'Error extracting text');
        } else {
          setIngredientsText(result.error || 'Error extracting text');
        }
      }
    } catch (error) {
      console.error('Error in text extraction handler:', error);
      
      // Set a generic error message
      const errorMessage = 'Error extracting text. Please try again.';
      
      if (type === 'claims') {
        setClaimsText(errorMessage);
      } else {
        setIngredientsText(errorMessage);
      }
    } finally {
      // Reset loading state
      if (type === 'claims') {
        setIsExtractingClaimsText(false);
      } else {
        setIsExtractingIngredientsText(false);
      }
    }
  };

  // Handle text extraction button clicks
  const handleExtractClaimsText = () => {
    if (claimsImage) {
      extractTextFromImageHandler(claimsImage, 'claims');
    }
  };

  const handleExtractIngredientsText = () => {
    if (ingredientsImage) {
      extractTextFromImageHandler(ingredientsImage, 'ingredients');
    }
  };

  // Remove claims image and text
  const removeClaimsImage = () => {
    setClaimsImage(null);
    setClaimsText('');
  };

  // Remove ingredients image and text
  const removeIngredientsImage = () => {
    setIngredientsImage(null);
    setIngredientsText('');
  };

  // Handle text change in editable divs
  const handleClaimsTextChange = (e: React.FormEvent<HTMLDivElement>) => {
    setClaimsText(e.currentTarget.textContent || '');
  };

  const handleIngredientsTextChange = (e: React.FormEvent<HTMLDivElement>) => {
    setIngredientsText(e.currentTarget.textContent || '');
  };

  // Update editable divs only when text is set from external sources (like OCR)
  useEffect(() => {
    if (claimsTextRef.current) {
      // Only update the content if it's different to avoid cursor reset
      if (claimsTextRef.current.textContent !== claimsText) {
        claimsTextRef.current.textContent = claimsText;
      }
    }
  }, [claimsText]);

  useEffect(() => {
    if (ingredientsTextRef.current) {
      // Only update the content if it's different to avoid cursor reset
      if (ingredientsTextRef.current.textContent !== ingredientsText) {
        ingredientsTextRef.current.textContent = ingredientsText;
      }
    }
  }, [ingredientsText]);

  // Handle crop complete
  const onCropComplete = useCallback((croppedArea: CropArea, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Apply crop
  const applyCrop = async () => {
    if (currentImage && croppedAreaPixels) {
      try {
        const croppedImageUrl = await cropImage(currentImage, croppedAreaPixels);
        
        if (imageType === 'claims') {
          setClaimsImage(croppedImageUrl);
          setClaimsText(''); // Reset text when image changes
        } else if (imageType === 'ingredients') {
          setIngredientsImage(croppedImageUrl);
          setIngredientsText(''); // Reset text when image changes
        }
        
        // Reset cropping state
        setIsCropping(false);
        setCurrentImage(null);
        setImageType(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
  };

  // Continue without cropping
  const continueWithoutCropping = () => {
    if (currentImage && imageType) {
      // Use the original image without cropping
      if (imageType === 'claims') {
        setClaimsImage(currentImage);
        setClaimsText('');
      } else if (imageType === 'ingredients') {
        setIngredientsImage(currentImage);
        setIngredientsText('');
      }
      
      // Reset cropping state
      setIsCropping(false);
      setCurrentImage(null);
      setImageType(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  };

  // Cancel crop
  const cancelCrop = () => {
    setIsCropping(false);
    setCurrentImage(null);
    setImageType(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  // Handle verification
  const handleVerify = async () => {
    if (!claimsText.trim() || !ingredientsText.trim()) {
      setVerificationError('Please extract or enter both claims and ingredients text');
      return;
    }

    try {
      setIsVerifying(true);
      setVerificationError(null);
      setVerificationResult(null);
      
      const result = await verifyManually(claimsText, ingredientsText);
      setVerificationResult(result);
    } catch (err) {
      setVerificationError(err instanceof Error ? err.message : 'An error occurred during verification');
      console.error('Verification error:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle check another
  const handleCheckAnother = () => {
    // Clear the result to show the form again
    setVerificationResult(null);
    
    // Clear all form fields
    setClaimsImage(null);
    setIngredientsImage(null);
    setClaimsText('');
    setIngredientsText('');
    
    // Clear any previous errors
    setVerificationError(null);
  };

  // If we're verifying or have a result, show the PreviewResponse component
  if (isVerifying || verificationResult) {
    return (
      <PreviewResponse 
        isLoading={isVerifying} 
        result={verificationResult} 
        onSearchAgain={handleCheckAnother}
      />
    );
  }

  return (
    <>
      {isCropping && currentImage ? (
        <Card>
          <CardHeader>
            <CardTitle>Crop Image</CardTitle>
            <CardDescription>
              Adjust the crop area to focus on the {imageType === 'claims' ? 'product claims' : 'ingredients list'}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-[400px] w-full">
              <Cropper
                image={currentImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Zoom</label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={cancelCrop}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={continueWithoutCropping}>
              Continue Without Cropping
            </Button>
            <Button onClick={applyCrop}>
              <Crop className="h-4 w-4 mr-2" />
              Apply Crop
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Upload Product Images</CardTitle>
            <CardDescription>
              Upload images of product claims and ingredients to verify their authenticity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Claims Image Upload */}
            <div>
              <h3 className="text-base font-medium mb-2">Product Claims Image</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload an image of the product&apos;s front label showing its claims.
              </p>
              
              {!claimsImage ? (
                <div 
                  className={`border-2 border-dashed ${isDraggingClaims ? 'border-primary' : 'border-primary/20'} rounded-lg p-8 w-full flex flex-col items-center justify-center transition-colors`}
                  onDragEnter={handleDragEnterClaims}
                  onDragOver={handleDragOverClaims}
                  onDragLeave={handleDragLeaveClaims}
                  onDrop={handleDropClaims}
                >
                  <ImageIcon className="h-12 w-12 text-primary/40 mb-4" />
                  <p className="text-center text-muted-foreground mb-4">
                    Drag and drop an image here, or click the button below to browse files.
                  </p>
                  <Button size="sm" type="button" onClick={handleClaimsButtonClick}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Claims Image
                  </Button>
                  <input 
                    ref={claimsInputRef}
                    id="claims-image-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleClaimsImageUpload}
                  />
                </div>
              ) : (
                <div className={`${claimsText ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}`}>
                  <div className="relative rounded-lg overflow-hidden border">
                    <Image 
                      src={claimsImage} 
                      alt="Product Claims" 
                      className="w-full h-auto max-h-[300px] object-contain"
                      width={500}
                      height={300}
                      style={{ objectFit: 'contain', maxHeight: '300px' }}
                    />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={removeClaimsImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 flex justify-center">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={handleExtractClaimsText}
                        disabled={isExtractingClaimsText}
                      >
                        {isExtractingClaimsText ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <ClipboardCheck className="h-4 w-4 mr-2" />
                        )}
                        {isExtractingClaimsText ? 'Extracting...' : 'Convert to Text'}
                      </Button>
                    </div>
                  </div>
                  
                  {claimsText && (
                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-2">Extracted Text (Editable)</h4>
                      <div
                        ref={claimsTextRef}
                        contentEditable
                        className="min-h-[150px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        onInput={handleClaimsTextChange}
                        suppressContentEditableWarning={true}
                        key={`claims-editable-${isExtractingClaimsText ? 'loading' : 'ready'}`}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <Separator />
            
            {/* Ingredients Image Upload */}
            <div>
              <h3 className="text-base font-medium mb-2">Product Ingredients Image</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload an image of the product&apos;s ingredients list.
              </p>
              
              {!ingredientsImage ? (
                <div 
                  className={`border-2 border-dashed ${isDraggingIngredients ? 'border-primary' : 'border-primary/20'} rounded-lg p-8 w-full flex flex-col items-center justify-center transition-colors`}
                  onDragEnter={handleDragEnterIngredients}
                  onDragOver={handleDragOverIngredients}
                  onDragLeave={handleDragLeaveIngredients}
                  onDrop={handleDropIngredients}
                >
                  <ImageIcon className="h-12 w-12 text-primary/40 mb-4" />
                  <p className="text-center text-muted-foreground mb-4">
                    Drag and drop an image here, or click the button below to browse files.
                  </p>
                  <Button size="sm" type="button" onClick={handleIngredientsButtonClick}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Ingredients Image
                  </Button>
                  <input 
                    ref={ingredientsInputRef}
                    id="ingredients-image-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleIngredientsImageUpload}
                  />
                </div>
              ) : (
                <div className={`${ingredientsText ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}`}>
                  <div className="relative rounded-lg overflow-hidden border">
                    <Image 
                      src={ingredientsImage} 
                      alt="Product Ingredients" 
                      className="w-full h-auto max-h-[300px] object-contain"
                      width={500}
                      height={300}
                      style={{ objectFit: 'contain', maxHeight: '300px' }}
                    />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={removeIngredientsImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 flex justify-center">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={handleExtractIngredientsText}
                        disabled={isExtractingIngredientsText}
                      >
                        {isExtractingIngredientsText ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <ClipboardCheck className="h-4 w-4 mr-2" />
                        )}
                        {isExtractingIngredientsText ? 'Extracting...' : 'Convert to Text'}
                      </Button>
                    </div>
                  </div>
                  
                  {ingredientsText && (
                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-2">Extracted Text (Editable)</h4>
                      <div
                        ref={ingredientsTextRef}
                        contentEditable
                        className="min-h-[150px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        onInput={handleIngredientsTextChange}
                        suppressContentEditableWarning={true}
                        key={`ingredients-editable-${isExtractingIngredientsText ? 'loading' : 'ready'}`}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleVerify}
              disabled={!claimsText.trim() || !ingredientsText.trim()}
            >
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Verify Claims
            </Button>

            {verificationError && (
              <div className="p-3 mt-2 bg-red-50 border border-red-200 text-red-700 rounded-md">
                <p className="text-sm">{verificationError}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
