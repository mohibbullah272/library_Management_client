import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Save } from "lucide-react";
import { useCreateBookMutation } from "@/feature/bookApi/bookApi";
import { toast } from "react-toastify";

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

const AddBookForm = () => {
    const [createBook]=useCreateBookMutation()
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
    available: true,
  });

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., API call
    try {
        await createBook(formData).unwrap()
  
        toast.success('Book created successfully!')
        
      setFormData({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        description: "",
        copies: 0,
        available: true,
      })
   
    } catch (err) {
        console.error("Error creating book:", err);
    }
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setFormData((prev) => ({ ...prev, copies: value }));
  };

  const handleAvailableChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, available: checked }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="shadow-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Add a New Book
          </CardTitle>
          <CardDescription>Fill out the form to add a new book to the library.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter book title"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium">
                Author
              </Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter author name"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre" className="text-sm font-medium">
                Genre
              </Label>
              <Select
                name="genre"
                value={formData.genre}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, genre: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SCIENCE">Science</SelectItem>
                  <SelectItem value="FICTION">Fiction</SelectItem>
                  <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                  <SelectItem value="MYSTERY">Mystery</SelectItem>
                  <SelectItem value="FANTASY">Fantasy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="isbn" className="text-sm font-medium">
                ISBN
              </Label>
              <Input
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
                placeholder="Enter ISBN"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter book description"
                rows={4}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="copies" className="text-sm font-medium">
                Copies
              </Label>
              <Input
                id="copies"
                name="copies"
                type="number"
                min="1"
                value={formData.copies}
                onChange={handleCopiesChange}
                required
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="available" className="text-sm font-medium">
                Available
              </Label>
              <Switch
                id="available"
                checked={formData.available}
                onCheckedChange={handleAvailableChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 flex items-center gap-2">
              <Save className="h-5 w-5" />
              Save Book
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddBookForm;