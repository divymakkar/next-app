import Image from "next/image";
import React from "react";
import Carousel from "../Carousel";

const WhatsInTheBoxCard = (props: { data: any }) => {
  const { data } = props;
  return (
    <div className="whats-in-the-box-card-wrapper">
      <div className="box-card-wrap">
        <div className="box-image-wrap">
          <Image
            className="box-image"
            src="https://res.cloudinary.com/thrillophilia/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_auto,h_600,q_auto,w_auto/v1/filestore/7wbe9w3fgs7oii692zy7fzq0gbzx_CAS1.png"
            layout="fill"
            alt="camping"
          />
        </div>
        <div className="box-title-wrap">
          <img className="box-title-icon" src="/icons/tent.svg" alt="tent" />{" "}
          <span className="box-title">Camping</span>
        </div>
      </div>
      <div className="box-desc">
        Check-in into the camps in the arms of mother nature
      </div>
    </div>
  );
};

function WhatsInTheBoxSection(props: { data: any }) {
  const { data } = props;
  return (
    <Carousel
      className="whats-in-the-box-container"
      settings={{ centerPadding: "60px", slidesToShow: 3.5 }}
      childrenCount={6}
    >
      <WhatsInTheBoxCard data={data} />
      <WhatsInTheBoxCard data={data} />
      <WhatsInTheBoxCard data={data} />
      <WhatsInTheBoxCard data={data} />
      <WhatsInTheBoxCard data={data} />
      <WhatsInTheBoxCard data={data} />
    </Carousel>
  );
}

export default WhatsInTheBoxSection;
