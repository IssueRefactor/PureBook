import type { Menu } from "@models/application"
import { useBoolean } from "ahooks"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import ReactSvgWrapper from "@components/ReactSvgWrapper/ReactSvgWrapper";
import { navigate } from "@utils/application/navigate";
type PageProps = {
    name: Menu['name'],
    id: number,
}
const Page = ({name, id}: PageProps) => (<div className="font-normal"><a href={navigate.to(`blogs/${id}`)}>{name}</a></div>) 

type SectionProps = {
    name: Menu['name'],
    active?: boolean,
    id: number
}
const Section = ({name, active, id}: SectionProps) => {
 return <li className="font-light border-black border-l-2 leading-2 pl-3"><a href={navigate.to(`blogs/${id}`)}>{name}</a></li>;
}
export type ChapterProps = Menu

export default (props: ChapterProps) => {

    const [isExpand, {toggle: toggleExpand}] = useBoolean(false);
    return (('subMenus' in props) ? ( <div>
        <div onClick={toggleExpand} className="flex justify-between">
            <span className="font-bold">{props.name}</span>
            {/* TODO: use css to control direction */}
            <ReactSvgWrapper iconDefinition={!isExpand ? faChevronUp :faChevronDown} height={14} width={14}/>
        </div>
        {!isExpand && <ul className="ml-1">
            {
                props.subMenus.map((subMenu) => (<Section name={subMenu.name} key={subMenu.name} id={subMenu.id}/>))
            }
        </ul>}
    </div>) : <Page name={props.name} id={props.id}/>)
}