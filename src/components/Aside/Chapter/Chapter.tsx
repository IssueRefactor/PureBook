import type { Menu } from "@models/application"
import { useBoolean } from "ahooks"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { isEmpty } from "lodash";
import ReactSvgWrapper from "@components/ReactSvgWrapper/ReactSvgWrapper";
type PageProps = {
    name: Menu['name']
}
const Page = ({name}: PageProps) => (<div className="font-normal">{name}</div>) 

type SectionProps = {
    name: Menu['name'],
    active?: boolean
}
const Section = ({name, active}: SectionProps) => {
 return <li className="font-light border-black border-l-2 leading-2 pl-3">{name}</li>;
}
export type ChapterProps = Menu

export default ({name, subMenus}: ChapterProps) => {

    const [isExpand, {toggle: toggleExpand}] = useBoolean(false);
    return (!isEmpty(subMenus) ?( <div>
        <div onClick={toggleExpand} className="flex justify-between">
            <span className="font-bold">{name}</span>
            {/* TODO: use css to control direction */}
            <ReactSvgWrapper iconDefinition={!isExpand ? faChevronUp :faChevronDown} height={14} width={14}/>
        </div>
        {!isExpand && <ul className="ml-1">
            {
                subMenus?.map((subMenu) => (<Section name={subMenu.name} key={subMenu.name}/>))
            }
        </ul>}
    </div>) : <Page name={name}/>)
}