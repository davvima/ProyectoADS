import React from "react"
import { Badge } from "@mui/material"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import dayjs, { Dayjs } from "dayjs"
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers"
import { CalendarNotification } from "./CalendarNotification"

interface Notification {
  notificacionId: string
  fechaEnvio: string
  estado: string
  titulo: string
}

interface CalendarProps {
  notifications: Notification[]
}

const Calendar: React.FC<CalendarProps> = ({ notifications }) => {
  const highlightedDates = notifications
    .filter((notification) => {
      const currentDate = dayjs()
      const date = dayjs(notification.fechaEnvio)
      return date.month() === currentDate.month() && date.year() === currentDate.year()
    })
    .map((notification) => dayjs(notification.fechaEnvio).date())

  const formattedDay = dayjs().month()

  function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
    const { day, outsideCurrentMonth, ...other } = props
    const isHighlighted = highlightedDates.includes(day.date()) && day.month() === formattedDay

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={
          isHighlighted ? (
            <CalendarNotification
              text={
                notifications.find((ele) => dayjs(ele.fechaEnvio).date() === day.date())?.titulo
              }
            />
          ) : null
        }
        sx={{
          aspectRatio: "1 / 1",
          width: "calc(100% / 7)",
          "& .MuiButtonBase-root": {
            width: "100%",
            height: "100%",
            justifyContent: "end",
            alignItems: "start",
            background: "none",
            outline: "none",
            border: "none!important",
          },
          "& .MuiButtonBase-root:hover": {
            background: "none",
            outline: "none",
          },
          "& .Mui-selected": {
            backgroundColor: "transparent !important",
            border: "none",
          },
          "& .MuiPickersDay-root:hover": {
            backgroundColor: "transparent",
          },
          "& .MuiBadge-badge": {
            transform: "none",
            top: "unset",
            bottom: "0",
            left: "0",
            width: "100%",
            padding: "0",
            height: "50%",
          },
          "& .css-1swpjv4-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)": {
            border: "none",
          },
        }}
      >
        <PickersDay {...other} day={day} outsideCurrentMonth={outsideCurrentMonth} />
      </Badge>
    )
  }

  return (
    <DateCalendar
      views={["day"]}
      slots={{ day: (props) => <ServerDay {...props} highlightedDays={[]} /> }}
      sx={{
        height: "100%",
        overflow: "visible",
        "& .MuiPickersSlideTransition-root": {
          overflowX: "visible",
          height: "100%",
        },
      }}
    />
  )
}

export default Calendar
