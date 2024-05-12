import { Badge } from "./ui/badge";

export function splitTags(tags:string):string[]{
    return tags.split(',').map(t=>t.trim())
}

export function TagsList({tags}: {tags:string[]}){
    return (
        <div className="flex flex-wrap gap-2">{tags && tags.map(t=><Badge className="w-fit" key={t}>{t}</Badge>)}</div>
    )
}