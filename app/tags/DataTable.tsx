"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {ArrowUpDown, ChevronDown, Copy, Edit, MoreHorizontal, Trash} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {Tags} from "@/types/types";
import {deleteTags} from "@/bin/fetchRequests/tags";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {TbReload} from "react-icons/tb";
import {Label} from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription, SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {toast} from "sonner";


export function DataTableDemo({data}: { data: Tags[] }) {

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
      accessorKey: "id",
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            className="flex items-center justify-center w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        )
      },
      cell: ({row}) => (
        <div className="font-bold text-center">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>

            Name
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        )
      },
      cell: ({row}) => <div className="">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-right">Дата создания</div>,
      cell: ({row}) => {
        const amount = new Date(row.getValue("createdAt"))
        // Format the amount as a dollar amount
        return <div className="text-right font-medium">{amount.toLocaleDateString('ru-RU')}</div>
      },
    },
    {
      accessorKey: "updatedAt",
      header: () => <div className="text-right">Дата обновления</div>,
      cell: ({row}) => {
        const amount = new Date(row.getValue("updatedAt"))
        return <div className="text-right font-medium">{amount.toLocaleDateString('ru-RU')}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({row}) => {
        const payment = parseFloat(row.getValue('id'))
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
              <DropdownMenuItem
                className="flex justify-between text-foreground gap-3"
                onClick={() => navigator.clipboard.writeText(payment)}
              >
                Copy payment ID <Copy size={18}/>
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem className="flex justify-between text-red-600"
                                onClick={() => deleteThis(row.getValue('id'), 'tag')}> Delete <Trash
                size={18}/></DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between text-primary"
                                onClick={() => deleteThis(row.getValue('id'), 'edit')}> Edit <Edit size={18}/>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const [tags, setTags] = React.useState(1);
  const [namespace, setNamespace] = React.useState<string[]>([]);
  const toggleClick = () => {
    if (tags === 10) {
      toast("Number of posts exceeded!", {
        description: new Date().toLocaleDateString("en-US"),
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })
    } else setTags(tags + 1);
  }

  async function POST(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAdd(false)
    for (let i = 0; i < namespace.length; i++) {
      try {
        const res = await fetch(`http://192.168.0.100:5000/api/post/createTag`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({tagName: namespace[i]}),
        })
        toast(`${namespace[i]} created!`, {
          description: new Date().toLocaleDateString("en-US"),
          action: {
            label: "OK",
            onClick: () => console.log("OK"),
          },
        })
      } catch (e) {
        console.log('Something went wrong');
      }
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
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Services list <br className="hidden sm:inline"/>
      </h1>

      <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex ml-auto gap-3">
          <Button variant="default" onClick={() => setAdd(true)}>Add tags</Button>
          <Sheet onOpenChange={() => setAdd(false)} open={add}>
            <SheetContent>
              <SheetHeader className="pb-4">
                <SheetTitle>Create tags</SheetTitle>
                <SheetDescription>
                  Set title. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <form className="grid w-full max-w-sm items-center gap-1.5" onSubmit={(e) => POST(e)}>
                {Array.from({length: tags}, (_, index) => (
                  <Input type="text" placeholder="Name" key={index} required
                         onChange={(e) => namespace[index] = e.target.value}
                  />
                ))}
                <SheetFooter>
                  <Button variant="outline" type={'button'} onClick={toggleClick}>Add</Button>
                  <Button variant="outline" type={'button'} onClick={() => setTags(tags - 1)}>Delete</Button>
                  <Button variant="default" type={'submit'}>Save</Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
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
                        column.toggleVisibility(!!value)
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
                Make changes to tag here. Click save when you're done.
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
            <TableHeader>
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
  )
}
