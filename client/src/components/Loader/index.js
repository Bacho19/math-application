import React from 'react'

export const Loader = () => (
    <div style={{display: 'flex', justifyContent: 'center', paddingTop: '10rem'}}>
        <div className="preloader-wrapper active">
            <div className="spinner-layer spinner-blue-only-only">
                <div className="circle-clipper left">
                    <div className="circle" />
                </div>
                <div className="gap-patch">
                    <div className="circle" />
                </div>
                <div className="circle-clipper right">
                    <div className="circle" />
                </div>
            </div>
        </div>
    </div>
)