import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface propType {
  currentMedia: number;
  visible: boolean;
  media: any[];
  mediaCaptions?: string[];
  setCurrentIndex: (arg0: number) => void;
  onClose: (arg0: boolean) => void;
}

export default function ImageBox(props: propType) {
  const { media, visible, currentMedia, setCurrentIndex, onClose } = props;
  return (
    <div className="image-box-container">
      <PhotoSlider
        images={media.map((item) => ({
          src: item.sources.gridGallerySrc,
          key: item,
        }))}
        visible={visible}
        onClose={() => onClose(false)}
        index={currentMedia}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
}
