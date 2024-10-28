// 'use client'
import React from 'react';
import TagsData from "@/app/tags/TagsData";
import {DataTableDemo} from "@/app/tags/DataTable";
import {Toaster} from "@/components/ui/sonner";


export async function fetchTags() {
  try {
    const response = await fetch(`http://192.168.0.102:5000/api/post/getTags`, {
      cache: "no-store"
    })
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    return  console.log('Нет подключение к серверу @Теги@')
  }
}

export default async function Page () {

  const tags = await fetchTags();

  return (
    <div>
      {/*<TagsData data={tags}/>*/}
      <DataTableDemo data={tags} />
    </div>
  );
};

