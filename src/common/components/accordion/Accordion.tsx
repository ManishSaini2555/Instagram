import React, { useEffect, useState } from 'react'
import './Accordion.scss'

interface AccordionProps {
  title: string
  isDefaultOpen?: boolean
  children: React.ReactNode
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  isDefaultOpen,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (isDefaultOpen != undefined) setIsOpen(isDefaultOpen)
  }, [isDefaultOpen])

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h2>{title}</h2>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  )
}

export default Accordion
