import React from 'react'
import { EditRoomForm } from './edit-room-form'
import { getRoom } from '@/data-access/rooms';
import { useParams } from 'next/navigation';
import { unstable_noStore } from 'next/cache';

const CreateRoomPage = async ( {params,
}: {
  params: { roomid: string };
}) => {
  unstable_noStore();
  const room = await getRoom(params.roomid);

  if (!room) {
    return <div>Room not found</div>;
  }
  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Edit Room</h1>

      <EditRoomForm room={room}/>
    </div>
  )
}

export default CreateRoomPage 
