import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import type { IBook } from "@/types/Book_interface"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useCreateBorrowBookMutation } from "@/feature/bookApi/bookApi"
import { toast } from "react-toastify"

type ModalProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  borrowDetails: IBook;
};

const BorrowBookForm = ({ open, onOpenChange, borrowDetails }: ModalProps) => {
  const [createBorrowBook]=useCreateBorrowBookMutation()
  const [dateOpen, setDateOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  const schema = z.object({
    title: z.string(),
    dueDate: z.date(),
    copies: z
      .number()
      .min(1, "You must borrow at least 1 copy")
      .max(borrowDetails.copies, `We only have ${borrowDetails.copies} copies available`)
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: borrowDetails.title,
      dueDate: undefined,
      copies: 1,
    }
  });

  const onSubmit = async(data: any) => {
    console.log("✅ Borrow Data:", data);
    const payload = {
      book: borrowDetails._id,
      quantity: data.copies,   
      dueDate: data.dueDate.toISOString() 
    }
    try {
      await createBorrowBook(payload)
      toast.success('borrow book successful')
    } catch (error) {
      console.log(error)
    }

  };

 
  React.useEffect(() => {
    if (date) {
      form.setValue("dueDate", date);
    }
  }, [date, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                    
                      type="number"
                      placeholder="Number of copies"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={() => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Popover open={dateOpen} onOpenChange={setDateOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-48 justify-between font-normal">
                          {date ? date.toLocaleDateString() : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          onSelect={(selectedDate) => {
                            setDate(selectedDate)
                            setDateOpen(false)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookForm;
