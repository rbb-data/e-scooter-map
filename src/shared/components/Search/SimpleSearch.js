import React, { useState } from 'react'
import useFuseJsSearch from './useFuseJsSearch'
import PropTypes from 'prop-types'

import SearchInput from '../SearchInput/SearchInput'

/**
 * This is a basic example of how to use the SearchInput component
 * you can use this as is or as an example to create your own search from
 */
export const SimpleSearch = props => {
  const { list, keepInputOnFocus, onResult, onReset } = props

  const { suggestions, setSearchString, clearSuggestions } = useFuseJsSearch(list)
  const [result, setResult] = useState(null)

  return <SearchInput
    textInputValue={result}
    buttonType={result ? 'cancel' : 'search'}
    keepInputOnFocus={keepInputOnFocus}
    suggestions={suggestions}
    onInput={setSearchString}
    onReset={() => {
      onReset()
      clearSuggestions()
      setResult(null)
    }}
    onResult={result => {
      onResult(result)
      setResult(result.label)
      clearSuggestions()
    }} />
}

SimpleSearch.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })),
  keepInputOnFocus: PropTypes.bool,
  onResult: PropTypes.func,
  onReset: PropTypes.func
}

SimpleSearch.defaultProps = {
  keepInputOnFocus: true
}

export default SimpleSearch