import { getRoom } from "@/data-access/rooms";
import { GithubIcon, Tags } from "lucide-react";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge"
import { TagsList, splitTags } from "@/components/tags-list";
import { PeerPediaVideo } from "./video-player";


export default  async function RoomPage(props:{params : {roomid:string}}) {
  const roomid = props.params.roomid;
  const room = await getRoom(roomid);

  if(!room){
    return <div>Room not found</div>
  }

  return(
      <div className="grid grid-cols-4 min-h-screen">
        <div className="col-span-3 p-4 pr-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            <PeerPediaVideo room={room} />
            </div>
        </div>

        <div className="col-span-1 p-4 pl-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
            <h1 className="text-base">{room?.name}</h1>
            {room.githubRepo && <Link href={`/${room.githubRepo}`} className='flex items-center gap-2 text-sm' target='_blank' rel='noopener noreferrer'><GithubIcon />Github Project</Link>}
            <p className=" text-base text-gray-600">{room?.description}</p>
            <TagsList tags={splitTags(room.tags)} />
          </div>
        </div>
        
      </div>
  )
}