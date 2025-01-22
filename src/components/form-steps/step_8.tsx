"use client"
import { CardData } from "@/components/types/form"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function Step8({ show, data}: {
  show:boolean, 
  data:Array<CardData>}) {
    const [visibleItems, setVisibleItems] = useState<Array<CardData>>([]);
    console.log("datas", data)
    const hasRunRef = useRef(false); // Create a ref to track execution

    useEffect(() => {
        if (hasRunRef.current) return; // Prevent running again if already executed
        hasRunRef.current = true; // Mark as executed

        const displayItemsSequentially = async () => {
            for (let i = 0; i < data.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 300)); // 1 second delay
                setVisibleItems(prev => [...prev, data[i]]);
            }
        };

        displayItemsSequentially();
    }, [data]);

  return (
    <div className={`w-full h-full transition-all duration-1000 ${show ? 'block' : 'hidden'} overflow-y-auto flex flex-col gap-2 items-center`}>
      {visibleItems.map((item) => 
        (
          <Link key={item.cardKey} href={item.cardSignUrl} className="flex flex-row justify-stretch gap-x-5 items-center h-24 w-4/5 card-shade" target="_blank">
            <img src={item.cardIconUrl} alt={"Card Image"} className="h-full"/>
            <h2 className="text-2xl">{item.cardName}</h2>
          </Link>
        )
      )}

    </div>
  )
}

