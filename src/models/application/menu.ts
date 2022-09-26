export type SubMenu = {
    name: string,
    id: number,
}

export type Menu = {
    name: string,

} & ({
    subMenus: SubMenu[]
} | {
    id: number
})