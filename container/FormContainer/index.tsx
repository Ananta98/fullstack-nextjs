import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useFormAction, { type formType } from '@/hooks/useFormAction'
import { useState } from 'react'

export default function FormContainer({
  id,
  values,
  onFinished,
}: {
  id?: number
  values?: formType
  onFinished?: (success: boolean) => void
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const { form } = useFormAction({ values })

  async function onSubmit(values: formType) {
    setLoading(true)
    try {
      const type = id ? 'patch' : 'post'
      const mapping = {
        post: {
          method: 'POST',
          url: '/api/links/create',
        },
        patch: {
          method: 'PATCH',
          url: `api/links/edit/${id}`,
        },
      }
      const response = await fetch(mapping[type].url, {
        method: mapping[type].method,
        body: JSON.stringify(values),
      })
      onFinished?.(true)
    } catch (error) {
    } finally {
      onFinished?.(true)
      if (!id) form.reset()
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="url ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
