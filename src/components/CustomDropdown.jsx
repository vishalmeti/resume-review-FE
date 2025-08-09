import { useState, useRef, useEffect } from 'react'

export default function CustomDropdown({ 
  value, 
  onChange, 
  options = [], 
  placeholder = "Select...", 
  className = "",
  disabled = false,
  icon = null,
  label = null,
  size = "md"
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)
  const searchRef = useRef(null)

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-sm", 
    lg: "px-4 py-3 text-base"
  }

  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [isOpen])

  function handleSelect(option) {
    onChange(option.value)
    setIsOpen(false)
    setSearchTerm('')
  }

  function toggleDropdown() {
    if (!disabled) {
      setIsOpen(!isOpen)
      if (!isOpen) {
        setSearchTerm('')
      }
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`
          relative w-full ${sizeClasses[size]} border border-gray-300 rounded-xl 
          bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
          focus:ring-2 focus:ring-primary-500 focus:border-transparent
          hover:bg-gray-50 dark:hover:bg-gray-700
          transition-all duration-200 text-left
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isOpen ? 'ring-2 ring-primary-500 border-transparent' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {icon && (
              <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                {icon}
              </div>
            )}
            <span className={`block truncate ${selectedOption ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <div className="flex-shrink-0 ml-2">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white backdrop-blur-md border border-gray-200 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-600 dark:shadow-2xl max-h-60 overflow-hidden">
          {/* Search Input (for dropdowns with many options) */}
          {options.length > 5 && (
            <div className="p-2 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="relative">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-200/50 rounded-lg bg-white/80 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-48 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                {searchTerm ? 'No results found' : 'No options available'}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`
                    w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700/50
                    focus:bg-gray-100 dark:focus:bg-gray-700/50 focus:outline-none
                    transition-colors duration-150
                    ${option.value === value ? 'bg-primary-100 text-primary-900 dark:bg-primary-900/50 dark:text-primary-100' : 'text-gray-900 dark:text-gray-100'}
                  `}
                >
                  <div className="flex items-center gap-2">
                    {option.icon && (
                      <div className="flex-shrink-0">
                        {option.icon}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{option.label}</div>
                      {option.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {option.description}
                        </div>
                      )}
                    </div>
                    {option.value === value && (
                      <div className="flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-600 dark:text-primary-400">
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
