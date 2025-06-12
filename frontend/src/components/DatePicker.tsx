import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Popover } from "./ui/popover";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { format} from 'date-fns'
import { es } from "date-fns/locale";


function DatePicker () {
    const [date, setDate] = useState<Date>()
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                >
                    <CalendarIcon />
                    { date ? 
                        format(date, "PPP", { locale: es}) 
                        : 
                        <span>Seleccionar fecha</span> 
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar 
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker;