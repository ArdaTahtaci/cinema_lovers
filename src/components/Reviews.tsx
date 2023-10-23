import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { IReview } from '../api/interfaces'
import { getReviews } from '../api/reviewApi'
import ImageContainer from './ImageContainer'
import Typography from '../styles/Typography'
import { parseDate } from '../utils/parse'
import { Container } from 'react-bootstrap'
import { useMyContext } from '../context/DarkModeContext'
import { ByRoleOptions } from '@testing-library/react'

interface ReviewProps {
    id: string,
    type: string,
    mode: boolean
}

export default function Reviews(props: ReviewProps) {

    const [reviews, setReviews] = useState<IReview[]>()
    const [CarouselItems, setCarouselItems] = useState<ReactNode[]>()
    const carouselRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

    const { mode } = useMyContext()

    useEffect(() => {
        fetchReviews(props.id, props.type)
    }, [])

    const fetchReviews = async (id: string, type: string) => {
        const reviewRes = await getReviews(id, type)
        setReviews(reviewRes)
    }

    useEffect(() => {

        const carArr = reviews?.map((review, index) => {
            const itemRef = React.createRef<HTMLDivElement>();
            carouselRefs.current[index] = itemRef;
            let display = "none"
            if (index === 0) display = "flex"
            else display = "none"
            return (
                <div className='review-container mx-auto' ref={itemRef} key={index} style={{ display: display }}>
                    <div onClick={() => handleClickBackward(index)} className='change-item-btn my-auto'>{"<"}</div>
                    <Container className='mx-4' style={{ border: "1px solid #aaa", borderRadius: "10px", width: "90%" }}>
                        <div className='review_header d-flex'>
                            {(review.author_details.avatar_path !== null) ? (<ImageContainer className='avatar-img' width='60px' height='60px' path={review.author_details.avatar_path} />) : (<div style={{ fontSize: "37px", color: !mode ? "white" : "black" }}>
                                <i className="fa-solid fa-user"></i>
                            </div>)}
                            <div className='ms-3'>
                                <Typography className='my-auto' color={!mode ? "white" : "black"} fontSize={"16px"} variant='subtitle1'>{review.author_details.name}</Typography>
                                <Typography className='my-auto' fontSize={"16px"} variant='faded' color={!mode ? "faded1" : "faded2"}>{"@" + review.author_details.username}</Typography>
                            </div>
                        </div>
                        <div className='ms-3'>
                            <Typography variant='faded' color={!mode ? "faded1" : "faded2"} fontSize="14px">{parseDate(review.created_at.substring(0, 10))}</Typography>
                        </div>
                        <Container className='mt-3'>
                            <p style={{ maxHeight: "10ch", color: !mode ? "white" : "black" }}>{review.content}</p>
                        </Container>
                    </Container>

                    <div onClick={() => handleClickForward(index)} className='change-item-btn my-auto'>{">"}</div>
                </div>
            )
        })
        setCarouselItems(carArr)
    }, [reviews, mode])

    const handleClickForward = (index: number) => {
        animateCarouselItem(index, true)
    }
    const handleClickBackward = (index: number) => {
        animateCarouselItem(index, false)
    }

    const animateCarouselItem = (index: number, direction: boolean) => {
        const firstItemRef = carouselRefs.current[index].current;

        let nextIndex

        if (direction) nextIndex = index + 1
        else nextIndex = index - 1

        if (index === carouselRefs.current.length - 1 && direction) nextIndex = 0
        else if (index === 0 && !direction) nextIndex = carouselRefs.current.length - 1

        const secondItemRef = carouselRefs.current[nextIndex].current

        let sign1, sign2
        if (direction) {
            sign1 = "+"
            sign2 = "-"
        }
        else {
            sign1 = "-"
            sign2 = "+"
        }

        if (firstItemRef) {
            const animation = firstItemRef.animate(
                {
                    opacity: [0.7, 0],
                    transform: ["translateX(0)", "translateX(" + sign1 + "100%)"]
                },
                {
                    duration: 500,
                    fill: "forwards",
                }
            );
            animation.play();
            setTimeout(() => {
                firstItemRef!.style.display = "none"
            }, 500);
        }

        if (secondItemRef) {
            const animation = secondItemRef.animate(
                {
                    opacity: [0, 1],
                    transform: ["translateX(" + sign2 + "100%)", "translateX(0%)"]
                },
                {
                    duration: 500,
                    fill: "backwards",
                }
            );
            animation.play();
            setTimeout(() => {
                secondItemRef!.style.display = "flex"
            }, 200);
        }
    };


    return (
        <div className='reviews-carousel-container'>
            <Typography className='my-3 ms-3' color={!mode ? "white" : "black"} variant='subtitle1'>Reviews</Typography>
            <div className='d-flex'>
                {(CarouselItems && CarouselItems.length > 0) ? CarouselItems.map((item, index) => (
                    <div key={index}>
                        {item}
                    </div>
                )) : (
                    <div><Typography color={!mode ? "white" : "black"} className=' mx-2' variant='text'>No review</Typography></div>
                )}
            </div>
        </div>

    )
}
