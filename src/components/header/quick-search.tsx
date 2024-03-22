"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"

import { Button, Input, Kbd, Modal, ModalContent, Spinner, useDisclosure } from "@nextui-org/react"

import { SearchResult } from "./search-result"
import useSearchQuery from "./use-search-query"
import useSearchResults from "./use-search-results"

export default function QuickSearch() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  //* Handle the ^K shortcut
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault()
        onOpen()
      }
    },
    [onOpen]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  //* Value
  const [value, setValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), 500)
    return () => clearTimeout(timeout)
  }, [value])

  //* Select all the search text on focus
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.select()
    }
  }, [isOpen])

  //* Search
  const enabled = !!debouncedValue && debouncedValue.length >= 3
  const searchQuery = useSearchQuery({
    query: debouncedValue,
    enabled,
  })

  const elements = useSearchResults({ data: searchQuery?.data, onClose })

  const handleEasterEgg = () => {
    console.log("🐰")
  }

  return (
    <>
      <Button onPress={onOpen} className="min-w-[300px] justify-between">
        <div className="flex flex-row items-center gap-2">
          <Search className="size-4" />
          <p className="text-muted-foreground text-sm">Rechercher</p>
        </div>
        <Kbd keys={["ctrl"]}>K</Kbd>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="lg">
        <ModalContent className="bg-[unset] !shadow-none">
          <div className="flex flex-col-reverse sm:flex-col">
            <Input
              placeholder="Rechercher..."
              startContent={
                !enabled || !searchQuery.isLoading ? (
                  <Search className="text-muted-foreground mr-2 size-8 opacity-50" />
                ) : (
                  <Spinner
                    className="text-muted-foreground mr-2 opacity-50"
                    classNames={{
                      wrapper: "h-6 w-6",
                    }}
                    size="md"
                  />
                )
              }
              endContent={<Kbd>ESC</Kbd>}
              size="lg"
              autoFocus
              value={value}
              onValueChange={setValue}
              classNames={{
                inputWrapper: "!shadow-[none]",
                mainWrapper: "p-2",
              }}
              ref={inputRef}
            />
            <p
              tabIndex={0}
              onClick={handleEasterEgg}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleEasterEgg()
                }
              }}
            >
              Don&apos;t know what to watch?
            </p>
            <div className="invisible-scrollbar flex max-h-[70vh] flex-col gap-2 overflow-auto p-2">
              {elements.map((element, i) => (
                <SearchResult key={element.title + "-" + i} {...element} />
              ))}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
