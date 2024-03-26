import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import styles from './DropZoneImage.module.css';
import { Thumb } from '../Thumb/Thumb';

interface Props {
  className?: string;
  showMode?: boolean;
  titleHasNotFile?: React.ReactNode;
  hasFile?: string | undefined;
  handleFile?: (file) => void;
}
const accept = { 'image/*': ['.jpeg', '.png'] };

export const DropZoneImage: React.FC<Props> = ({
  className = '',
  hasFile = null,
  titleHasNotFile,
  handleFile = () => null,
  showMode = false,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      handleFile(file);

      if (file.size > 1500000) {
        toast.error('Imagem muito grande, tente novamente!');
        return;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
  });

  return (
    <div
      className={
        className
          ? className + ` ${styles['container-upload']} mb-6`
          : `${styles['container-upload']} mb-6 ${showMode ? styles['border-solid'] : ''}`
      }
    >
      {showMode && (
        <>
          <div className="text-center">
            <div className="w-full flex flex-row justify-center mb-4">
              <Thumb url={hasFile || 'https://placehold.co/200'} width={140} height={140} className={`rounded-full ${styles['image-show']}`} />
            </div>
          </div>
        </>
      )}
      {!showMode && (
        <>
          <div {...getRootProps({ className: 'drop_zone' })}>
            <input className="input-zone" {...getInputProps()} />
            <div className="text-center">
              <div className="w-full flex flex-row justify-center mb-2 cursor-pointer">
                {hasFile && !imagePreview && (
                  <Thumb
                    url={hasFile || 'https://placehold.co/200'}
                    width={120}
                    height={120}
                    className={`rounded-full ${styles['image-show-edit']}`}
                  />
                )}
                {imagePreview && !titleHasNotFile && (
                  <Thumb
                    url={imagePreview || 'https://placehold.co/200'}
                    width={120}
                    height={120}
                    className={`rounded-full ${styles['image-show-edit']}`}
                  />
                )}
                {imagePreview && titleHasNotFile && (
                  <img
                    src={imagePreview || 'https://placehold.co/200'}
                    alt="banner"
                    className="w-screen max-h-[388px] object-cover"
                  />
                )}
              </div>
              {isDragActive && (
                <p className="dropzone-content text-sm">
                  Área de transferência,
                  <br /> solte o arquivo
                </p>
              )}
              {!isDragActive && (
                <>
                  {hasFile && !titleHasNotFile &&  (
                    <p className="dropzone-content cursor-pointer text-sm">
                      Trocar imagem arraste ou <br /> clique aqui.
                    </p>
                  )}
                  {!hasFile &&
                    (titleHasNotFile ? (
                      titleHasNotFile
                    ) : (
                      <p className="dropzone-content cursor-pointer text-sm">
                        Arraste uma imagem ou <br /> clique aqui.
                      </p>
                    ))}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
