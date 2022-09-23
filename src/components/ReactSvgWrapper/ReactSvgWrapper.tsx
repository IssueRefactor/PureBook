import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export type ReactSvgWrapperProps = {
    iconDefinition: IconDefinition,
    width?: number,
    height?: number
}

export default ({iconDefinition, width, height}: ReactSvgWrapperProps) => {
    return (
        <svg width={width ?? iconDefinition.icon[0]} height={height ?? iconDefinition.icon[1]} viewBox={`0 0 ${iconDefinition.icon[0]} ${iconDefinition.icon[1]}`}>
            <path fill="currentColor" d={iconDefinition.icon[4].toString()}></path>
        </svg>
    )
}