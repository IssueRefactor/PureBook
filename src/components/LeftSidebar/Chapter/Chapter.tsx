import type { Menu } from "@models/application"
import { navigate } from "@utils/application/navigate";
import { createSignal } from "solid-js";
type PageProps = {
    name: Menu['name'],
    id: number,
}
const Page = ({name, id}: PageProps) => (<div class="nav-link page"><a href={navigate.to(`blogs/${id}`)}>{name}</a></div>) 

type SectionProps = {
    name: Menu['name'],
    active?: boolean,
    id: number
}
const Section = ({name, active, id}: SectionProps) => {
 return <li class="nav-link"><a href={navigate.to(`blogs/${id}`)} >{name}</a></li>;
}
export type ChapterProps = Menu

export default (props: ChapterProps) => {

    return (('subMenus' in props) ? ( 
        <div class="nav-group">
        <h2>{props.name}</h2>
        <ul>
            {
                props.subMenus.map((subMenu) => (<Section name={subMenu.name} id={subMenu.id}/>))
            }
        </ul>
    </div>) : <Page name={props.name} id={props.id}/>)
}