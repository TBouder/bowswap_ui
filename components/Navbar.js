/******************************************************************************
**	@Author:				Thomas Bouder <Tbouder>
**	@Email:					Tbouder@protonmail.com
**	@Date:					Sunday July 4th 2021
**	@Filename:				Navbar.js
******************************************************************************/

import	React, {Fragment, useRef, useState, useEffect}	from	'react';
import	{Popover, Transition}							from	'@headlessui/react';
import	useWeb3											from	'contexts/useWeb3';
import	Popup											from	'reactjs-popup';
import	ModalLogin										from	'components/ModalLogin';

function FlyoutMenu() {
	const	timeoutDuration = 100;
	const	buttonRef = useRef(null);
	const	[openState, setOpenState] = useState(false);
	let 	timeout;

	const toggleMenu = () => {
		setOpenState((openState) => !openState);
		buttonRef?.current?.click();
	};

	const onHover = (open, action) => {
		if ((!open && !openState && action === 'onMouseEnter') || (open && openState && action === 'onMouseLeave')) {
			clearTimeout(timeout);
			timeout = setTimeout(() => toggleMenu(open), timeoutDuration);
		}
	};

	const handleClick = (open) => {
		setOpenState(!open);
		clearTimeout(timeout);
	};

	const handleClickOutside = (event) => {
		if (buttonRef.current && !buttonRef.current.contains(event.target)) {
			event.stopPropagation();
		}
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
	return (
		<div onMouseLeave={() => onHover(open, 'onMouseLeave')} className={'border-green-700'}>
			<Popover className={'relative flex flex-row h-20 justify-center items-center'}>
				{({open}) => (
					<div onMouseEnter={() => onHover(open, 'onMouseEnter')}>
						<Popover.Button ref={buttonRef} onClick={() => handleClick(open)} className={'flex flex-row items-center cursor-pointer outline-none focus:outline-none'}>
							<p className={'text-white font-base text-lg'}>{'Pandaswap'}</p>
						</Popover.Button>

						<Transition
							show={open}
							as={Fragment}
							enter={'transition ease-out duration-200'}
							enterFrom={'opacity-0 translate-y-1'}
							enterTo={'opacity-100 translate-y-0'}
							leave={'transition ease-in duration-150'}
							leaveFrom={'opacity-100 translate-y-0'}
							leaveTo={'opacity-0 translate-y-1'}>
							<Popover.Panel className={'absolute z-10 w-screen max-w-sm px-4 pt-8 transform -translate-x-1/2 left-1/2 sm:px-0 '}>
								<div className={'overflow-hidden rounded-md shadow-xl ring-1 ring-black ring-opacity-5 border border-gray-200'}>
									<div className={'relative grid gap-8 bg-white p-6 max-h-96 overflow-scroll'}>
										<a href={'https://github.com/pandadefi/y-crv-metapool-swapper'} target={'_blank'} className={'flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer'} rel={'noreferrer'}>
											<svg width={'48'} height={'48'} viewBox={'0 0 48 48'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
												<rect width={'48'} height={'48'} rx={'8'} fill={'#DCFCE7'} />
												<path d={'M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z'} stroke={'#22C55E'} strokeWidth={'2'} />
												<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z'} stroke={'#4ADE80'} strokeWidth={'2'} />
												<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z'} stroke={'#BBF7D0'} strokeWidth={'2'} />
											</svg>
											<div className={'ml-4'}>
												<p className={'text-sm font-medium text-gray-900'}>
													{'SmartContract'}
												</p>
												<p className={'text-sm text-gray-500'}>
													{'Check the Vyper code on Github'}
												</p>
											</div>
										</a>
									</div>
									<div className={'p-4 bg-gray-50'}>
										<a
											href={'##'}
											className={'flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'}
										>
											<span className={'flex items-center'}>
												<span className={'text-sm font-medium text-gray-900'}>
													{'Documentation'}
												</span>
											</span>
											<span className={'block text-sm text-gray-500'}>
												{'Get more insight on the vault and their features'}
											</span>
										</a>
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</div>
				)}
			</Popover>
		</div>
	);
}

function	Navbar() {
	const	{active, address, ens, deactivate, onDesactivate} = useWeb3();
	const	[ModalLoginOpen, set_ModalLoginOpen] = useState(false);

	function	renderWalletButton() {
		if (!active) {
			return (
				<button onClick={() => set_ModalLoginOpen(true)} className={'ml-8 inline-flex px-4 py-2 items-center leading-4 rounded-md text-sm cursor-pointer font-medium whitespace-nowrap text-white border border-solid border-white hover:bg-white hover:text-emerald-800 transition-colors'}>
					{'Connect wallet'}
				</button>
			);
		}
		return (
			<Popup
				position={'right center'}
				on={['hover', 'focus']}
				arrow={false}
				trigger={
					<p onClick={() => {deactivate(); onDesactivate();}} suppressHydrationWarning className={'ml-8 inline-flex px-4 py-2 items-center leading-4 rounded-md text-sm cursor-pointer font-medium whitespace-nowrap text-white border border-solid border-white hover:bg-white hover:text-emerald-800 transition-colors'}>
						{ens || `${address.slice(0, 4)}...${address.slice(-4)}`}
					</p>
				}>
				<div onClick={() => {deactivate(); onDesactivate();}} className={'bg-white border-gray-200 text-gray-800 px-2 py-1 rounded-md ml-2 opacity-80'}>
					<p className={'text-xs'}>{'Disconnect'}</p>
				</div>
			</Popup>
		);
	}

	return (
		<nav className={'w-full h-16 p-6 border-b border-gray-100 justify-center flex flex-row fixed top-0 z-20'} style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
			<div className={'max-w-screen-lg items-center justify-between flex flex-row w-full'}>
				<div className={'flex flex-row items-center space-x-10'}>
					<div className={'text-4xl'}>
						{'🐼'}
					</div>
					<FlyoutMenu />
				</div>
				<div>
					{renderWalletButton()}
				</div>
			</div>
			<ModalLogin open={ModalLoginOpen} set_open={set_ModalLoginOpen} />
		</nav>
	);
}

export default Navbar;
