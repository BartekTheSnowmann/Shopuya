"use client";
import React from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Link from "next/link";
import { Badge } from "@radix-ui/themes";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  products: any;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, products } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide relative" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <Link href={`/product/${products[index].id}`}>
                <img
                  className="embla__slide__img"
                  src={products[index].imageUrl}
                  alt="Your alt text"
                />
              </Link>
              <Badge className="absolute top-2 mx-2">
                {products[index].name.split(" ")[0]}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
