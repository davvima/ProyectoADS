import { Card, Typography } from "@mui/material"
import { PieChart } from "@mui/x-charts"
import React from "react"

const CardGrafica = ({ titulo, data }) => {
  return (
    <Card
      sx={{
        boxShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "0.875rem",
        padding: "1.5rem",
        flex: "1",
        minWidth: "300px",
      }}
    >
      <Typography variant="h2">{titulo}</Typography>
      <PieChart
        colors={["#8280FFB2", "#FEC53DB2", "#FF8743B2"]}
        series={[
          {
            data: data,
            highlightScope: { fade: "global", highlight: "item" },
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 405,
            cx: 150,
            cy: 150,
          },
        ]}
        height={300}
      />
    </Card>
  )
}

export default CardGrafica
