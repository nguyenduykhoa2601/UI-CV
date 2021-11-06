import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { DEFAULT_FILTER } from '../utils/function/defaultFilter';
import { useDispatch } from 'react-redux';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { setImageAction } from '../../redux/actions/ImageHandlingAction';

SwiperCore.use([EffectCoverflow, Pagination]);

const Filterimage = ({ imgSrc }) => {
    const dispatch = useDispatch()
    const [defaultFilter, setDefaultFilter] = useState(DEFAULT_FILTER)
    const [selected, setSelected] = useState(0)

    const savePreview = async(filter)=>{
        var canvas = await document.createElement('canvas');
        var ctx = await canvas.getContext('2d');
        var img = await document.getElementById(`imageSetPreview-${selected}`);
        canvas.width = img.width
        canvas.height = img.height
        ctx.filter = filter.filter
        ctx.drawImage(img, 0, 0, canvas.width,canvas.height);
        var data = canvas.toDataURL("image/png")
        dispatch(setImageAction(data))
    }
    return (
        <div className="filer__image">
            <img
                className="filer__image-selected"
                style={DEFAULT_FILTER[selected] }
                src={imgSrc}
                alt="" 
                id={`imageSetPreview-${selected}`}
               />
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                loop={true}
                centeredSlides={true}
                slidesPerView={"3"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 500,
                    modifier: 1,
                    slideShadows: true
                }}
                className="filter__swiper"
            >
                {
                    defaultFilter.map((filter, index) => {
                        return (
                            <SwiperSlide key={index} onClick={() => setSelected(index)}>
                                <img style={filter} src={imgSrc} alt="" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <button  onClick= {()=>savePreview(DEFAULT_FILTER[selected])}> Save </button>
        </div>
    )
}

export default Filterimage;
