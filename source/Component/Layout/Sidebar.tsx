import { memo, RefObject, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

import { setFont } from 'store/action/font';
import { updateSettings } from 'store/action/settings';
import { hideSidebar } from 'store/action/sidebar';
import { updateTheme } from 'store/action/theme';

import ChartIcon from 'Component/Icon/Chart';
import FontIcon from 'Component/Icon/Font';
import LeftArrowIcon from 'Component/Icon/LeftArrow';
import LifeRingIcon from 'Component/Icon/LifeRing';
import MoonIcon from 'Component/Icon/Moon';
import NewDocumentIcon from 'Component/Icon/NewDocument';
import SunIcon from 'Component/Icon/Sun';
import SquaresIcon from 'Component/Icon/Squares';
import ToggleOffIcon from 'Component/Icon/ToggleOff';
import ToggleOnIcon from 'Component/Icon/ToggleOn';

import Menu from 'Component/Menu';
import MenuButton from 'Component/MenuButton';
import MenuItem from 'Component/MenuItem';
import MenuLink from 'Component/MenuLink';
import Section from 'Component/Section';
import { showPassages } from 'store/action/passages';

const Sidebar = memo(function Sidebar(): JSX.Element {
	const {
		settings = {},
		theme = 'light',
		font = 'Copse',
		sidebar_show: sidebarShow,
	} = useStoreon('settings', 'theme', 'font', 'sidebar_show');
	const containerRef: RefObject<HTMLDivElement> = useRef();

	function changeSetting(key: string, value: any) {
		updateSettings({ ...settings, [key]: value });
	}

	function toggleSetting(key: string) {
		return () => changeSetting(key, !settings[key]);
	}

	function toggleMode() {
		updateTheme(theme === 'dark' ? 'light' : 'dark');
	}

	function changeFont(font: string) {
		setFont(font);
	}

	return (
		<Container
			hide={!sidebarShow}
			onClick={(e) => {
				if (e.target !== containerRef.current) return;
				hideSidebar();
			}}
			ref={containerRef}
		>
			<Content>
				<Section>
					<CloseButton>
						<MenuButton onClick={hideSidebar}>
							<LeftArrowIcon /> COPYWORK
						</MenuButton>
					</CloseButton>
				</Section>

				<Section>
					<Menu>
						<MenuLink>
							<Link
								to="/playground"
								onClick={hideSidebar}
								tabIndex={sidebarShow ? null : -1}
							>
								<NewDocumentIcon /> New document
							</Link>
						</MenuLink>
						<MenuLink>
							<Link
								to="#"
								onClick={() => {
									hideSidebar();
									showPassages();
								}}
								tabIndex={sidebarShow ? null : -1}
							>
								<SquaresIcon /> Practice library
							</Link>
						</MenuLink>
						<MenuLink disabled>
							<Link
								to="/statistics"
								onClick={hideSidebar}
								tabIndex={sidebarShow ? null : -1}
							>
								<ChartIcon /> Your stats (coming soon)
							</Link>
						</MenuLink>
					</Menu>
				</Section>

				<Section grow>
					<MenuHeader>Configure</MenuHeader>
					<Menu grow>
						<MenuItem>
							<MenuButton
								onClick={toggleSetting('spellcheck')}
								tabIndex={sidebarShow ? null : -1}
							>
								{settings.spellcheck ? <ToggleOnIcon /> : <ToggleOffIcon />}
								Spellcheck ({onOff(settings.spellcheck)})
							</MenuButton>
						</MenuItem>
						<MenuItem>
							<MenuButton
								onClick={toggleSetting('autocorrect')}
								tabIndex={sidebarShow ? null : -1}
							>
								{settings.autocorrect ? <ToggleOnIcon /> : <ToggleOffIcon />}
								Autocorrect ({onOff(settings.autocorrect)})
							</MenuButton>
						</MenuItem>
						<MenuItem>
							<MenuButton
								onClick={toggleSetting('ignore_punctuation')}
								tabIndex={sidebarShow ? null : -1}
							>
								{settings.ignore_punctuation ? <ToggleOnIcon /> : <ToggleOffIcon />}
								Ignore punctuation ({onOff(settings.ignore_punctuation)})
							</MenuButton>
						</MenuItem>
						<MenuItem>
							<MenuButton onClick={toggleMode} tabIndex={sidebarShow ? null : -1}>
								{theme === 'dark' ? <MoonIcon /> : <SunIcon />}
								Theme mode ({lightDark(theme)})
							</MenuButton>
						</MenuItem>
						<MenuDropdown>
							<FontIcon /> Change font ({font})
							<select
								value={font || 'Copse'}
								onChange={(e) => changeFont(e.target.value)}
								tabIndex={sidebarShow ? null : -1}
								data-dontstealfocus
							>
								<option value="Comfortaa" style={{ fontFamily: 'Comfortaa' }}>
									Comfortaa
								</option>
								<option value="Copse" style={{ fontFamily: 'Copse' }}>
									Copse
								</option>
								<option value="Open Sans" style={{ fontFamily: 'Open Sans' }}>
									Open Sans
								</option>
							</select>
						</MenuDropdown>
						<Spacer />
						<MenuLink>
							<MenuButton
								onClick={() =>
									(window.location.href =
										'mailto:steven@miscreants.com?subject=Copywork%20request')
								}
							>
								<LifeRingIcon /> Request a feature
							</MenuButton>
						</MenuLink>
					</Menu>
					<Copyright>
						Copywork is made by{' '}
						<a href="https://miscreants.co" tabIndex={sidebarShow ? null : -1}>
							Miscreants
						</a>
						.
					</Copyright>
				</Section>
			</Content>
		</Container>
	);
});

export default Sidebar;

function onOff(value: boolean) {
	return value ? 'On' : 'Off';
}

function lightDark(value: string) {
	return value === 'dark' ? 'Dark' : 'Light';
}

const Container = styled.div.attrs((props: GenericObject) => ({ hide: props.hide }))`
	bottom: 0;
	left: ${(props) => (props.hide ? '-333px' : '0')};
	opacity: ${(props) => (props.hide ? '0' : '1')};
	pointer-events: ${(props) => (props.hide ? 'none' : 'all')};
	position: fixed;
	right: ${(props) => (props.hide ? '333px' : '0')};
	top: 0;
	user-select: none;
	z-index: 1000;
`;

const Content = styled.div`
	background: ${(props) => props.theme.sidebarBackgroundColor};
	color: ${(props) => props.theme.foregroundColor};
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	overflow-y: auto;
	padding: 16px;
	width: 333px;
	height: 100%;
`;

const CloseButton = styled.div`
	align-items: center;
	cursor: pointer;
	display: flex;
	letter-spacing: 1px;

	& button {
		height: 100%;
	}

	& svg {
		height: 16px;
		margin-right: 8px;
	}
`;

const MenuHeader = styled.div`
	border-bottom: 1px ${(props) => props.theme.foregroundColor} solid;
	font-size: 0.9rem;
	margin-bottom: 16px;
	padding-bottom: 2px;
`;

const MenuDropdown = styled(MenuItem)`
	position: relative;
	z-index: 100;

	& select {
		appearance: none;
		background: transparent;
		border: 0;
		cursor: pointer;
		color: transparent;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 99;
	}

	& option {
		background: ${(props) => props.theme.backgroundColor};
		color: ${(props) => props.theme.foregroundColor};
		font-size: 1.25rem;
	}
`;

const Spacer = styled.div`
	flex-grow: 1;
	min-height: 16px;
`;

const Copyright = styled.div`
	font-size: 0.75rem;
	margin-top: 8px;
	opacity: 0.66;

	& a {
		color: ${(props) => props.theme.sidebarCreatorColor};
		text-decoration: none;
	}
`;