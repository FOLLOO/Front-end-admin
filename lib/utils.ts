import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const entityConfigs = {
  containers: {
    schema: z.object({
      name: z.string().min(2, "Название должно содержать минимум 2 символа").max(100, "Название не должно превышать 100 символов"),
      collection: z.string().min(1, "Пожалуйста, выберите коллекцию"),
      tournaments: z.string().min(1, "Пожалуйста, выберите турнир"),
    }),
    fields: [
      { name: "name", label: "Название кейса", type: "text", decription: "Название предмета (2-100 символов)" },
      { name: "collection", label: "Коллекция", type: "select", optionsKey: "collections" },
      { name: "tournaments", label: "Название турнир", type: "select", optionsKey: "tournaments" },
    ],
    defaultValues: {
      name: "",
      collection: "",
      tournaments: "",
    },
  },
  agency: {
    schema: z.object({
      name: z.string().min(2, "Название должно содержать минимум 2 символа").max(100, "Название не должно превышать 100 символов"),
      collection: z.string().min(1, "Пожалуйста, выберите коллекцию"),
    }),
    fields: [
      { name: "name", label: "Название кейса", type: "text", decription: "Название предмета (2-100 символов)" },
      { name: "collection", label: "Коллекция", type: "select", optionsKey: "collections" },
    ],
    defaultValues: {
      name: "",
      collection: "",
    },
  },
  weapons: {
    schema: z.object({
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
    }),
    fields: [
      { name: "name", label: "Название оружия", type: "text", decription: "Название предмета (2-100 символов)" },
      { name: "float", label: "Дата", type: "number" },
      { name: "isStarTrack", label: "Дата", type: "checkbox" },
      { name: "collection", label: "Коллекция", type: "select", optionsKey: "collections" },
      { name: "degree_of_wear", label: "Степень износа", type: "select", optionsKey: "degree_of_wear" },
      { name: "rare", label: "Редкость", type: "select", optionsKey: "rare" },
      { name: "type_of_object", label: "Тип объекта", type: "select", optionsKey: "type_of_object" },
      { name: "type_of_weapon", label: "Тип оружия", type: "select", optionsKey: "type_of_weapon" },
      { name: "tournaments", label: "Название турнир", type: "select", optionsKey: "tournaments" },
    ],
    defaultValues: {
      name: "",
      float: 0,
      isStarTrack: false,
      degree_of_wear: "",
      collection: "",
      rare: "",
      type_of_object: "",
      type_of_weapon: "",
      tournaments: "",
    },
  },
  stickers: {
   schema: z.object({
     name: z.string().min(2, "Название должно содержать минимум 2 символа").max(100, "Название не должно превышать 100 символов"),
     professional_player: z.string().min(1, "Пожалуйста, выберите профессионального игрока"),
     tournaments: z.string().min(1, "Пожалуйста, выберите турнир"),
     rare: z.string().min(1, "Пожалуйста, выберите редкость"),
     collection: z.string().min(1, "Пожалуйста, выберите коллекцию"),
     team: z.string().min(1, "Пожалуйста, выберите команду"),
     type_of_material: z.string().min(1, "Пожалуйста, выберите тип мфтериала"),
     type_of_object: z.string().min(1, "Пожалуйста, выберите тип предмета"),
   }),
   fields: [
     { name: "name", label: "Название стикера", type: "text", decription: "Название предмета (2-100 символов)" },
     { name: "professional_players", label: "Профессиональный игрок", type: "select", optionsKey: "professional_players" },
     { name: "tournaments", label: "Название турнира", type: "select", optionsKey: "tournaments" },
     { name: "rare", label: "Редкость", type: "select", optionsKey: "rare" },
     { name: "collection", label: "Коллекция", type: "select", optionsKey: "collections" },
     { name: "teams", label: "Команда", type: "select", optionsKey: "teams" },
     { name: "type_of_materials", label: "Тип материала", type: "select", optionsKey: "type_of_materials" },
     { name: "type_of_object", label: "Тип прдемета", type: "select", optionsKey: "type_of_object" },
   ],
   defaultValues: {
      name: "",
      professional_palyer: "",
      tournaments: "",
      rare: "",
      collection: "",
      team: "",
      type_of_material: "",
      type_of_object: "",
   },
  },
  // ...другие сущности
};