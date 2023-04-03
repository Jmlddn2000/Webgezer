import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

    console.log('jamal')
  return (
    <div>
        <h1>Tugas</h1>
      <ul>
        <li>
        <button type="button" className="btn border fs-2 fw-bold text-decoration-none   ">
            <Link to="/Taks_1">a.	Melihat dan mengeksplorasi sistus website selama 30 detik</Link>
        </button>
        </li>

        <li>
        <button type="button" className="btn border fs-2 fw-bold text-decoration-none   ">
            <Link to="/Taks_2">b.	Mencari fitur pada header dalam 10 detik</Link>
        </button>
        </li>

        <li>
        <button type="button" className="btn border fs-2 fw-bold text-decoration-none   ">
            <Link to="/Taks_3">c.	Mencari list game pada website dalam 10 detik </Link>
        </button>
        </li>

        <li>
        <button type="button" className="btn border fs-2 fw-bold text-decoration-none   ">
            <Link to="/Taks_4">d.	Mencari game yang paling disukai dalam 10 detik</Link>
        </button>
        </li>

        <li>
        <button type="button" className="btn border fs-2 fw-bold text-decoration-none   ">
            <Link to="/Headmap">headmap</Link>
        </button>
        </li>

      </ul>
    </div>
  )
}
