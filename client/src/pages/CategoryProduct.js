import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../EndPoints'

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")

    const fetchData = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        })

        const dataResponse = await response.json()
        setData(dataResponse?.data || [])
        setLoading(false)
    }

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target

        setSelectCategory((preve) => ({
            ...preve,
            [value]: checked
        }))
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory)
            .map(categoryKey => selectCategory[categoryKey] ? categoryKey : null)
            .filter(el => el)

        setFilterCategoryList(arrayOfCategory)

        // Update URL params
        const urlParams = arrayOfCategory
            .map((el, index) =>
                (arrayOfCategory.length - 1 === index) ? `category=${el}` : `category=${el}&&`
            )

        navigate("/product-category?" + urlParams.join(""))
    }, [selectCategory])

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target
        setSortBy(value)

        if (value === 'asc') {
            setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice))
        }

        if (value === 'dsc') {
            setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice))
        }
    }


    return (
        <div className="container mx-auto p-4">

            {/* Desktop layout */}
            <div className="hidden lg:grid grid-cols-[260px,1fr] gap-6">

                {/* Sidebar */}
                <div className="bg-white rounded-xl shadow-md p-5 min-h-[calc(100vh-140px)] overflow-y-auto border border-slate-200">

                    {/* Sort By */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-slate-600 border-b pb-2">Sort by</h3>

                        <form className="mt-3 text-sm flex flex-col gap-3">
                            <label className="flex items-center gap-3 cursor-pointer hover:text-slate-700 transition">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === 'asc'}
                                    onChange={handleOnChangeSortBy}
                                    value="asc"
                                    className="h-4 w-4 accent-blue-600"
                                />
                                <span>Price — Low to High</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer hover:text-slate-700 transition">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === 'dsc'}
                                    onChange={handleOnChangeSortBy}
                                    value="dsc"
                                    className="h-4 w-4 accent-blue-600"
                                />
                                <span>Price — High to Low</span>
                            </label>
                        </form>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <h3 className="text-base font-semibold text-slate-600 border-b pb-2">Categories</h3>

                        <form className="mt-3 text-sm flex flex-col gap-3">
                            {productCategory.map((cat, index) => (
                                <label
                                    key={index}
                                    className="flex items-center gap-3 cursor-pointer hover:text-slate-700 transition"
                                >
                                    <input
                                        type="checkbox"
                                        name="category"
                                        checked={selectCategory[cat.value]}
                                        value={cat.value}
                                        onChange={handleSelectCategory}
                                        className="h-4 w-4 accent-blue-600"
                                    />
                                    <span>{cat.label}</span>
                                </label>
                            ))}
                        </form>
                    </div>
                </div>

                {/* Right Content */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">

                    <p className="font-semibold text-xl text-slate-800 mb-4">
                        Search Results: <span className="text-blue-600">{data.length}</span>
                    </p>

                    <div className="min-h-[calc(100vh-160px)] max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
                        {!loading && data.length !== 0 && (
                            <VerticalCard data={data} loading={loading} />
                        )}

                        {loading && (
                            <p className="text-center text-slate-500 py-10">Loading...</p>
                        )}

                        {!loading && data.length === 0 && (
                            <p className="text-center text-slate-600 py-10">
                                No products found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
