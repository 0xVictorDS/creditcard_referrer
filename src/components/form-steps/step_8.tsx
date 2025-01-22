import { CardData } from "@/components/types/form"
import Link from "next/link"

export function Step8({ show, data}: {
  show:boolean, 
  data:Array<CardData>}) {
    console.log("datas", data)
  return (
    <div className={`w-full h-full transition-all duration-1000 ${show ? 'block' : 'hidden'} overflow-y-auto flex flex-col gap-2`}>
      {data.map((item) => 
        (
          <Link key={item.cardKey} href={item.cardSignUrl} className="flex flex-row justify-stretch gap-x-5 items-center h-1/5" >
            <img src={item.cardIconUrl} alt={"Card Image"} className="h-full"/>
            <h2 className="text-2xl">{item.cardName}</h2>
          </Link>
        )
      )}

    </div>
  )
}

