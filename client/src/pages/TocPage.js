import React, {useState, useCallback, useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import TitlesList from '../components/TitlesList'
import {Loader} from '../components/Loader'
import Pagination from '../components/TocPagination'

const TocPage = () => {

    const {request, loading} = useHttp()
    const [titles, setTitles] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [titlesPerPage] = useState(10)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/tasks/toc', 'GET', null)
            setTitles(fetched)
        } catch (e) {}
    }, [request])


    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader />
    }

    // Get current posts
    const indexOfLastTitle = currentPage * titlesPerPage
    const indexOfFirstTitle = indexOfLastTitle - titlesPerPage
    const currentTitles = titles.slice(indexOfFirstTitle, indexOfLastTitle)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo(0, 0)
    }

    return(
        <div>
            <TitlesList titles={currentTitles} />
            <Pagination titlesPerPage={titlesPerPage} totalTitles={titles.length} paginate={paginate} />
        </div>
    )
}

export default TocPage