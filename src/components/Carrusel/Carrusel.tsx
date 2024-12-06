import React, { useState } from "react"
import { Box, IconButton, styled } from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { BASE_URL } from "../../constants/url"

const CarouselContainer = styled(Box)({
  display: "flex",
  position: "relative",
  overflow: "hidden",
  width: "90%",
  margin: "1rem auto",
})

const ImageContainer = styled(Box)<{ translateX: number }>(({ translateX }) => ({
  width: "100%",
  display: "flex",
  gap: "2rem",
  transition: "transform 0.5s ease",
  transform: `translateX(-${translateX}%)`,
}))

const CarouselImage = styled("img")({
  flex: "0 0 66.66%",
  height: "22rem",
  maxWidth: "22rem",
  borderRadius: "2rem",
  objectFit: "cover",
  objectPosition: "center",
})

const Carrusel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0)
  const [validImages, setValidImages] = useState(images)

  const handleError = (index: number) => {
    // Excluir la imagen rota
    setValidImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % validImages.length)
  }

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? validImages.length - 1 : prevIndex - 1))
  }

  // Calcular el desplazamiento en porcentaje
  const translateX = (100 / validImages.length) * index

  if (!images || !Array.isArray(images) || validImages.length === 0) return null

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
          {validImages.map((image, i) => (
            <CarouselImage
              key={i}
              src={`${BASE_URL}/assets/images/${image}`}
              alt={`Imagen ${i + 1}`}
              onError={() => handleError(i)} // Maneja imágenes rotas
            />
          ))}
        </ImageContainer>
      </CarouselContainer>
    </Box>
  )
}

export default Carrusel
