"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Room } from '@/db/schema';
import Tooltip from '@/components/tooltip';
import { TagsList } from '@/components/tags-list';
import { splitTags } from '@/lib/utils';
import { GithubIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { deleteRoomAction } from './actions';



export function UserRoomCard({ room }: { room: Room }) {
  let roomdesc = room.description?.length! > 100 ? room.description?.substring(0, 100) + '...' : room.description
  let l = room.description?.length! > 100 ? 1 : 0
  return (
    <Card>
      <CardHeader className='relative'>
        <Button className="absolute top-3 right-3" size={"icon"}><Link href={`/edit-room/${room.id}`}><PencilIcon /></Link></Button>
        <CardTitle className='mb-2'>{room.name}</CardTitle>
        {l == 1 ? (<Tooltip text={room.description!}>
          <CardDescription>{roomdesc}</CardDescription>
        </Tooltip>) : (<CardDescription>{roomdesc}</CardDescription>)}
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <TagsList tags={splitTags(room.tags)} />
        {room.githubRepo && <Link href={room.githubRepo} className='flex items-center gap-2' target='_blank' rel='noopener noreferrer'><GithubIcon />Github Project</Link>}
      </CardContent>
      <CardFooter className='flex gap-3'>
        <Button asChild><Link href={`/rooms/${room.id}`}>Join Room</Link></Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild><Button variant={"destructive"}><TrashIcon className='mr-2 w-4 h-4' />Delete Room</Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your room
                and remove any associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => {deleteRoomAction(room.id) }}>Yes, Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </CardFooter>
    </Card>

  )
}