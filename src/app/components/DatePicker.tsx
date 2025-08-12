"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/Popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"secondary"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DayPicker
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
