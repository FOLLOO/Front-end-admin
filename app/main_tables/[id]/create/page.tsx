"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import React from "react"
import { Dictionaries } from "@/bin/fetchRequests/getDictionaries"
import { dictionaries as dec} from '../../../../config/site'

import { entityConfigs } from "@/lib/utils"
import { usePathname } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, "Название должно содержать минимум 2 символа").max(100, "Название не должно превышать 100 символов"),
  float: z.number()
    .min(0.00000000000001, "Float должен быть не меньше 0.00000000000001")
    .max(100, "Float должен быть меньше 100"),
  isStarTrack: z.boolean().default(false),
  degree_of_wear: z.string().min(1, "Пожалуйста, выберите степень износа"),
  collection: z.string().min(1, "Пожалуйста, выберите коллекцию"),
  rare: z.string().min(1, "Пожалуйста, выберите редкость"),
  type_of_object: z.string().min(1, "Пожалуйста, выберите тип предмета"),
  type_of_weapon: z.string().min(1, "Пожалуйста, выберите тип оружия"),
  tournaments: z.string().min(1, "Пожалуйста, выберите турнир"),
})

type FormData = z.infer<typeof formSchema>

export default function CreatePage() {
  
  const [dictionaries, setDictionaries] = useState({
    collections: [],
    degree_of_wear: [],
    rare: [],
    type_of_object: [],
    type_of_weapon: [],
    tournaments: [],
    professional_players: [],
    teams: [],
    type_of_materials: [],
  }); 

  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const entityType = pathname.split('/')[2]; 

  const form = useForm<FormData>({
    resolver: zodResolver((entityConfigs as any)[entityType].schema),
    defaultValues: (entityConfigs as any)[entityType].defaultValues
  });

  async function fetchData( path: string) {
     const dictionaries = new Dictionaries();
     try {
       const res = await dictionaries.getAll(path);
       return res;
     } catch (error) {
       console.error('Error fetching data:', error);
     }
   }
  

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form submitted:", data)
      // Reset form after successful submission
      form.reset()
      alert("Form submitted successfully!")
    } catch (error) {
      console.error("Submission error:", error)
      alert("Error submitting form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  React.useEffect(() => {
    fetchData('collections').then(data => setDictionaries(prev => ({ ...prev, collections: data })));
    fetchData('degree_of_wear').then(data => setDictionaries(prev => ({ ...prev, degree_of_wear: data })));
    fetchData('rarity').then(data => setDictionaries(prev => ({ ...prev, rare: data })));
    fetchData('type_of_objects').then(data => setDictionaries(prev => ({ ...prev, type_of_object: data })));
    fetchData('type_of_weapons').then(data => setDictionaries(prev => ({ ...prev, type_of_weapon: data })));
    fetchData('tournaments').then(data => setDictionaries(prev => ({ ...prev, tournaments: data })));
    fetchData('professional_players').then(data => setDictionaries(prev => ({ ...prev, professional_players: data })));
    fetchData('teams').then(data => setDictionaries(prev => ({ ...prev, teams: data })));
    fetchData('type_of_materials').then(data => setDictionaries(prev => ({ ...prev, type_of_materials: data })));
  }, []);


  return (
    <div className=" bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-10 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Создать запись «{(dec as any)[pathname.split('/')[2]]}»</h1>
            <p className="text-sm text-muted-foreground text-pretty max-w-2xl mx-auto">
              Заполните форму ниже, чтобы добавить новый предмет. Все поля, отмеченные звездочкой (*), обязательны для заполнения.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Основные характеристики</CardTitle>
              <CardDescription>
                Укажите подробную информацию о предмете, используя поля ниже.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {(entityConfigs as any)[entityType].fields.map(field =>
                    field.type === "select" ? (
                      <FormField
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        render={({ field: f }) => (
                          <FormItem>
                            <FormLabel>{field.label}</FormLabel>
                            <Select onValueChange={f.onChange} defaultValue={f.value}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder={`Выберите ${field.label.toLowerCase()}`} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {(dictionaries[field.optionsKey] || []).map(option => (
                                  <SelectItem key={option.id} value={option.name}>
                                    {option.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : field.type === "text" ? (
                      <FormField
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        render={({ field:f }) => (
                        <FormItem>
                          <FormLabel>{field.label} *</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите название" {...field} onChange={f.onChange} />
                          </FormControl>
                          <FormDescription>{field.decription}</FormDescription>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                    ): field.type === "number" ? (
                    <FormField
                    control={form.control}
                    name={field.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Float *</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} step="0.01" placeholder="Введите float" 
                          {...field} 
                          onChange={e => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Число с плавающей точкой (от 0.00000000000001 до 100)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    ) : field.type === "checkbox" ? (
                    <FormField
                    control={form.control}
                    name={field.name}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>StarTrack</FormLabel>
                          <FormDescription>Предметы StarTrack дороже и имеют специальную пометку на оружии</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                    ) : null )}
                  
                  
                  
                  
                  {/* Text Input - Single Line
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название *</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите название" {...field} />
                        </FormControl>
                        <FormDescription>Название предмета (2-100 символов)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  {/* Textarea - Multi-line Input */}
                  {/* <FormField
                    control={form.control}
                    name="float"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Float *</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} step="0.01" placeholder="Введите float" 
                          {...field} 
                          onChange={e => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Число с плавающей точкой (от 0.00000000000001 до 100)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                   {/* Boolean Checkbox - StarTrack */}
                  {/* <FormField
                    control={form.control}
                    name="isStarTrack"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>StarTrack</FormLabel>
                          <FormDescription>Предметы StarTrack дороже и имеют специальную пометку на оружии</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  /> */}

                  {/* Select Dropdown Collection*/}
                  
                 

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-6">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? "Создание..." : "Создать"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        form.reset()
                      }}
                      disabled={isSubmitting}
                    >
                      Сбросить
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
