interface CollectionBannerSectionProps {
  title: string;
  imageSrc: string;
}

function CollectionBannerSection(props: CollectionBannerSectionProps) {
  return (
    <div className="banner-section-container">
      <picture className="bg-image">
        {/* {images.map((image: any, index: number) => {
          return (
            <source key={index} srcSet={image.srcset} type="image/webp"/>
          );
        })} */}
        {<img
          className="bg-image"
          srcSet={props.imageSrc}
          alt="1622631416 shutterstock 433825150 %281%29.jpg"
        />}
      </picture>
      <div className="intro-top-container">
        <div className="container">
          <div className="intro-top-content">
            <div className="head-col">
              <div className="base-block-head">
                <div className="head-content">
                  <h1 className="constructed-heading">
                    <div className="head-content">
                      <span className="title">{props.title}</span>
                    </div>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionBannerSection;
