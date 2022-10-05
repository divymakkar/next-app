import React, { Suspense, useEffect, useState } from "react";
import ReactModal from "react-modal";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
const ImageBox = React.lazy(() => import("@/components/ImageBox"));

interface propType {
  currentMedia: number;
  media: any[];
  mediaCaptions?: string[];
  onCloseRequest?: any;
  youtubeVideoId?: string;
}

const ScrollGallery = ({
  media,
  currentMedia,
  onCloseRequest,
  youtubeVideoId,
}: propType) => {
  const [lightboxOpened, toggleLightboxOpened] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(currentMedia);

  useEffect(() => {
    document.querySelectorAll("body")[0].style.overflowY = "hidden";

    return () => {
      document.querySelectorAll("body")[0].style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <ReactModal
        isOpen
        overlayClassName="scroll-gallery__overlay"
        className="scroll-gallery"
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        onRequestClose={onCloseRequest}
      >
        <button
          type="button"
          className="icon-close availability__close-btn"
          onClick={onCloseRequest}
          aria-label="Close Gallery"
        >
          X
        </button>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 2 }}
          className="scroll-gallery__grid"
        >
          {!youtubeVideoId && (
            <div className="scroll-gallery__banner-img">
              <button
                type="button"
                className="scroll-gallery__grid-img"
                onClick={() => {
                  setCurrentIndex(0);
                  toggleLightboxOpened(!lightboxOpened);
                }}
              >
                <img
                  src={media?.[0]?.sources?.gridGallerySrc}
                  alt={media?.[0]?.caption}
                  loading="lazy"
                />
              </button>
            </div>
          )}
          <Masonry gutter="5px">
            {media?.slice(1).map((item, index) => {
              return (
                <>
                  <button
                    type="button"
                    className="scroll-gallery__grid-img"
                    onClick={() => {
                      setCurrentIndex(index + 1);
                      toggleLightboxOpened(!lightboxOpened);
                    }}
                  >
                    <img
                      src={item?.sources?.gridGallerySrc}
                      alt={item?.caption}
                      loading="lazy"
                    />
                  </button>
                </>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </ReactModal>
      <Suspense fallback={<>Loading..</>}>
        <ImageBox
          media={media}
          visible={lightboxOpened}
          currentMedia={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={toggleLightboxOpened}
        />
      </Suspense>
    </>
  );
};

export default ScrollGallery;
