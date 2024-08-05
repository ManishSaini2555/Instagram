import React from 'react'
import UserLayout from '@src/layout/UserLayout'
import SearchSection from '@src/components/search-section/SearchSection'

const Search: React.FC<{}> = () => {
  return <UserLayout children={<SearchSection />} />
}

export default Search
