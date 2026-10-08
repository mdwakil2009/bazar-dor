import React from 'react';
import MarqueeText from 'react-marquee-text';
interface IProduct {
  id: number;
  categoryIcon: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}
const Marquee = async() => {
     const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products")
     const data = await res.json()
     const headline:IProduct[] = data 

     return (
          <div>
               <div > 
                    <MarqueeText direction='right' duration={10}>   
                  {
                    headline.map((products,)=>(
                         <span key={products.id} className=' flex items-center gap-2 px-8 border-b border-r p-2  bg-white border-gray-100'>
                         <span>{products.categoryIcon}</span>
                         <span>{products.nameBn}</span>
                         <span>
                         {products.today.toLocaleString("bn-BD")} টাকা/ {products.unit === "kg" ? "কেজি" : products.unit === "liter" ? "লিটার" : products.unit === "piece" ? "পিস" : "ডজন"}
</span>
                   

                             <span className={products.change.dir==="up"? "text-green-700": "text-red-700"}>{products.change.dir === "up" ? "▲" : "▼"}
                              {Math.abs(products.change.pct).toLocaleString("bn-BD")}% </span>
                         </span>
                    ))
                  }
                   </MarqueeText>
               </div>
          </div>
     );
};

export default Marquee;