import * as React from 'react'

export interface IStrongArmProps {
    className: string
    color: string
}

export function StrongArm(props: IStrongArmProps) {
    return (
        <svg
            className={props.className}
            fill={props.color}
            version='1.1'
            id='Capa_1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width='64px'
            height='64px'
            viewBox='0 0 471.787 471.787'
            xmlSpace='preserve'>
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
                {' '}
                <g>
                    {' '}
                    <g id='_x35_1_20_'>
                        {' '}
                        <path d='M360.852,35.142c-15.477-18.056-102.336-61.626-149.625-12.615c-47.29,49.01,2.952,83.636,21.012,91.97 c18.057,8.334,69.647,21.066,88.354-11.607c4.99,12.785,1.623,119.131-27.865,146.17c-14.942-14.246-36.51-23.19-60.488-23.19 c-19.689,0-37.746,6.031-51.85,16.073c-18.619-29.884-53.845-50.062-94.271-50.062c-19.383,0-37.563,4.659-53.308,12.782v10.448 c-0.013-0.003-0.056-0.013-0.056-0.013v256.662c0,0,74.807,3.87,80.791-82.544c-0.002-0.005-0.005-0.01-0.005-0.015 c18.198,26.427,76.18,46.541,111.909,45.355c56.121-1.861,130.693-4.321,193.865-64.881c5.838-5.809,10.52-12.669,13.701-20.259 c0-0.002,0-0.002,0-0.004C462.242,288.615,376.328,53.198,360.852,35.142z'></path>{' '}
                    </g>{' '}
                </g>{' '}
            </g>
        </svg>
    )
}
