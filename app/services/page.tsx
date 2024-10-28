// 'use client'
import React from 'react';

import {getServices} from "@/bin/fetchRequests/services";
import ServicesData from "@/app/services/ServicesData";

export  default async function Page() {

  const services = await getServices()

  const page = 'Service'
  return (
    <ServicesData data={services} />
  );
};

