import * as React from 'react'

export interface ILogoProps {
    className: string
}

export function Logo(props: ILogoProps) {
    return (
        <svg
            className={props.className}
            width='472'
            height='578'
            viewBox='0 0 472 578'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <g filter='url(#filter0_i_1_46)'>
                <rect width='470' height='578' rx='108' fill='#77D8F7' />
            </g>
            <g filter='url(#filter1_d_1_46)'>
                <rect x='67' y='186' width='89' height='200' rx='30' fill='black' />
                <rect x='169' y='142' width='101' height='284' rx='30' fill='black' />
                <rect x='283' y='107' width='101' height='362' rx='30' fill='black' />
                <path d='M384 262H470V310H384V262Z' fill='black' />
                <path
                    d='M34 282C34 270.954 42.9543 262 54 262H67V310H54C42.9543 310 34 301.046 34 290V282Z'
                    fill='black'
                />
            </g>
            <path
                d='M92.6087 193H101.761C82.4554 194.018 77.8944 204.028 75 229.781V211.5C75 201.283 82.8837 193 92.6087 193Z'
                fill='#D9D9D9'
            />
            <path
                d='M102 193H92.6087C82.8837 193 75 201.283 75 211.5V230M75 229.781C77.8944 204.028 82.4554 194.018 101.761 193'
                stroke='#D9D9D9'
            />
            <path
                d='M199.783 149H212.664C185.493 150.568 179.074 165.989 175 205.663V177.5C175 161.76 186.096 149 199.783 149Z'
                fill='#D9D9D9'
            />
            <path
                d='M213 149H199.783C186.096 149 175 161.76 175 177.5V206M175 205.663C179.074 165.989 185.493 150.568 212.664 149'
                stroke='#D9D9D9'
            />
            <path
                d='M316.087 112H329.646C301.045 113.651 294.288 129.883 290 171.645V142C290 125.431 301.68 112 316.087 112Z'
                fill='#D9D9D9'
            />
            <path
                d='M330 112H316.087C301.68 112 290 125.431 290 142V172M290 171.645C294.288 129.883 301.045 113.651 329.646 112'
                stroke='#D9D9D9'
            />
            <defs>
                <filter
                    id='filter0_i_1_46'
                    x='0'
                    y='-2'
                    width='472'
                    height='580'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'>
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feBlend
                        mode='normal'
                        in='SourceGraphic'
                        in2='BackgroundImageFix'
                        result='shape'
                    />
                    <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                    />
                    <feOffset dx='20' dy='-20' />
                    <feGaussianBlur stdDeviation='1' />
                    <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
                    <feColorMatrix
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                    />
                    <feBlend mode='normal' in2='shape' result='effect1_innerShadow_1_46' />
                </filter>
                <filter
                    id='filter1_d_1_46'
                    x='32'
                    y='107'
                    width='440'
                    height='376'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'>
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                    />
                    <feOffset dy='12' />
                    <feGaussianBlur stdDeviation='1' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                    />
                    <feBlend
                        mode='normal'
                        in2='BackgroundImageFix'
                        result='effect1_dropShadow_1_46'
                    />
                    <feBlend
                        mode='normal'
                        in='SourceGraphic'
                        in2='effect1_dropShadow_1_46'
                        result='shape'
                    />
                </filter>
            </defs>
        </svg>
    )
}
