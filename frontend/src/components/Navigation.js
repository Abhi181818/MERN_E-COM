import { Fragment, useContext, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigation } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import Product from './Product/Product'
// import { Route,BrowserRouter,Routes } from 'react-router-dom'
import ProductCard from './Product/ProductCard'
import { UserContext } from '../UserContext'
import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from "react-hot-toast"

const navigation = {
    categories: [
        {
            id: 'phone',
            name: 'Phone',
            featured: [
                {
                    name: 'New Arrivals',
                    href: "/top_phones",
                    imageSrc: 'https://www.gbalaji.co/wp-content/uploads/2023/08/oneplus-nord-ce-3-5g-gray-shimmer-gbalaji-online-shop.png',
                    imageAlt: 'iPhone  15',
                },
                {
                    name: 'Best Phones',
                    href: "/best_phone",
                    imageSrc: 'https://cdn1.smartprix.com/rx-izLSMVlI0-w420-h420/samsung-galaxy-s23-u.webp',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'top_phone',
                    name: 'Top Phones',
                    items: [
                        { name: 'iPhone 15 Pro Max', href: "/iphone 15 pro max" },
                        { name: 'Samsung Galaxy S21', href: "/" },
                        { name: 'Google Pixel 6 Pro', href: "/" },
                        { name: 'OnePlus 9 Pro', href: "/" },
                        { name: 'Galaxy Z Fold 4 5G', href: "/" },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Powerbanks', href: "/" },
                        { name: 'Chargers', href: "/" },
                        { name: 'Covers', href: "/" },
                        { name: 'Screen Protectors', href: "/" },
                        { name: 'Holders', href: "/" },
                        { name: 'Headsets', href: "/" },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Apple', href: "/apple" },
                        { name: 'Samsung', href: "/samsung" },
                        { name: 'OnePlus', href: "/oneplus" },
                        { name: 'Motorola', href: "/motorola" },
                        { name: 'Huawei', href: "/huawei" },
                    ],
                },
            ],
        },
        {
            id: 'laptop',
            name: 'Laptops',
            featured: [
                {
                    name: 'New Arrivals',
                    href: "/",
                    imageSrc: 'https://education.uficon.com/wp-content/uploads/2022/06/MacBook_Pro_13-inch_Space_Gray_PDP_Image_Position-2__TH-scaled.jpg',
                    imageAlt: 'New Laptops',
                },
                {
                    name: 'Best Deals',
                    href: "/best_deals",
                    imageSrc: 'https://cdn.vox-cdn.com/thumbor/wvonUxYpRksjxAGRoIGn9DUVs2g=/0x0:2080x1387/1400x1050/filters:focal(1040x694:1041x695)/cdn.vox-cdn.com/uploads/chorus_asset/file/18941187/DSCF2473.0.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'top_laptops',
                    name: 'Top Laptops',
                    items: [
                        { name: 'Dell XPS 13-9350', href: "/" },
                        { name: 'Apple MacBook Air(M2)', href: "/" },
                        { name: 'Asus Zenbook Pro Duo 14', href: "/" },
                        { name: 'MacBook Pro 16', href: "/" },
                        { name: 'Asus Zenbook S 13', href: "/" },
                        { name: 'Microsoft Surface Laptop', href: "/" },
                        { name: 'Browse All', href: "/" },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Charger', href: "/" },
                        { name: 'SSD/HDD', href: "/" },
                        { name: 'RAM', href: "/" },
                        { name: 'CPU', href: "/" },
                        { name: 'Mouse', href: "/" },
                        { name: 'Keyboard', href: "/" },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Apple', href: "/" },
                        { name: 'HP', href: "/" },
                        { name: 'Dell', href: "/" },
                        { name: 'Asus', href: "/" },
                        { name: 'Samsung', href: "/" }
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', href: "/" },
        { name: 'Stores', href: "/" },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
    const { loginState, setLoginState } = useContext(UserContext)

        
    const logOut = async () => {
        // <Toaster position='top-center' />
        await axios.get("http://localhost:4000/api/v1/logout")
            .then((response) => {
                toast("Logged Out")
                // alert("Logged out")
                localStorage.removeItem('token')
                setTimeout(() => navigate("/"), 800)
                setLoginState(false)

            }).catch((error) => {
                console.error('Error:', error);
            });

    }

    const navigate = useNavigate()
    // const { loginState } = useContext(UserContext)
    const [Data, setData] = useState([])
    const getData = async () => {
        const response = await fetch('http://localhost:4000/api/v1/products')
        const data = await response.json()
        setData(data.prods)
        // console.log(state)
    }
    useEffect(() => {
        getData()
    }, [])
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-slate-200" style={{ zIndex: "999", position: "relative" }}>
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-slate-200 pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div"
                                    className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List
                                            className="-mb-px flex space-x-8 px-4">
                                            {navigation.categories.map((category) => (
                                                <Tab
                                                    key={category.name}

                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'text-indigo-600' : ' text-gray-900',
                                                            'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map((category) => (
                                            <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                                                <div className="grid grid-cols-2 gap-x-4">
                                                    {category.featured.map((item) => (
                                                        <div key={item.name} className="group relative text-sm">
                                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-slate-800 group-hover:opacity-75">
                                                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                                            </div>
                                                            <Link to={item.name} className="mt-6 block font-medium text-gray-900">
                                                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                <Link to="/top_phones">{item.name}</Link>
                                                            </Link>
                                                            <p aria-hidden="true" className="mt-1">
                                                                Buy now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                            {section.name}
                                                        </p>
                                                        <ul
                                                            //   role="list"
                                                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                            className="mt-6 flex flex-col space-y-6"
                                                        >
                                                            {/* {section.items.map((item) => (
                                                                <li key={item.name} className="flow-root">
                                                                    <Link to={`${item.href}`} className="-m-2 block p-2 text-gray-500">
                                                                        {item.name}
                                                                    </Link>
                                                                </li>
                                                            ))} */}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <Link to={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                {page.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <Link to="/" className="-m-2 block p-2 font-medium text-gray-900">
                                            {!loginState ? "Sign In" : "Log Out"}
                                        </Link>
                                    </div>
                                    <div className="flow-root">
                                        <Link to="/" className="-m-2 block p-2 font-medium text-gray-900">
                                            Create account
                                        </Link>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6">
                                    <Link to="/" className="-m-2 flex items-center p-2">
                                        <img
                                            src="https://tailwindui.com/img/flags/flag-canada.svg"
                                            alt=""
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-base font-medium text-gray-900">IN</span>
                                        <span className="sr-only">, change currency</span>
                                    </Link>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative bg-slate-800">
                <p className="flex h-10 items-center justify-center bg-slate-700 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                    Get exta 10% discount*
                </p>

                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-slate-800 p-2 text-white lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link to="/">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt=""
                                    />
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            style={{ outline: "none", border: "none", background: "none" }}
                                                            className={classNames(
                                                                open
                                                                    ? ' text-indigo-600'
                                                                    : 'border-transparent text-white hover:text-indigo-500',
                                                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute inset-x-0 top-full text-sm text-white">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div className="absolute inset-0 top-1/2 bg-slate-800 shadow" aria-hidden="true" />

                                                            <div className="relative bg-slate-800">
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                            {category.featured.map((item) => (
                                                                                <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-slate-800 group-hover:opacity-75">
                                                                                        <img
                                                                                            src={item.imageSrc}
                                                                                            alt={item.imageAlt}
                                                                                            className="object-cover object-center"
                                                                                        />
                                                                                    </div>
                                                                                    <Link to={item.href} className="mt-6 block font-medium text-purple-500">
                                                                                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                        {item.name}
                                                                                    </Link>
                                                                                    <p aria-hidden="true" className="mt-1">
                                                                                        Buy now
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p id={`${section.name}-heading`} className="font-medium text-indigo-300">
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        // role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <Link to={`/name/${item.name}`} className="hover:text-indigo-300">
                                                                                                    {item.name}
                                                                                                </Link>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            to={page.href}
                                            className="flex items-center text-sm font-medium text-white hover:text-indigo-600"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {!loginState && <Link to="/sign_in" className="text-sm font-medium text-white hover:text-indigo-600">
                                        Sign In
                                        {/* <ToastContainer /> */}
                                    </Link>}
                                    {loginState && <Link to="/" onClick={logOut} className="text-sm font-medium text-white hover:text-indigo-600">
                                        {/* <input type='button' onClick={logOut}>Log Out</input> */}
                                        {/* {setTimeout(() => navigate("/"), 2500)} */} Log Out
                                        {/* <ToastContainer position='top-center' closeButton="false" />  */}

                                    </Link>

                                    }
                                    <span className="h-6 w-px bg-slate-800" aria-hidden="true" />
                                    <Link to="/register" className="text-sm font-medium text-white hover:text-indigo-600">
                                        Create account
                                    </Link>
                                </div>

                                <div className="hidden lg:ml-8 lg:flex">
                                    <Link to="/create_account" className="flex items-center text-white hover:text-indigo-600">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg"
                                            alt=""
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-sm font-medium">IN</span>
                                        <span className="sr-only">, change currency</span>
                                    </Link>
                                </div>

                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <Link to="/" className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </Link>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link to="/cart" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
