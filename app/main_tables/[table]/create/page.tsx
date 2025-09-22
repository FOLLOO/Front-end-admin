"use client"

import React, { useState } from "react"
import * as z from "zod"

import { usePathname } from "next/navigation"
import { Dictionaries } from "@/bin/fetchRequests/getDictionaries"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { entityConfigs, weaponDictionary } from "@/lib/utils"
import { dictionaries as dec } from "../../../../config/site"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const formSchema = z.object({
  name: z
    .string()
    .min(2, "Название должно содержать минимум 2 символа")
    .max(100, "Название не должно превышать 100 символов"),
  float: z
    .number()
    .min(0.00000000000001, "Float должен быть не меньше 0.00000000000001")
    .max(100, "Float должен быть меньше 100"),
  isStarTrack: z.boolean().default(false),
  degree_of_wear: z.string().min(1, "Пожалуйста, выберите степень износа"),
  collection: z.string().min(1, "Пожалуйста, выберите коллекцию"),
  rarity: z.string().min(1, "Пожалуйста, выберите редкость"),
  type_of_objects: z.string().min(1, "Пожалуйста, выберите тип предмета"),
  type_of_weapons: z.string().min(1, "Пожалуйста, выберите тип оружия"),
  tournaments: z.string().min(1, "Пожалуйста, выберите турнир"),
})

type FormData = z.infer<typeof formSchema>

export default function CreatePage() {
  const [dictionaries, setDictionaries] = useState({
    collections: [],
    degree_of_wear: [],
    rarity: [],
    type_of_objects: [],
    type_of_weapons: [],
    tournaments: [],
    professional_players: [],
    teams: [],
    type_of_materials: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  
  const pathname = usePathname()
  const entityType = pathname.split("/")[2]
  const config = (entityConfigs as any)[entityType]

  
  const form = useForm<FormData>({
    resolver: zodResolver(config.schema),
    defaultValues: config.defaultValues,
  })
  
  const floatValue = form.watch("float");
  const nameValue = form.watch("name");
  
  const neededDictionaries = config.fields
    .filter((f: { type: string; optionsKey: string }) => f.type === "select")
    .map((f: { type: string; optionsKey: string }) => f.optionsKey)

  async function fetchData(path: string) {
    const dictionaries = new Dictionaries()
    try {
      const res = await dictionaries.getAll(path)
      return res
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }


  // сама функция поиска и изменению данных
  function getDegreeOfWearByFloat(float: number) {
    let result = 0;
    if (float >= 0 && float < 0.07){
      result = dictionaries.degree_of_wear.findIndex(x => x?.name.includes("Прямо с завода"));
    }
    if (float >= 0.07 && float < 0.15){
      result = dictionaries.degree_of_wear.findIndex(x => x?.name.includes("Немного поношенное"));
    }
    if (float >= 0.15 && float < 0.38){
      result = dictionaries.degree_of_wear.findIndex(x => x?.name.includes("После полевых испытаний"));
    }
    if (float >= 0.38 && float < 0.45){
      result = dictionaries.degree_of_wear.findIndex(x => x?.name.includes("Поношенное"));
    }
    if (float >= 0.45 && float <= 1){
      result = dictionaries.degree_of_wear.findIndex(x => x?.name.includes("Закалённое в боях"));
    }
    return dictionaries.degree_of_wear[result]?.id;
  }

  function getWeaponTypeByName(name: string) {
    const pathOfName = name.split(' ')[0];
    const found = dictionaries.type_of_weapons.find(x => x?.name.includes(pathOfName));
    return found ? String(found.id) : "";
  }

  function getObjectTypeByName(name: string) {
    
    function findWeaponCategory(weaponName: string) {
      for (const [category, weapons] of Object.entries(weaponDictionary)) {
        if (weapons.some(w => w.name.includes(weaponName))) {
          return category;
        }
      }
      return null; // если не найдено
    }
    const pathOfName = name.split(' ')[0];
    const index = dictionaries.type_of_weapons.findIndex(x => x?.name.includes(pathOfName));
    let weapon = dictionaries.type_of_weapons[index].name
    let object = findWeaponCategory(weapon)

    const found = dictionaries.type_of_objects.find(x => x?.name.includes(object));
    return found ? String(found.id) : "";
  }


  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const dictionaries = new Dictionaries()
      await dictionaries.create(entityType, data)
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

  // вызов данных, по выбранной странице
  React.useEffect(() => {
    neededDictionaries.forEach((key: string) => {
      fetchData(key).then((data) =>
        setDictionaries((prev) => ({ ...prev, [key]: data }))
      )
    })
  }, [entityType])

  // меняем float по значению float
  React.useEffect(() => {
    if (floatValue !== undefined && floatValue !== null && floatValue !== 0) {
      const wear = getDegreeOfWearByFloat(floatValue);
      form.setValue("degree_of_wear", wear);
    }
  }, [floatValue, form]);

  // меняем type_of_weapon по значению name
  React.useEffect(() => {
    if (nameValue !== undefined && nameValue !== null && nameValue !== "") {
      const weapon = getWeaponTypeByName(nameValue);
      const object = getObjectTypeByName(nameValue);
    
      form.setValue("type_of_weapons", weapon);
      form.setValue("type_of_objects", object);
    }
  }, [nameValue, form]);


  return (
    <div className=" bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-10 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
              Создать запись «{(dec as any)[pathname.split("/")[2]]}»
            </h1>
            <p className="text-sm text-muted-foreground text-pretty max-w-2xl mx-auto">
              Заполните форму ниже, чтобы добавить новый предмет. Все поля,
              отмеченные звездочкой (*), обязательны для заполнения.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">
                Основные характеристики
              </CardTitle>
              <CardDescription>
                Укажите подробную информацию о предмете, используя поля ниже.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {(entityConfigs as any)[entityType].fields.map((field) =>
                    field.type === "select" ? (
                      <FormField
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        render={({ field: f }) => (
                          <FormItem>
                            <FormLabel>{field.label}</FormLabel>
                            <Select
                              disabled={
                                field.name === 'degree_of_wear' ||
                                field.name === 'type_of_weapons' && !!nameValue || 
                                field.name === 'type_of_objects' && !!nameValue
                              }
                              onValueChange={(val) => f.onChange(val)}
                              value={f.value}
                              defaultValue={f.value}
                            >
                              <FormControl>
                                <SelectTrigger className={`w-full border-2 ${f.value ? "border-green-300" : "border-red-300"}`}>
                                  <SelectValue
                                    placeholder={`Выберите ${field.label.toLowerCase()}`}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {(dictionaries[field.optionsKey] || []).map(
                                  (option) => (
                                    <SelectItem
                                      // className = {}
                                      key={option.id}
                                      value={String(option.id)}
                                    >
                                      {option.name}
                                    </SelectItem>
                                  )
                                )}
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
                        render={({ field: f }) => (
                          <FormItem>
                            <FormLabel>{field.label} *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите название"
                                {...field}
                                onChange={f.onChange}
                              />
                            </FormControl>
                            <FormDescription>
                              {field.decription}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : field.type === "number" ? (
                      <FormField
                        control={form.control}
                        name={field.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Float *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                max={1}
                                step="any"
                                placeholder="Введите float"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? ""
                                      : Number(e.target.value)
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Число с плавающей точкой (от 0.00000000000001 до
                              100)
                            </FormDescription>
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
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>StarTrack</FormLabel>
                              <FormDescription>
                                Предметы StarTrack дороже и имеют специальную
                                пометку на оружии
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    ) : null
                  )}

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
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
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
