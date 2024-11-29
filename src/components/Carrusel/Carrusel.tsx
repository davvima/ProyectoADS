import React, { useState } from "react"
import { Box, IconButton, styled } from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

const CarouselContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  position: "relative",
  overflow: "hidden",
  width: "90%",
  margin: "1rem auto",
}))

const ImageContainer = styled(Box)(({ translateX }) => ({
  width: "100%",
  display: "flex",
  gap: "2rem",
  transition: "transform 0.5s ease",
  transform:
    translateX == 100
      ? `translateX(calc(-${translateX}% - 17rem ))`
      : `translateX(-${translateX}%)`,
}))

const CarouselImage = styled(Box)(({ imgUrl }) => ({
  flex: "0 0 66.66%",
  backgroundImage: `url(${imgUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "22rem",
  maxWidth: "22rem",
  borderRadius: "2rem",
}))

const Carrusel = ({ images }) => {
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex >= images.length ? images.length : prevIndex + 1))
  }

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1))
  }

  // Calcular el desplazamiento en porcentaje
  const translateX = index >= images.length ? 100 : (100 / images.length) * index

  return (
    <Box position="relative">
      <IconButton
        onClick={handlePrev}
        sx={{ position: "absolute", left: "-1rem", top: "50%", transform: "translateY(-50%)" }}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{ position: "absolute", right: "-1rem", top: "50%", transform: "translateY(-50%)" }}
      >
        <KeyboardArrowRight />
      </IconButton>

      <CarouselContainer>
        <ImageContainer translateX={translateX}>
          {images.map((image, i) => (
            <CarouselImage key={i} imgUrl={image} />
          ))}
        </ImageContainer>
      </CarouselContainer>
    </Box>
  )
}

export default Carrusel
