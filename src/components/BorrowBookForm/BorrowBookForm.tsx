import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"

type ModalProps = {
    open: boolean;
    onOpenChange: (value: boolean) => void;
  };

const BorrowBookForm = ({open,onOpenChange}:ModalProps) => {
    type BorrowBook={
        book:'string';
        quantity:number;
        dueDate:Date
    }
    const form = useForm()
    const onSubmit =(data:any)=>{
        console.log(data)
    }
    return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogHeader>
            Borrow Book
        </DialogHeader>
        <DialogContent>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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

