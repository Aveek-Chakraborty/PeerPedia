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
import { Room } from '@/db/schema';
import Tooltip from '@/components/tooltip';
import { TagsList} from '@/components/tags-list';
import { splitTags } from '@/lib/utils';
import { GithubIcon } from 'lucide-react';


export function RoomCard({ room }: { room: Room }) {
  let roomdesc = room.description?.length! > 100 ? room.description?.substring(0, 100) + '...' : room.description
  let l = room.description?.length! > 100 ? 1 : 0
  return (
    <Card>
      <CardHeader>
        <CardTitle className='mb-2'>{room.name}</CardTitle>
        {l==1 ?(<Tooltip text={room.description!}>
          <CardDescription>{roomdesc}</CardDescription>
        </Tooltip>) : (<CardDescription>{roomdesc}</CardDescription>)}
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
      <TagsList tags={splitTags(room.tags)} />
        {room.githubRepo && <Link href={room.githubRepo} className='flex items-center gap-2' target='_blank' rel='noopener noreferrer'><GithubIcon/>Github Project</Link>}
      </CardContent>
      <CardFooter>
        <Button asChild><Link href={`/rooms/${room.id}`}>Join Room</Link></Button>
      </CardFooter>
    </Card>

  )
}