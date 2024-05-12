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
import { GithubIcon } from 'lucide-react';
import { getRooms } from '@/data-access/rooms';
import Tooltip from '@/components/tooltip';



function RoomCard({ room }: { room: Room }) {
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
      <CardContent>
        {room.githubRepo && <Link href={room.githubRepo} className='flex items-center gap-2' target='_blank' rel='noopener noreferrer'><GithubIcon />Github Project</Link>}
      </CardContent>
      <CardFooter>
        <Button asChild><Link href={`/rooms/${room.id}`}>Join Room</Link></Button>
      </CardFooter>
    </Card>

  )
}

export default async function Home() {
  const rooms =await getRooms()

  return (
    <main className="min-h-screen  p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className=" text-4xl">Find study rooms</h1>
        <Button asChild><Link href="/create-room">Create Room</Link></Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
      {rooms.map((room)=>{
        return <RoomCard key={room.id}room={room}/>
      })}
      </div>
    </main>
  );
}