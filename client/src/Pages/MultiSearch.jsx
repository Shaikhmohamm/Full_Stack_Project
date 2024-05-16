import React from 'react'
import { useSelector } from 'react-redux'
import SingleCard from '../Components/SingleCard'


const MultiSearch = () => {
    const searchState = useSelector((state) => state.search.searchinput)
    return (
        <>
            <div className='flex bg-leanBlue'>
                <div className='w-full'>
                    <h1 className="text-3xl text-white font-semibold ml-5 mt-8 mb-4">
                        Based on your search
                    </h1>
                    {searchState && searchState.length === 0 ? (
                        <h1 className="text-white text-2xl text-center mt-4">Not found</h1>
                    ) : (
                        <div className='w-full'>
                            <div className="mx-3 flex flex-wrap gap-6 justify-start">
                                {searchState.map((item) => (
                                    <div key={item._id} className="flex-none w-[45%] md:w-[30%] lg:w-[23%] h-40 md:h-48 mb-12">
                                        <SingleCard
                                            item={item}
                                            fieldType='recommended'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default MultiSearch
