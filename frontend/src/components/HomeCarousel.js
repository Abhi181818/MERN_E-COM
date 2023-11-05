import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
const handleDragStart = (e) => e.preventDefault();
function HomeCarousel() {
    const items = [
        <img alt="sample_img" className='cursor-pointer' style={{ height: "600px", paddingLeft: "12px" }} src="https://dynaimage.cdn.cnn.com/cnn/digital-images/org/e9ea52b0-5a10-4371-848e-54043c3721a3.jpg" onDragStart={handleDragStart} role="presentation" />,
        <img alt="sample_img" className='cursor-pointer' style={{ height: "600px", paddingLeft: "12px" }} src="https://slidechef.net/wp-content/uploads/2023/09/Iphone-15-Presentation-Template.jpg" onDragStart={handleDragStart} role="presentation" />,
        <img alt="sample_img" className='cursor-pointer' style={{ height: "600px", paddingLeft: "12px" }} src="https://www.91-cdn.com/pricebaba-blogimages/wp-content/uploads/2023/09/Pixel-8-banner.jpg" onDragStart={handleDragStart} role="presentation" />,
    ];

    return (
        <div className="m-12 rounded-full">
            <AliceCarousel
                mouseTracking="true"
                items={items}
                autoPlay="true"
                keyboardNavigation="true"
                infinite="true"
                autoWidth="true"
                disableButtonsControls="true"
                animationDuration={1000}
            />
        </div>
    )
}

export default HomeCarousel
