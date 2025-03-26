'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function ComboboxDemo({
  width = '200px',
  placeholder = 'Select an option...',
  options = [],
  onSelect = () => {},
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState({})

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={isOpen}
          className={'flex items-center justify-between px-4 py-2 ' + className}
          style={{ width }}
        >
          <span className='truncate'>
            {selectedOption.id
              ? options.find((option) => option.id === selectedOption.id)?.name
              : placeholder}
          </span>
          <ChevronsUpDown className='h-4 w-4 opacity-50 ml-2' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0' style={{ width }}>
        <Command>
          <CommandInput placeholder='Search...' className='h-9' />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={String(option.id)}
                  onSelect={(currentValue) => {
                    const newSelectedOption =
                      currentValue === String(selectedOption.id) ? {} : option
                    setSelectedOption(newSelectedOption)
                    setIsOpen(false)
                    onSelect(newSelectedOption)
                  }}
                >
                  {option.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      selectedOption.id === option.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
