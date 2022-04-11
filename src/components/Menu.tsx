import React, {FC} from "react";
import '../scss/menu.scss'
import { v4 as uuidv4 } from 'uuid';
import {WeatherLocation} from "./weather";

interface MenuProps {
    menuJSON:any;
    updateApp:(state:string)=>void
}

export const Menu :FC<MenuProps> = ({menuJSON,  updateApp}) =>  {
    function renderMenu(menuItems:MenuItem[]) :JSX.Element[] {
        return menuItems.map(it=>{
            const functionality= it.functionality;
            return <div className="subNav" key={uuidv4()}>
                <button
                    onClick={()=>functionality !==null ?  eval(functionality)(it.tabName): null}
                    className="subNavBtn">
                    {it.tabName} {it.children.length>0? String.fromCharCode(9662):""}
                </button>
                <div className="dropdown">
                    {renderMenu(it.children)}
                </div>
            </div>
        })
    }
     function showForecast(tabName:string) {
        updateApp(`forecast-${tabName}`)
        return
    }
     function drawGraphics(tabName:string) {
         updateApp(`graphic-${tabName}`)
        return
    }
    return <div className={"navBar-wrapper"}>
            <nav className={"navBar"}>
              {renderMenu(menuJSON)}
        </nav>
    </div>
}




interface MenuItem {
    tabName: string;
    functionality: string | null;
    children: MenuItem[];
}
export default  Menu
