"use client"

import { useState } from "react"
import DatePicker from "react-datepicker"

import { cn } from "@/lib/utils"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"

import "react-datepicker/dist/react-datepicker.css"

export default function DateInput({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [useCalendar, setUseCalendar] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  const steps = [
    {
      error: "Please enter a date with slashes: DD/MM/YYYY",
      validate: () => {
        const [day, month, year] = input.replace(/:.*$/, "").split("/")
        if (!day || !month || !year) return true
        if (day.length !== 2 || month.length !== 2 || year.length !== 4) return true
        return false
      },
    },
    {
      error: "It's seems that we need the time to.. (DD/MM/YYYY:HH:MM)",
      validate: () => {
        const [date, ..._time] = input.split(":")
        const time = _time.join(":")
        if (!date || !time) return true
        if (date.split("/").length !== 3 || time.split(":").length > 2) return true
        return false
      },
    },
    {
      error: "Arg, we need seconds too! 😅 (DD/MM/YYYY:HH:MM:SS)",
      validate: () => {
        const [date, ..._time] = input.split(":")
        const time = _time.join(":")
        const [day, month, year] = date.split("/")
        const [hours, minutes, seconds] = time.split(":")
        if (!day || !month || !year || !hours || !minutes || !seconds) return true
        if (
          day.length !== 2 ||
          month.length !== 2 ||
          year.length !== 4 ||
          hours.length !== 2 ||
          minutes.length !== 2 ||
          seconds.length !== 2
        )
          return true
        return false
      },
    },
  ]

  const handleSomeInvalid = () => {
    let firstError = ""
    steps.toReversed().forEach(({ error, validate }) => {
      if (validate()) {
        firstError = error
      }
    })
    setError(firstError)
  }

  //* We want to make some fun here
  const handleValidate = () => {
    const rSteps = steps.toReversed()
    for (let i = 0; i < rSteps.length; i++) {
      const { validate } = rSteps[i]
      if (validate()) {
        setUseCalendar(false)
        return handleSomeInvalid()
      } else {
        const isStartDateOlderThanOneYear = startDate && startDate < new Date(Date.now() - 31556952000)
        if (useCalendar && isStartDateOlderThanOneYear) {
          setError("Anyway this feature is not implemented yet 🙃")
          return
        }
        setUseCalendar(true)
        setError(
          'It\'s seems that you are not "le couteau le plus aiguisé du tiroir" 😅, so we will help you with a date picker'
        )
        return
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Enter your date of birth</ModalHeader>
            <ModalBody>
              <p>In order to access this feature please enter your date of birth.</p>
              {useCalendar ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    inline
                    calendarClassName="w-max"
                  />
                  <p className={cn("text-danger")}>{error}</p>
                </div>
              ) : (
                <Input
                  type="text"
                  placeholder="DD-MM-YYYY"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  errorMessage={error}
                  isInvalid={!!error}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleValidate}>
                Access
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
