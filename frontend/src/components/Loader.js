import React from 'react'
import '../CSS/loader.css'

export default function Loader() {
    return (
        <>
            <div className="d-flex justify-content-center madimi-one-regular fs-4 text-light">
                <strong>Please wait...</strong>
            </div>

            <div className="d-flex justify-content-center mt-3">
                <div className="loader">
                    <div className="📦"></div>
                    <div className="📦"></div>
                    <div className="📦"></div>
                    <div className="📦"></div>
                    <div className="📦"></div>
                </div>
            </div>
        </>
    )
}
