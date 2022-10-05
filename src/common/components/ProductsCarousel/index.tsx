import { isEmpty } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "../Carousel";
import PriceTag from "../PriceTag";
import ProductSubHeading from "../ProductSubHeading";

function ProductsCarousel(props: { data: any }) {
  //TODO
  const { data } = props;

  return (
    <Carousel
      settings={{ slidesToShow: 3.9 }}
      className="product-carousel-container"
      childrenCount={data?.length}
    >
      {data?.map((productData: any, index: number) => {
        return <ProductCard key={index} productData={productData} />;
      })}
    </Carousel>
  );
}
const ProductCard = (props: { productData: any }) => {
  //TODO
  const {
    productData: {
      name,
      slug,
      featured_media,
      rating,
      review_count,
      starting_price,
      strike_through_price,
      product_location,
      primary_destination,
    },
  } = props;

  return (
    <Link href={slug}>
      <a target="_blank">
        <div className="product-card-container">
          <div className="product-image-wrapper">
            <div className="product-image">
              <Image
                src={featured_media?.media_urls?.thumbnail}
                placeholder="blur"
                blurDataURL={featured_media?.media_urls?.placeholder}
                layout="fill"
                alt="product-img"
              />
              <div className="product-location">
                <img src="/icons/location-icon.svg" alt="location" />{" "}
                {product_location || primary_destination}
              </div>
            </div>
          </div>
          <div className="product-content">
            <div className="product-title">{name}</div>
            <div className="product-stats">
              <ProductSubHeading rating={rating} reviews={review_count} />
            </div>
            <div className="product-pricing">
              <PriceTag
                currency="INR"
                current={starting_price}
                striked={strike_through_price}
                size="lg"
              />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductsCarousel;
