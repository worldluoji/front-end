import React, { useMemo } from 'react'
import _ from 'lodash'
import { useSearchParam } from 'react-use'

interface Movie {
    id: number,
    title: string,
    introduce: string
}

const defaultMovies: Movie[] = []

function SearchBox({ data=defaultMovies }) {
    const searchKey = useSearchParam('key') || ''
    const filtered = useMemo(() => {
        return data.filter(item => {
            return item.title.toLowerCase().includes(searchKey.toLowerCase())
        })
    }, [searchKey, data])

    // debounce防抖动, 300ms后才会执行
    const handleSearch = _.debounce(evt => {
        window.history.pushState(
            {},
            '',
            `${window.location.pathname}?key=${evt.target.value}`
        )
    }, 300)

    return (
        <div>
            <h2>Movies debounced search</h2>
            <input 
                defaultValue={ searchKey }
                placeholder='search...'
                onChange={ handleSearch }
            />
            <ul style={{ marginTop: 20 }}>
                { filtered.map(item => {
                    return <li key={item.id}>{ item.title }</li>
                }) }
            </ul>
        </div>
    )
}

function SearchBoxDemo() {
    const movies: Movie[] = [
        {
            id: 1,
            title: '神探大战',
            introduce: '一个多重人格神探破案的故事...'
        },
        {
            id: 2,
            title: '神探',
            introduce: '一个多重人格神探破案的故事...'
        },
    ]
    return (
        <SearchBox data={ movies }/>
    )
}

export default SearchBoxDemo