"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
import { editRoomAction } from "./actions"
import { useParams, useRouter } from "next/navigation"
import { Room } from "@/db/schema"

const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(500),
    githubRepo: z.string().min(0).max(100),
    tags: z.string().min(1).max(200),
})

export function EditRoomForm({ room }: { room: Room }) {

    const router = useRouter()
    const params = useParams()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: room.name,
          description: room.description ?? "",
          githubRepo: room.githubRepo ?? "",
          tags: room.tags,
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        await editRoomAction({id:params.roomid as string,...values})
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="PeerPedia works like magic" />
              </FormControl>
              <FormDescription>This is your public room name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Im working on a side project, come join me"
                />
              </FormControl>
              <FormDescription>
                Please describe what you are be coding on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/peerpedia/project-a"
                />
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="typescript, nextjs, tailwind" />
              </FormControl>
              <FormDescription>
                List your programming languages, frameworks, libraries so people
                can find your content. Make sure they are comma seperated
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}