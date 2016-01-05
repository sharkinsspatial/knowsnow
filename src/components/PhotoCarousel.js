import React from 'react'
import Carousel from 'react-bootstrap/lib/Carousel'
import CarouselItem from 'react-bootstrap/lib/CarouselItem'

class PhotoCarousel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
            var activeIndex
            activeIndex = this.props.images.findIndex((image, index) => {
                return image.id === this.props.activeImage
            })
            activeIndex = activeIndex === -1 ? 0 : activeIndex
            let carousel = <div/>
            if (this.props.images.length > 0) {
                let carouselItems = this.props.images.map(image => {
                    let src = `https://s3.amazonaws.com/knowsnowphotos/` +
                        `${image.reportId}/${image.mediumName}`

                    return (
                        <CarouselItem key={image.id}>
                        <img src={src}/>
                        </CarouselItem>
                    )
                })
                carousel = <Carousel interval={5000000}
                            activeIndex={activeIndex}
                            onSelect={this.onCarouselSelect}
                            >{carouselItems}</Carousel>
            }
            return carousel
    }

    onCarouselSelect = (index) => {
        let id = this.props.images[index].id
        this.props.setActiveReportImage(id)
    }
}

export default PhotoCarousel
