import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import useSWR, { mutate } from 'swr'
import FormContainer from '@/container/FormContainer'
import { useState, useRef } from 'react'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {
  const popoverRef = useRef<HTMLButtonElement | null>(null)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [valueEdit, setShowValueEdit] = useState<{
    id: number
    title: string
    url: string
  }>({
    id: 0,
    title: '',
    url: '',
  })
  const { data: dataLinks, isLoading } = useSWR(`/api/links`, fetcher)

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/links/delete/${id}`, {
        method: 'DELETE',
      })
      mutate(`/api/links`)
    } catch (error) {
    } finally {
      popoverRef.current?.click()
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Form Create Link</CardTitle>
            <CardDescription>Submit your link here</CardDescription>
          </CardHeader>
          <CardContent>
            <FormContainer />
          </CardContent>
        </Card>
        {isLoading && <p>Loading ...</p>}
        {dataLinks?.data?.map((link) => (
          <Card id={link.id}>
            <CardContent className="flex justify-between">
              <a href={link.url} target="_blank">
                {link.title}
              </a>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setShowEdit(true)
                    setShowValueEdit({
                      id: link.id,
                      title: link.title,
                      url: link.url,
                    })
                  }}
                >
                  Edit
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <p>Are you sure for delete this data ?</p>
                    <Button
                      size={'sm'}
                      onClick={() => {
                        handleDelete(link.id)
                      }}
                    >
                      Yes
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Drawer open={showEdit} onOpenChange={setShowEdit}>
        <DrawerContent>
          <div className="container mx-auto p-4">
            <FormContainer
              id={valueEdit.id}
              values={{
                title: valueEdit.title,
                url: valueEdit.url,
              }}
              onFinished={() => {
                setShowEdit(false)
                mutate(`/api/links`)
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
