'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquiryFormSchema } from '@/lib/validations';
import { z } from 'zod';
import { Send, Upload, X } from 'lucide-react';
import { fileUploadService } from '@/lib/firebase/collections';
import { inquiryService } from '@/lib/firebase/collections';

type InquiryFormData = z.infer<typeof inquiryFormSchema>;

interface InquiryFormProps {
  projectId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function InquiryForm({ projectId, onSuccess, onCancel }: InquiryFormProps) {
  const t = useTranslations('inquiry');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      projectId,
      referenceImages: [],
    },
  });

  const handleImageUpload = async (files: FileList) => {
    const newFiles = Array.from(files);
    const uploadPromises = newFiles.map(async (file, index) => {
      try {
        const url = await fileUploadService.uploadImage(
          file,
          `inquiries/${Date.now()}_${file.name}`
        );
        return url;
      } catch (error) {
        console.error('Upload error:', error);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const validUrls = results.filter((url): url is string => url !== null);
    
    setUploadedImages(prev => [...prev, ...validUrls]);
    setValue('referenceImages', [...uploadedImages, ...validUrls]);
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setValue('referenceImages', newImages);
  };

  const onSubmit = async (data: InquiryFormData) => {
    setIsLoading(true);
    try {
      await inquiryService.create({
        ...data,
        status: 'pending',
        priority: 'medium',
        referenceImages: uploadedImages,
      });
      
      reset();
      setUploadedImages([]);
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('fullName')}
          </label>
          <input
            {...register('clientName')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder={t('fullNamePlaceholder')}
          />
          {errors.clientName && (
            <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('email')}
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder={t('emailPlaceholder')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('phone')}
        </label>
        <input
          {...register('phone')}
          type="tel"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder={t('phonePlaceholder')}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('subject')}
        </label>
        <input
          {...register('subject')}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder={t('subjectPlaceholder')}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('message')}
        </label>
        <textarea
          {...register('message')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder={t('messagePlaceholder')}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('referenceImages')}
        </label>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-6 py-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-amber-500">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">{t('uploadImages')}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
              />
            </label>
          </div>

          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {uploadedImages.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? t('sending') : t('send')}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('cancel')}
          </button>
        )}
      </div>
    </form>
  );
}
