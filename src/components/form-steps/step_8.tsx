"use client"
import { CardData } from "@/components/types/form"
import { Label } from "@radix-ui/react-label";
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
      <div className={`w-full h-96 transition-all duration-1000 ${show ? 'block' : 'hidden'} overflow-auto flex flex-col gap-y-7 p-4 desktop:gap-y-5 items-center ${data.length ? "" : "justify-center"}`}>
        {data.length ? visibleItems.map((item) => 
          (
            <Link key={item.cardKey} href={item.cardSignUrl} className="p-3 rounded-md flex flex-col desktop:flex-row justify-stretch desktop:gap-x-5 items-center h-fit desktop:h-28 w-full desktop:w-4/5 card-shade hover:bg-[#00DFEF20]" target="_blank">
              <img loading="lazy" src={item.cardIconUrl} alt={"Card Image"} className="h-20 desktop:h-full"/>
              <div className="flex flex-col gap-2">
                <h2 className="text-sm desktop:text-xl text-center">{item.cardName}</h2>
                <p className="text-xs desktop:text-sm text-center">{item.rewardContent}</p>
              </div>
            </Link>
          )
        ) : 
        <Label className="desktop:text-4xl text-xl text-center">We Didn&apos;t Find a Match This Time — Try Adjusting Your Inputs</Label>}
      </div>
  )
}

