'use client'
import React, {useEffect} from 'react';

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

import {Service_create, Service_functions, Services, Tags} from "@/types/types";
import {Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {Input} from "@/components/ui/input";
import {TbReload} from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ArrowUpDown, ChevronDown, Edit, MoreHorizontal, Trash} from "lucide-react";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {deleteTags} from "@/bin/fetchRequests/tags";
import {Separator} from "@/components/ui/separator";
import {Switch} from "@/components/ui/switch";
import {ScrollArea} from "@/components/ui/scroll-area";
import Image from "next/image";
import {createServices} from "@/bin/fetchRequests/services";

export default function ServicesData({data}: { data: Services[] }) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [agree, setAgree] = React.useState('')
  const [add, setAdd] = React.useState(false)

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


  const columns: ColumnDef<Tags>[] = [
    {
      id: "select",
      header: ({table}) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({row}) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            className="flex items-center justify-start w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        )
      },
      cell: ({row}) => (
        <div className="px-3  text-left">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        );
      },
      cell: ({row}) => {
        const price: number = row.getValue("price");
        return <div className="text-left px-3">{price.toLocaleString('ru-RU')}</div>;
      },
    },
    {
      accessorKey: "image_url",
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Images
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        )
      },
      cell: ({row}) => <div className="">{row.getValue("image_url")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({row}) => {
        const payment = parseFloat(row.getValue('name'))
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem className="flex justify-between text-red-600"
                                onClick={() => deleteThis(row.getValue('name'), 'tag')}> Delete <Trash
                size={18}/></DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between text-primary"
                                onClick={() => deleteThis(row.getValue('name'), 'edit')}> Edit <Edit size={18}/>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]


  // const [namespace, setNamespace] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);

  const [fileURL, setFileURL] = React.useState<string>("");

  const [service, setService] = React.useState<Service_create[]>([
    {
      name: '',
      price: 0,
      functions: [],
      cover: null,
    }
  ]);

  const [arr, setArr] = React.useState<number>(1);

  const calculateTotalSum = () => {
    let sum = 0;
    service.forEach(serv => {
      sum += serv.price; // Суммируем цену самого сервиса
      serv.functions.forEach(func => {
        sum += Number(func.price); // Суммируем цены вложенных функций
      });
    });
    setPrice(sum); // Обновляем общую сумму
  };

  useEffect(() => {
    calculateTotalSum();
  }, [service])

  const handleMainChange = (field: keyof Service_create, value: string | number | File) => {
    setService(prev => {
      const updatedServices = [...prev];
      updatedServices[0] = { ...updatedServices[0], [field]: value };
      return updatedServices;
    });
  };

  const handleNestedChange = (functionIndex: number, field: keyof Service_functions, value: string | number | boolean) => {
    // if (field === 'price'){
    //   setPrice(price + Number(value))
    // }

    setService(prev => {
      const updatedServices = [...prev];
      const updatedFunctions = [...updatedServices[0].functions];

      updatedFunctions[functionIndex] = {
        ...updatedFunctions[functionIndex],
        [field]: value
      };

      updatedServices[0] = {
        ...updatedServices[0],
        functions: updatedFunctions
      };

      return updatedServices;
    });
  };

  async function POST(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleMainChange('price', price.toString())
    console.log(service[0]);

    if(service[0] === null || service[0] === undefined){
      console.log('Data is coming NULL! $Front$')
    }
    else{
      let form_data = new FormData();
      let data = service[0] as { [key: string]: any };

      for (let key in data) {
        let value = data[key];

        // Проверяем, если это файл, добавляем его напрямую
        if (key === 'cover') {
          form_data.append(key, value);
        }
        // Для остальных значений добавляем как есть
        else {
          form_data.append(JSON.stringify(key),JSON.stringify(value) );  // Преобразуем в строку для надёжности
        }
      }
      createServices(form_data);
    }
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  const fileChange = (event:  React.ChangeEvent<HTMLInputElement>) => {

    let uploadedFile = event.target.files[0]
    let WIDTH = 1250
    // const AVATAR_WIDTH = 200;
    const type = localStorage.getItem('type')

    switch (type) {
      case 'cover' :
        WIDTH = 1920
        break
      case 'avatar' :
        WIDTH = 400
        break
      default :
        WIDTH = 1250
        break
    }

    if (uploadedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
      if (!allowedExtensions.exec(uploadedFile.name)) {
        alert('Неверный формат файла. Пожалуйста, загрузите файл в формате .jpg, .jpeg, или .png')
        event.target.value = null // Сбросить значение input
        return
      }
      let reader = new FileReader()
      reader.readAsDataURL(uploadedFile)
      reader.onload = (event) => {
        let image_url = event.target.result
        let image = document.createElement('img')
        image.src = image_url
        image.onload = (e) => {
          let canvas = document.createElement('canvas')
          let ratio = WIDTH / e.target.width
          canvas.width = WIDTH
          canvas.height = e.target.height * ratio

          const context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, canvas.width, canvas.height)

          let new_image_url = context.canvas.toDataURL('image/jpeg', 90)

          let new_image = document.createElement('img')
          new_image.src = new_image_url
          setFileURL(new_image_url)
          canvas.toBlob((blob) => {
            // Создаем новый File объект из Blob
            const newFile = new File([blob], uploadedFile.name, { type: 'image/jpeg' })
            // setFile(newFile) // Сохраняем File в состоянии
            handleMainChange('cover', newFile)
            // handleMainChange('examples', newFile)
          }, 'image/jpeg', 1)
        }
      }
    }
  }
  function deleteThis(id: string, type: string) {
    switch (type) {
      case 'tag' :
        setDialogOpen(true)
        setAgree(id)
        break;
      case 'edit' :
        setEdit(!edit)
        break;
      default:
        return;
    }
  }

  function TOCHNODELETE() {
    if (agree) {
      deleteTags(agree)
      setDialogOpen(false)
    }
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Sheet onOpenChange={() => setAdd(false)} open={add}  >
        <SheetContent className="sm:max-w-xl max-w-2xl ">
          <SheetHeader className="pb-4">
            <SheetTitle>Create Service</SheetTitle>
            <SheetDescription>
              Set values. Click save when you are done.
            </SheetDescription>
          </SheetHeader>
          <form className="grid w-full items-center gap-1.5" onSubmit={(e) => POST(e)}>
            <Input type="text" placeholder="Name" key="add_input_value" required
                   onChange={(e) => handleMainChange('name', e.target.value)}
            />
            <Input type="number" placeholder="Auto price" key="input_price_global" disabled required
                   // onChange={(e) => setPrice(e.target.value)}
                   value={price}
            />
            <Input type="file" placeholder="Add the image" key="input_file" required
                   onChange={fileChange}
            />
            <div className="flex justify-center">
              <Image src={fileURL} alt={'file'} width="250" height="250" className="w-full h-64 object-cover justify-self-center "/>
            </div>

            <div className="flex flex-col gap-3">
              <Separator className="my-4"/>
              <Label className="font-bold text-xl"> Functions </Label>
              <ScrollArea className="h-64  w-full">
                {Array.from({length: arr}, (_, index) => (
                  <div className="flex flex-col gap-3" key={`functions_${index}`}>
                    <div className="flex justify-center  ">
                      <Label> {index + 1} </Label>
                    </div>
                    <Input type="text" placeholder="Name" key={`add_input_name${index}`} required
                           onChange={(e) => handleNestedChange(index, 'name', e.target.value)}
                    />
                    <Input type="number" placeholder="Price $" key={`input_price${index}`} required
                           onChange={(e) => handleNestedChange(index, 'price', e.target.value)}
                    />
                    <Input type="number" placeholder="Days" key={`input_days${index}`} required
                           onChange={(e) => handleNestedChange(index, 'days', e.target.value)}
                    />
                    <Input type="text" placeholder="Descrioption" key={`add_input_value${index}`} required
                           onChange={(e) => handleNestedChange(index, 'description', e.target.value)}
                    />
                    <div className="flex gap-3">
                      <Switch id="terms" className="rounded-3xl" key={`switch_${index}`}
                              onChange={(e) => handleNestedChange(index, 'checked', e.target.checked)}
                      />
                      <Label htmlFor="terms">Checked</Label>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <Separator className="my-4"/>
            </div>

            <SheetFooter className="flex justify-around">
              <Button type="button" variant="secondary" onClick={() => setArr(arr + 1)}>Add function</Button>
              <Button type="button" variant="outline" onClick={() => setArr(arr - 1)}>Delete function</Button>
              <Separator className="my-4" orientation="vertical"/>
              <Button variant="default" type={'submit'}>Save</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Services list <br className="hidden sm:inline"/>
      </h1>
      <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex ml-auto gap-3">
          <Button variant="default" onClick={() => setAdd(true)}>Add tags</Button>
          <Button variant="ghost" className="ml-auto flex gap-3" onClick={() => location.reload()}>
            <h1>Reload page</h1>
            <TbReload/>
          </Button>
        </div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
          {/*<DialogTrigger className="flex justify-between text-primary">Edit <Edit size={18}/></DialogTrigger>*/}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)}>
                  Back
                </Button>
              </DialogClose>
              <Button type="button" variant="destructive" onClick={() => TOCHNODELETE()}>
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={edit} onOpenChange={() => setEdit(false)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit tag</DialogTitle>
              <DialogDescription>
                Make changes to tag here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Tag title
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3"/>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setEdit(false)}>
                Back
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="rounded-md border">
          <Table>
            <TableHeader className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

