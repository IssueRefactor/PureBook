import Menu from "@components/LeftSidebar/Menu";
import clsx from "clsx";
import { createEffect, createSignal } from "solid-js";
import {Portal} from "solid-js/web"
import './SidebarToggle.css'
const MenuToggle = () => {
	const [sidebarShown, setSidebarShown] = createSignal(false);
	return (
		<>
		<button
			type="button"
			aria-pressed={sidebarShown() ? 'true' : 'false'}
			id="menu-toggle"
			onClick={() => setSidebarShown(!sidebarShown())}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
			<span class="sr-only">Toggle sidebar</span>
		</button>
		<Portal>
			<div class={clsx("border-slate-200 border-r h-full sidebarToggle md:hidden", sidebarShown() ? 'showSidebar' : 'hidden')}>
				<Menu />
			</div>
		</Portal>
		</>
	);
};

export default MenuToggle;
