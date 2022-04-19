import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { get_slider_advertisments } from '../../Apis/TV_Advertisements/index';


const images = [
    {
        id: 1,
        src:
            "https://images.unsplash.com/photo-1627745193246-1fa1c9404b21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        alt: "The world"
    },
    {
        id: 2,
        src:
            "https://images.unsplash.com/photo-1631116617822-e100bd7e6e06?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        alt: "Train"
    },
    {
        id: 3,
        src:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
        alt: "Laptop"
    }
];

const TV_Slider_Component = () => {
    const [advertisement, setAdvertisement] = useState([]);

    const fetchAdvertisements = async () => {
        const getrequest = await get_slider_advertisments();
        setAdvertisement(getrequest);
    }

    useEffect(() => {
        fetchAdvertisements();
    }, [])

    return (
        <div className="TV_Slider_Component">
            <Slider dots={true} autoplay={true}>
                {advertisement.length != 0 ?
                    advertisement.map((item) => (
                        <div key={item.id}>
                            <img src={item.Image} style={{ height: '500px', width: '100%' }} />
                        </div>
                    ))
                    :
                    <>
                        <img src='default-image.png' style={{ height: '500px', width: '100%' }}></img>
                    </>
                }
            </Slider>
        </div>
    );
}


export default TV_Slider_Component;
