import React from 'react'
import './Table.css'

function Table({countries}) {
    console.log(countries)
    return (
        <div className='table'>
            {countries.map(country => {
                return(
                <tr>
                    <td>{country.country}</td>
                    <td><strong>{country.cases}</strong></td>
                </tr>
                )
            })}
        </div>
    )
}

export default Table
