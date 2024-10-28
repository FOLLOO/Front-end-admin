import React from "react";

export type Tags = {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string,
}

export type Services = {
  name: string,
  price: number,
  image_url: string,
}

export type Service_functions = {
  name: string,
  price: string,
  days: number,
  description: string,
  // image: File, //this is for updates not now
  checked: boolean,
}

export type Service_create = {
  name: string,
  price: number, // Prob string
  cover: File,
  functions: Service_functions[],
}


const data = [{
  "name": "Блог",
  "price": "24000",
  "days": 5,
  "description": "Блог помогает приобретать аудиторию ",
  "image": "cover.jpg",
  "checked": false
}, {
  "name": "Портфолио просто с фото",
  "price": "9200",
  "days": 3,
  "description": "Страница или блог, которая отображает Ваши работы",
  "image": "super.png",
  "checked": false
}]
