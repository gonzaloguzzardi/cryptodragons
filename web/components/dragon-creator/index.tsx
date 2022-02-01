import React, { Component, ReactNode } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

//TODO: change to type dragon & functional components.
interface DProps {
  colorAlas?: number
  colorCola?: number
  colorPanza?: number
  colorCuernos?: number
  colorOjos?: number
  colorCuerpo?: number

  typeAlas?: number
  typeCola?: number
  typePanza?: number
  typeCuernos?: number
  typeOjos?: number
  typeCuerpo?: number
}
interface DState {
  colorAlas?: number
  colorCola?: number
  colorPanza?: number
  colorCuernos?: number
  colorOjos?: number
  colorCuerpo?: number

  typeAlas?: number
  typeCola?: number
  typePanza?: number
  typeCuernos?: number
  typeOjos?: number
  typeCuerpo?: number
}

class DragonCreator extends Component<DProps> {
  state: DState

  constructor(props: DProps) {
    super(props)

    this.state = {
      colorAlas: props.colorAlas,
      colorCola: props.colorCola,
      colorPanza: props.colorPanza,
      colorCuernos: props.colorCuernos,
      colorOjos: props.colorOjos,
      colorCuerpo: props.colorCuerpo,

      typeAlas: props.typeAlas,
      typeCola: props.typeCola,
      typePanza: props.typePanza,
      typeCuernos: props.typeCuernos,
      typeOjos: props.typeOjos,
      typeCuerpo: props.typeCuerpo,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.colorAlas !== this.props.colorAlas ||
      prevState.colorCola !== this.props.colorCola ||
      prevState.colorPanza !== this.props.colorPanza ||
      prevState.colorCuernos !== this.props.colorCuernos ||
      prevState.colorOjos !== this.props.colorOjos ||
      prevState.colorCuerpo !== this.props.colorCuerpo ||
      prevState.typeAlas !== this.props.typeAlas ||
      prevState.typeCola !== this.props.typeCola ||
      prevState.typePanza !== this.props.typePanza ||
      prevState.typeCuernos !== this.props.typeCuernos ||
      prevState.typeOjos !== this.props.typeOjos ||
      prevState.typeCuerpo !== this.props.typeCuerpo
    ) {
      this.setState({
        colorAlas: this.props.colorAlas,
        colorCola: this.props.colorCola,
        colorPanza: this.props.colorPanza,
        colorCuernos: this.props.colorCuernos,
        colorOjos: this.props.colorOjos,
        colorCuerpo: this.props.colorCuerpo,
        typeAlas: this.props.typeAlas,
        typeCola: this.props.typeCola,
        typePanza: this.props.typePanza,
        typeCuernos: this.props.typeCuernos,
        typeOjos: this.props.typeOjos,
        typeCuerpo: this.props.typeCuerpo,
      })
    }
  }

  createCuernos(color, number) {
    switch (number) {
      case 1:
        return (
          <svg className="cuernos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114.36 18.67">
            <defs>
              <style>
                {`.cuernos {
                        position: absolute;
                        z-index: 3;
                        margin-left: auto; 
                        margin-right: auto; 
                        left: 0; 
                        right: 0;
                        top: 10%;
                        width: 39%;
                        fill: hsl(` +
                  color +
                  `,100%,50%);
                        stroke: #1d1d1b;
                        stroke-miterlimit: 10;
                        stroke-width: 3px;}`}
              </style>
            </defs>
            <path
              className="cls-10"
              d="M128.74,16.19s-10.18,6.9-14,3h0a7.51,7.51,0,0,0-9.89-.85c-10.45,7.78-11.38,9.06,1.3-10h0Z"
              transform="translate(-95.38 -6.49)"
            />
            <path
              className="cls-10"
              d="M176.34,16.31s10.22,6.85,14,2.91h0a7.5,7.5,0,0,1,9.88-.9c10.49,7.72,11.43,9-1.36-10h0Z"
              transform="translate(-95.38 -6.49)"
            />
          </svg>
        )
      case 2:
        return (
          <svg className="cuernos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.83 16.99">
            <defs>
              <style>
                {`.cuernos {
                        position: absolute;
                        z-index: 3;
                        margin-left: auto; 
                        margin-right: auto; 
                        left: 0; 
                        right: 0;
                        top: 9%;
                        width: 23%;
                        fill: hsl(` +
                  color +
                  `,100%,50%);
                        stroke: #1d1d1b;
                        stroke-miterlimit: 10;
                        stroke-width: 3px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <g id="cuernos_2" data-name="cuernos 2">
                  <path
                    className="cls-10"
                    d="M8.62,15.33,1.22,3.43a1.42,1.42,0,0,1,2-1.9l11.9,8.4a1.31,1.31,0,0,1,0,2.2l-4.6,3.5A1.2,1.2,0,0,1,8.62,15.33Z"
                  />
                  <path className="cls-10" d="M7.42,13.33c0-2.3,2.8-5.3,4.9-5.3" />
                  <path className="cls-10" d="M4.52,8.63c0-2.3,1.6-4.2,2.8-4.2" />
                  <path
                    className="cls-10"
                    d="M68.22,15l7.4-11.9a1.42,1.42,0,0,0-2-1.9l-11.9,8.4a1.31,1.31,0,0,0,0,2.2l4.6,3.5A1.18,1.18,0,0,0,68.22,15Z"
                  />
                  <path className="cls-10" d="M69.52,13c0-2.3-2.8-5.3-4.9-5.3" />
                  <path className="cls-10" d="M72.42,8.33c0-2.3-1.6-4.2-2.8-4.2" />
                </g>
              </g>
            </g>
          </svg>
        )
      case 3:
        return (
          <svg className="cuernos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.29 36.32">
            <defs>
              <style>
                {`.cuernos {
                        position: absolute;
                        z-index: 3;
                        margin-left: auto; 
                        margin-right: auto; 
                        left: 0; 
                        right: 0;
                        top: 5%;
                        width: 38%;
                        fill: hsl(` +
                  color +
                  `,100%,50%) ;
                        stroke: #1d1d1b;
                        stroke-miterlimit: 10;
                        stroke-width: 3px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <g id="cuernos_3" data-name="cuernos 3">
                  <line className="cls-10" x1="25.65" y1="35.11" x2="25.65" y2="35.11" />
                  <line className="cls-10" x1="18.65" y1="26.91" x2="18.65" y2="26.91" />
                  <path
                    className="cls-10"
                    d="M4.35,22.21l-2.6-16c5.2,8,15.8,26.7,25.5,27.7h0c-10.8.3-20.6,7-22.9-11.7"
                  />
                  <path className="cls-10" d="M16,26.51c0,2.8-4.4,6.3-8,6.3" />
                  <path className="cls-10" d="M13.35,23.41c0,1.9-3.6,3.5-8.2,3.5" />
                  <path className="cls-10" d="M9.25,18.81c0,1.1-2.3,1.9-5.2,1.9" />
                  <path className="cls-10" d="M19.85,30.81c0,2.4-1.1,4.3-2.5,4.3" />
                  <path
                    className="cls-10"
                    d="M103.35,20.91l1.5-16.2c-4.6,8.4-13.8,27.8-23.4,29.4h0c10.7-.3,21,5.7,21.9-13.2"
                  />
                  <path className="cls-10" d="M92.05,26c.2,2.8,4.8,5.9,8.4,5.7" />
                  <path className="cls-10" d="M94.45,22.81c.1,1.9,3.9,3.3,8.4,2.9" />
                  <path className="cls-10" d="M98.15,17.91c.1,1.1,2.5,1.8,5.3,1.5" />
                  <path className="cls-10" d="M88.45,30.61c.2,2.4,1.4,4.2,2.8,4.1" />
                </g>
              </g>
            </g>
          </svg>
        )
      case 4:
        return (
          <svg className="cuernos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.31 34.88">
            <defs>
              <style>
                {`.cuernos {
                      position: absolute;
                      z-index: 3;
                      margin-left: auto; 
                      margin-right: auto; 
                      left: 0; 
                      right: 0;
                      top: 7%;
                      width: 40%;
                      fill: hsl(` +
                  color +
                  `,100%,50%);
                      stroke: #1d1d1b;
                      stroke-miterlimit: 10;
                      stroke-width: 3px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <g id="cuernos_4" data-name="cuernos 4">
                  <g id="cuernos_4-2" data-name="cuernos 4">
                    <path className="cls-10" d="M41.85,29.28C39.35,37.08,18.67-19,.87,12" />
                    <path className="cls-10" d="M.47,12.25c9-4.41,20.09,2.64,38.88,21.93" />
                  </g>
                  <path className="cls-10" d="M32.26,27.09c0-2.54,1.15-4.6,2.57-4.6" />
                  <path className="cls-10" d="M26.57,22c0-3.42,2.77-5.66,3.93-5.66" />
                  <path className="cls-10" d="M21.36,17.89c0-3.64.16-9,3-9" />
                  <path className="cls-10" d="M15.24,14.08c0-5.69,1.1-10.3,2.45-10.3" />
                  <path className="cls-10" d="M9.34,11.3c0-4.68.55-8.47,1.22-8.47" />
                  <path className="cls-10" d="M5.56,11.3c0-3.25.16-5.88.37-5.88" />
                  <g id="cuernos_4-3" data-name="cuernos 4">
                    <path className="cls-10" d="M143.41,11.18c-15.79-32.07-40,22.62-42,14.67" />
                    <path className="cls-10" d="M103.59,30.9c20-18,31.48-24.38,40.2-19.4" />
                  </g>
                  <path className="cls-10" d="M111.11,24.28c.17-2.54-.85-4.67-2.27-4.76" />
                  <path className="cls-10" d="M117.12,19.52c.22-3.42-2.4-5.84-3.56-5.91" />
                  <path className="cls-10" d="M122.58,15.79c.23-3.63.41-8.95-2.46-9.13" />
                  <path className="cls-10" d="M128.92,12.38c.37-5.68-.43-10.35-1.78-10.44" />
                  <path className="cls-10" d="M135,10c.3-4.67,0-8.48-.68-8.52" />
                  <path className="cls-10" d="M138.77,10.22c.2-3.24.21-5.88,0-5.89" />
                </g>
              </g>
            </g>
          </svg>
        )
      default:
        return null
    }
  }

  createPanza(color, number) {
    switch (number) {
      case 1:
        return (
          <svg className="panza" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.85 132.71">
            <defs>
              <style>
                {`.panza {
                      position: absolute;
                      z-index: 2;
                      margin-left: auto; 
                      margin-right: auto; 
                      left: 0; 
                      right: 0;
                      top: 41%;
                      width: 27%;
                      stroke: #1d1d1b;
                      stroke-miterlimit: 10;
                      stroke-width: 3px;
                      fill:hsl(` +
                  color +
                  `,100%,50%);
                      }`}
              </style>
            </defs>
            <path
              className="cls-9"
              d="M167.13,133.32a22.14,22.14,0,0,1-14.32,4.33,18.88,18.88,0,0,1-12.61-4.55c-17.78,8.48-30.68,33.55-30.68,63.18,0,36.59,19.67,66.25,43.93,66.25s43.93-29.66,43.93-66.25C197.38,166.89,184.69,142,167.13,133.32Z"
              transform="translate(-108.02 -131.33)"
            />
          </svg>
        )
      case 2:
        return (
          <svg className="panza" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.8 134.27">
            <defs>
              <style>
                {`.panza {
                        position: absolute;
                        z-index: 2;
                        margin-left: auto; 
                        margin-right: auto; 
                        left: 0; 
                        right: 0;
                        top: 41%;
                        width: 27%;
                        stroke: #1d1d1b;
                        stroke-miterlimit: 10;
                        stroke-width: 3px;
                        fill:hsl(` +
                  color +
                  `,100%,50%);
                      } 
                      .cls-9,.cls-99{stroke:#000;stroke-miterlimit:10;}
                      .cls-9{stroke - width:3px;}
                      .cls-99{stroke - width:2px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <g id="PANZA">
                  <path
                    className="cls-99"
                    d="M59.1,3.47c-3.4,2.6-7.9,4.4-14.3,4.3C39,7.67,35,4.27,32,1.77,14.24,10.27,1.5,36.87,1.5,66.47c0,36.6,19.7,66.3,43.9,66.3s43.9-29.7,43.9-66.3C89.4,37,76.7,12.07,59.1,3.47Z"
                  />
                </g>
                <path className="cls-9" d="M17.8,119.39c0-1.39,23.9-7.69,54.4-.35" />
                <path className="cls-9" d="M10.41,106.47c4.89-7.14,40-12.57,70.18-.39" />
                <path className="cls-9" d="M4,88.56C4,89,47,74,86.59,89.42" />
                <path className="cls-9" d="M1.63,71.48c4-5.34,45.4-11.35,87.67,0" />
                <path className="cls-9" d="M2.25,54.31C6.38,47.29,48,42,88.38,52.63" />
                <path className="cls-9" d="M6.12,36.89C9.24,31.76,49,26.17,84.5,36.06" />
                <path className="cls-9" d="M14.78,19c.09-1.53,31.79-5.91,61.38,0" />
              </g>
            </g>
          </svg>
        )
      default:
        return null
    }
  }

  createCola(color, number) {
    switch (number) {
      case 2:
        return (
          <svg className="cola" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.92 127.62">
            <defs>
              <style>
                {`.cola {
                      position: absolute;
                      z-index: 0;
                      top: 42%;
                      left: 63%;
                      width: 30%;
                    } 
                    .cls-8{fill:hsl(` +
                  color +
                  `,100%,50%);stroke:#000;stroke-miterlimit:10;stroke-width:2px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_9" data-name="Capa 9">
                <path
                  className="cls-8"
                  d="M17.44,89.89,2.38,125.82,33.92,122A50.11,50.11,0,0,0,77.8,76.91L82,31.53l4.7,2a4.1,4.1,0,0,0,5.55-4.86L85.13,2.74a1.69,1.69,0,0,0-2.9-.66L63.8,23.39a2.85,2.85,0,0,0,2,4.71l6.39.4-13,27.07A64.22,64.22,0,0,1,17.44,89.89Z"
                />
                <circle className="cls-8" cx="31.61" cy="100.75" r="4.05" />
                <circle className="cls-8" cx="61.44" cy="87.58" r="5.19" />
                <circle className="cls-8" cx="65.61" cy="59.8" r="1.02" />
              </g>
            </g>
          </svg>
        )
      case 1:
        return (
          <svg className="cola" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.98 121.93">
            <defs>
              <style>
                {`.cola {
                      position: absolute;
                      z-index: 0;
                      top: 43%;
                      left: 65%;
                      width: 35%;
                    } 
                    .cls-8{fill:hsl(` +
                  color +
                  `,100%,50%);stroke:#000;stroke-miterlimit:10;stroke-width:2px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_6" data-name="Capa 6">
                <path
                  className="cls-8"
                  d="M1.93,111l29.46,2.51a39,39,0,0,0,17.9-2.65c15.05-6,24.45-21.16,24-37.37L73,59.39a121.13,121.13,0,0,1,12.12-56h0L80.73,5.61A96.39,96.39,0,0,0,38,49.17l-.41.84A98,98,0,0,1,9.14,84.85h0Z"
                />
                <circle className="cls-8" cx="42.35" cy="98.59" r="6.54" />
                <circle className="cls-8" cx="40.72" cy="79.38" r="2.79" />
                <circle className="cls-8" cx="68.69" cy="41.18" r="2.94" />
                <circle className="cls-8" cx="53.96" cy="43.31" r="5.07" />
              </g>
            </g>
          </svg>
        )
      case 3:
        return (
          <svg className="cola" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.13 71.12">
            <defs>
              <style>
                {`.cola {
                        position: absolute;
                        z-index: 0;
                        top: 63%;
                        left: 65%;
                        width: 37%;
                      } 
                      .cls-8{fill:hsl(` +
                  color +
                  `,100%,50%);stroke:#000;stroke-miterlimit:10;stroke-width:2px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_7" data-name="Capa 7">
                <path
                  className="cls-8"
                  d="M1.72,53.73l2.78.71a76.27,76.27,0,0,0,59.9-9.5L124,7.06,67.38,20.87A66.62,66.62,0,0,1,9.75,8h0Z"
                />
                <path className="cls-8" d="M34.92,20.63l5-5.79a3.64,3.64,0,0,1,6.09,1L49,22.7Z" />
                <path
                  className="cls-8"
                  d="M62.88,20.63,64.43,14a3.77,3.77,0,0,1,6.46-1.68l5.73,6.28Z"
                />
                <path className="cls-8" d="M91,15.11V8.39a3.5,3.5,0,0,1,5.72-2.71l7.58,6.19Z" />
                <path className="cls-8" d="M115,9.26l1.63-6a2.37,2.37,0,0,1,4.23-.73L124,7.06Z" />
                <circle className="cls-8" cx="26.26" cy="36.67" r="4.72" />
                <circle className="cls-8" cx="64.37" cy="33.44" r="1.49" />
              </g>
            </g>
          </svg>
        )
      case 4:
        return (
          <svg className="cola" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116.37 142.47">
            <defs>
              <style>
                {`.cola {
                      position: absolute;
                      z-index: 0;
                      top: 40%;
                      left: 62%;
                      width: 33%;
                    } 
                    .cls-8{fill:hsl(` +
                  color +
                  `,100%,50%);stroke:#000;stroke-miterlimit:10;}
                    .cls-8{stroke - width:2px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_8" data-name="Capa 8">
                <path
                  className="cls-8"
                  d="M16.5,128.79,4.2,150.9l29.85-19.06A107.51,107.51,0,0,0,83.39,49.05l-.5-35.29L77.8,38.46A177.43,177.43,0,0,1,62.44,82.52h0C51,96.67,32.66,97,16.7,105.74Z"
                />
                <path
                  className="cls-8"
                  d="M76.47,44.36,64.83,32a2.66,2.66,0,0,1,2.48-4.43l12.2,2.53Z"
                />
                <path className="cls-8" d="M81.52,20.39,65.87,14.56a1.9,1.9,0,0,1,.66-3.68h15Z" />
                <path className="cls-8" d="M64.45,77.08l-7.07-3a1.64,1.64,0,0,0-2.1,2.28l4.81,9Z" />
                <ellipse className="cls-8" cx="34.27" cy="118.35" rx="2.77" ry="1.52" />
                <circle className="cls-8" cx="45.69" cy="116.46" r="1.89" />
                <circle className="cls-8" cx="74.11" cy="68.6" r="1.03" />
              </g>
            </g>
          </svg>
        )
      default:
        return null
    }
  }

  createAlas(color, number) {
    switch (number) {
      case 1:
        return (
          <div>
            <svg className="alas" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 293.74 80.96">
              <defs>
                <style>
                  {`.alas{
                          position: absolute;
                          z-index: 1; 
                          margin-left: auto; 
                          margin-right: auto; 
                          left: 0; 
                          right: 0;
                          top: 28%;                      
                          width: 80%;
                          fill: hsl(` +
                    color +
                    `,100%,50%) ;
                          stroke: #1d1d1b;
                          stroke-miterlimit: 10;
                          stroke-width: 3px;}`}
                </style>
              </defs>
              <path className="cls-7" d="M92.67,119.68" transform="translate(-7.17 -73.81)" />
              <path
                className="cls-7"
                d="M115.09,108.17,88.64,78.94c-1.25-1.37-2-2.44-2.71-3a1.6,1.6,0,0,0-2.1-.32,18.45,18.45,0,0,0-3.65,3.29l-63.06,66,36.94-24a6.23,6.23,0,0,1,7.88.88L64.8,125l9.64-8.73a7.38,7.38,0,0,1,11.22,1.49h0A5.32,5.32,0,0,0,88.47,120a5.37,5.37,0,0,0,4.2-.31l1.58-2.18a22.17,22.17,0,0,1,17.38-9.23Z"
                transform="translate(-7.17 -73.81)"
              />
              <line className="cls-7" x1="78.76" y1="2.08" x2="83.5" y2="46.44" />
              <polyline className="cls-7" points="57.63 51.2 75.42 4.97 76.66 1.76" />
              <line className="cls-7" x1="36.4" y1="53.89" x2="75.42" y2="4.97" />
              <path
                className="cls-7"
                d="M192.46,111.18l26.09-29.55c1.22-1.39,2-2.47,2.66-3.09a1.61,1.61,0,0,1,2.1-.34A18.16,18.16,0,0,1,227,81.44l63.88,65.22-37.24-23.49a6.23,6.23,0,0,0-7.87,1L243,127.4l-9.75-8.61A7.37,7.37,0,0,0,222,120.42h0a5.36,5.36,0,0,1-7,2l-1.61-2.16a22.22,22.22,0,0,0-17.49-9Z"
                transform="translate(-7.17 -73.81)"
              />
              <line className="cls-7" x1="214.04" y1="4.73" x2="209.85" y2="49.15" />
              <polyline className="cls-7" points="235.78 53.59 217.42 7.59 216.14 4.39" />
              <line className="cls-7" x1="257.03" y1="56.02" x2="217.42" y2="7.59" />
            </svg>
          </div>
        )
      case 2:
        return (
          <svg className="alas" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393.94 90.79">
            <defs>
              <style>
                {`.alas{
                          position: absolute;
                          z-index: 1; 
                          margin-left: auto; 
                          margin-right: auto; 
                          left: 0; 
                          right: 0;
                          top: 24%;                      
                          width: 94%;
                          fill: hsl(` +
                  color +
                  `,100%,50%) ;
                      }
                      .cls-7{stroke:#000;stroke-miterlimit:10;stroke-width:3px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_2-2" data-name="Capa 2">
                <path
                  className="cls-7"
                  d="M236.2,68l29.67-40.46a15.38,15.38,0,0,1,9.9-5.95L389,3.75,359.21,29.52A20.36,20.36,0,0,0,355.46,56l5.87,9L331.76,69a27,27,0,0,0-22,18l-.73,1.88-13.17-5A267.09,267.09,0,0,0,254,71.62Z"
                />
                <path
                  className="cls-7"
                  d="M270.83,23.26l9.82,26.82a59.8,59.8,0,0,0,10.88,18.49l17.53,20.29"
                />
                <path
                  className="cls-7"
                  d="M361.33,65,330.21,54.13a152.25,152.25,0,0,1-24.68-11.2l-34.7-19.67-1.87,20c-1,8.06-.64,13.5.68,18.06L272.15,76"
                />
                <path
                  className="cls-7"
                  d="M356.42,32.47H331.18a106.75,106.75,0,0,1-19.13-1.72l-41.22-7.49"
                />
                <path
                  className="cls-7"
                  d="M157.74,66.55,128.07,26.09a15.38,15.38,0,0,0-9.9-5.95L5,2.3,34.73,28.07a20.36,20.36,0,0,1,3.75,26.49l-5.87,9,29.57,3.94a27,27,0,0,1,22,18l.73,1.88,13.17-5A267.09,267.09,0,0,1,140,70.17Z"
                />
                <path
                  className="cls-7"
                  d="M123.11,21.81l-9.82,26.82a59.8,59.8,0,0,1-10.88,18.49L84.88,87.41"
                />
                <path
                  className="cls-7"
                  d="M32.61,63.59,63.73,52.68a152.25,152.25,0,0,0,24.68-11.2l34.7-19.67,1.87,20c1,8.06.64,13.5-.68,18.06l-2.51,14.71"
                />
                <path
                  className="cls-7"
                  d="M37.52,31H62.76A106.75,106.75,0,0,0,81.89,29.3l41.22-7.49"
                />
              </g>
            </g>
          </svg>
        )
      case 3:
        return (
          <svg className="alas" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 303.54 118.26">
            <defs>
              <style>
                {`.alas{
                                    position: absolute;
                                    z-index: 1; 
                                    margin-left: auto; 
                                    margin-right: auto; 
                                    left: 0; 
                                    right: 0;
                                    top: 7%;                      
                                    width: 94%;
                                    fill: hsl(` +
                  color +
                  `,100%,50%) ;
                                    }
                                    .cls-7{stroke:#000;stroke-miterlimit:10;stroke-width:3px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_3" data-name="Capa 3">
                <path
                  className="cls-7"
                  d="M112.93,109.45l-12.45-8.2A64.49,64.49,0,0,1,74.4,55.12h0A76.87,76.87,0,0,1,62,6.7l.37-4.6-3,.95A46.85,46.85,0,0,0,31.73,26.31h0a45.93,45.93,0,0,1-22,20.9L2.4,50.47,4,52.38a41.11,41.11,0,0,1,8.68,32.69h0l2.44.7a54.19,54.19,0,0,1,33.56,28h0c14.36-11.86,40.85-8.4,58.46-2.34Z"
                />
                <polyline className="cls-7" points="75.05 60.07 83.99 60.07 71.27 48.79" />
                <path
                  className="cls-7"
                  d="M2.4,50.47h0a175.82,175.82,0,0,1,71.09,4.4l.91.25-4.06.52A96.48,96.48,0,0,0,12.63,85.07h0"
                />
                <path
                  className="cls-7"
                  d="M74.4,55.12l-1,1a36.57,36.57,0,0,0-10.84,26h0a37.5,37.5,0,0,0-12.71,23.24l-1.18,8.38"
                />
                <path
                  className="cls-7"
                  d="M107.09,111.42l-1.66-2.63A57.91,57.91,0,0,0,62.52,82.14h0"
                />
                <path
                  className="cls-7"
                  d="M190.6,111.6l12.45-8.2a64.56,64.56,0,0,0,26.09-46.14h0A76.86,76.86,0,0,0,241.56,8.84l-.37-4.6,3,1A46.81,46.81,0,0,1,271.8,28.45h0a45.9,45.9,0,0,0,22.05,20.9l7.29,3.27-1.55,1.91a41.1,41.1,0,0,0-8.68,32.69h0l-2.45.7a54.15,54.15,0,0,0-33.55,28h0c-14.36-11.85-40.86-8.39-58.47-2.34Z"
                />
                <polyline className="cls-7" points="228.49 62.22 219.55 62.22 232.27 50.94" />
                <path
                  className="cls-7"
                  d="M301.14,52.62h0A175.82,175.82,0,0,0,230.05,57l-.91.25,4.06.53a96.45,96.45,0,0,1,57.71,29.43h0"
                />
                <path
                  className="cls-7"
                  d="M229.14,57.26l1,1a36.6,36.6,0,0,1,10.83,26h0a37.49,37.49,0,0,1,12.72,23.25l1.18,8.37"
                />
                <path className="cls-7" d="M196.44,113.56l1.66-2.63A58,58,0,0,1,241,84.28h0" />
              </g>
            </g>
          </svg>
        )
      case 4:
        return (
          <svg className="alas" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 358.19 114.88">
            <defs>
              <style>
                {`.alas{
                                    position: absolute;
                                    z-index: 1; 
                                    margin-left: auto; 
                                    margin-right: auto; 
                                    left: 0; 
                                    right: 0;
                                    top: 17%;                      
                                    width: 98%;
                                    fill: hsl(` +
                  color +
                  `,100%,50%) ;
                                    }
                                    .cls-7{stroke:#000;stroke-miterlimit:10;stroke-width:3px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_4" data-name="Capa 4">
                <path
                  className="cls-7"
                  d="M144.37,80.73,137.75,68,101,64.72a3.6,3.6,0,0,1-3-5l24-56a1.58,1.58,0,0,0-2.32-1.94l-5.55,3.64L110,10.83a14.63,14.63,0,0,1-7.59,5.9h0A174,174,0,0,0,16.28,67.38L4,80.59l5.06-.77a26.92,26.92,0,0,1,29.8,18.73h0l6.41-2.63a41.67,41.67,0,0,1,31.86.1h0a13.62,13.62,0,0,1,5.17,3.77l4.08,4.79,1.91-2.75a16.69,16.69,0,0,1,24.47-3.25h0L118,91.07a14.22,14.22,0,0,1,18.53-4.29h0L143,85.36Z"
                />
                <path
                  className="cls-7"
                  d="M136.56,86.78l-7.3-11L90.17,73.11a5.39,5.39,0,0,1-4.55-7.58l18.44-41.14-2.84,1c-32.3,11.44-73,31-97.2,55.19l11.33-1"
                />
                <path
                  className="cls-7"
                  d="M91.8,51h0A151.08,151.08,0,0,0,50.44,85L38.88,98.55,58.36,81A73.13,73.13,0,0,1,85.62,65.53h0"
                />
                <path
                  className="cls-7"
                  d="M91.8,73.22h0A44.32,44.32,0,0,0,86,99.35l.45,5.23,2.77-8.94a105.41,105.41,0,0,1,8.12-19.22l1.48-2.71"
                />
                <polyline className="cls-7" points="125.36 75.55 111.01 97.28 129.26 75.82" />
                <path className="cls-7" d="M106.64,14.5l1.64-.39a6.93,6.93,0,0,1,7.77,3.51h0" />
                <path
                  className="cls-7"
                  d="M213.81,83.27l6.62-12.75,36.71-3.26a3.59,3.59,0,0,0,3-5l-23.95-56a1.58,1.58,0,0,1,2.32-1.95L244.06,8l4.09,5.42a14.59,14.59,0,0,0,7.59,5.9h0a174,174,0,0,1,86.17,50.65l12.25,13.21-5.06-.77a26.94,26.94,0,0,0-29.8,18.72h0l-6.41-2.62a41.67,41.67,0,0,0-31.86.09h0a13.75,13.75,0,0,0-5.17,3.78l-4.07,4.78-1.91-2.75a16.71,16.71,0,0,0-24.47-3.25h0l-5.25-7.5a14.23,14.23,0,0,0-18.53-4.3h0l-6.49-1.41Z"
                />
                <path
                  className="cls-7"
                  d="M221.63,89.32l7.29-10.95L268,75.66a5.38,5.38,0,0,0,4.54-7.58L254.12,26.94,257,28c32.31,11.44,73,30.94,97.2,55.19l-11.32-1"
                />
                <path
                  className="cls-7"
                  d="M266.38,53.57h0a151,151,0,0,1,41.36,33.95l11.56,13.57L299.82,83.56a73,73,0,0,0-27.26-15.48h0"
                />
                <path
                  className="cls-7"
                  d="M266.38,75.77h0a44.31,44.31,0,0,1,5.86,26.13l-.45,5.22L269,98.19A105.84,105.84,0,0,0,260.89,79l-1.47-2.71"
                />
                <polyline className="cls-7" points="232.82 78.1 247.17 99.83 228.92 78.37" />
                <path className="cls-7" d="M251.55,17.05l-1.65-.4a7,7,0,0,0-7.77,3.52h0" />
              </g>
            </g>
          </svg>
        )
      default:
        return null
    }
  }

  createOjos(color, number) {
    switch (number) {
      case 1:
        return (
          <svg className="ojos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.95 24.29">
            <defs>
              <style>
                {`.ojos {
                        position: absolute;
                        margin-left: auto; 
                        margin-right: auto; 
                        left: 0; 
                        right: 0;
                        top: 18%;
                        z-index: 5;
                        width: 15%
                      }
                      .cls-5{fill:hsl(` +
                  color +
                  `,100%,50%);stroke:#1d1d1b;stroke-miterlimit:10;stroke-width:3px;}
                      .cls-6{fill:#1d1d1b;}`}
              </style>
            </defs>
            <rect className="cls-5" x="28.72" y="7.12" width="12.51" height="15.67" rx="6.26" />
            <rect className="cls-6" x="28.72" y="10.94" width="12.51" height="12.51" rx="6.26" />
            <path
              className="cls-6"
              d="M174.62,48.82h-.12a.8.8,0,0,1-.79-.69c-.46-2.65-3.54-4.7-7.26-4.7s-6.8,2-7.26,4.7a.8.8,0,0,1-.79.69h-.12a.79.79,0,0,1-.79-.9c.56-3.5,4.37-6.21,9-6.21s8.4,2.71,9,6.21A.8.8,0,0,1,174.62,48.82Z"
              transform="translate(-131.48 -41.71)"
            />
            <rect
              className="cls-5"
              x="134.25"
              y="48.83"
              width="12.51"
              height="15.67"
              rx="6.26"
              transform="translate(149.89 70.73) rotate(179.64)"
            />
            <rect
              className="cls-6"
              x="134.26"
              y="52.64"
              width="12.51"
              height="12.51"
              rx="6.26"
              transform="translate(149.93 75.21) rotate(179.64)"
            />
            <path
              className="cls-6"
              d="M132.29,48.88h.12a.81.81,0,0,0,.78-.7c.45-2.65,3.52-4.73,7.23-4.75s6.81,2,7.29,4.66a.8.8,0,0,0,.79.68h.13a.79.79,0,0,0,.79-.9c-.59-3.5-4.41-6.19-9-6.16S132,44.48,131.49,48A.79.79,0,0,0,132.29,48.88Z"
              transform="translate(-131.48 -41.71)"
            />
          </svg>
        )
      case 2:
        return (
          <svg className="ojos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.31 17.55">
            <defs>
              <style>
                {`.ojos {
                        position: absolute;
                        margin-left: auto; 
                        margin-right: auto; 
                        left: 0; 
                        right: 0;
                        top: 18%;
                        z-index: 5;
                        width: 15%
                      }
                      .cls-5{fill:hsl(` +
                  color +
                  `,100%,50%);stroke:#1d1d1b;stroke-miterlimit:10;stroke-width:3px;}
                      .cls-6{fill:#1d1d1b;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <g id="ojos_2" data-name="ojos 2">
                  <line className="cls-5" x1="20.85" y1="6.75" x2="0.15" y2="1.25" />
                  <path d="M19.55,7.45l-18.8-5a1,1,0,0,1-.7-1.2h0a1,1,0,0,1,1.2-.7l18.8,5a1,1,0,0,1,.7,1.2h0A.86.86,0,0,1,19.55,7.45Z" />
                  <line className="cls-5" x1="16.85" y1="11.15" x2="0.15" y2="6.75" />
                  <path d="M15.55,11.85.75,8a1,1,0,0,1-.7-1.2h0a1,1,0,0,1,1.2-.7L16.05,10a1,1,0,0,1,.7,1.2h0A1,1,0,0,1,15.55,11.85Z" />
                  <path d="M14,13.15c0,2.4-1.4,4.4-3.2,4.4s-3.2-2-3.2-4.4,1.4-3.4,3.2-3.4S14,10.65,14,13.15Z" />
                  <line className="cls-5" x1="20.85" y1="6.75" x2="0.15" y2="1.25" />
                  <path d="M19.55,7.45l-18.8-5a1,1,0,0,1-.7-1.2h0a1,1,0,0,1,1.2-.7l18.8,5a1,1,0,0,1,.7,1.2h0A.86.86,0,0,1,19.55,7.45Z" />
                  <line className="cls-5" x1="16.85" y1="11.15" x2="0.15" y2="6.75" />
                  <path d="M15.55,11.85.75,8a1,1,0,0,1-.7-1.2h0a1,1,0,0,1,1.2-.7L16.05,10a1,1,0,0,1,.7,1.2h0A1,1,0,0,1,15.55,11.85Z" />
                  <path d="M14,13.15c0,2.4-1.4,4.4-3.2,4.4s-3.2-2-3.2-4.4,1.4-3.4,3.2-3.4S14,10.65,14,13.15Z" />
                  <line className="cls-5" x1="32.55" y1="6.25" x2="53.15" y2="0.75" />
                  <path d="M33.75,7l18.8-5a1,1,0,0,0,.7-1.2h0a1,1,0,0,0-1.2-.7l-18.8,5a1,1,0,0,0-.7,1.2h0A1,1,0,0,0,33.75,7Z" />
                  <line className="cls-5" x1="36.55" y1="10.65" x2="53.15" y2="6.25" />
                  <path d="M37.75,11.35l14.8-3.9a1,1,0,0,0,.7-1.2h0a1,1,0,0,0-1.2-.7l-14.8,3.9a1,1,0,0,0-.7,1.2h0A1,1,0,0,0,37.75,11.35Z" />
                  <path d="M39.45,12.65c0,2.4,1.4,4.4,3.2,4.4s3.2-2,3.2-4.4-1.4-3.4-3.2-3.4S39.45,10.15,39.45,12.65Z" />
                </g>
              </g>
            </g>
          </svg>
        )
      case 3:
        return (
          <svg className="ojos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 24.72">
            <defs>
              <style>
                {`.ojos {
                        position: absolute;
                        margin-left: auto; 
                        margin-right: auto; 
                        left: 0; 
                        right: 0;
                        top: 18%;
                        z-index: 5;
                        width: 15%
                      }
                      .cls-5{fill:hsl(` +
                  color +
                  `,100%,50%);stroke:#1d1d1b;stroke-miterlimit:10;stroke-width:3px;}
                      .cls-6{fill:#1d1d1b;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <g id="ojos_3" data-name="ojos 3">
                  <path d="M10.79,24.72a10,10,0,0,1-9.9-8.8,1,1,0,0,1,1-1.1h0a1.06,1.06,0,0,1,1,.9,7.95,7.95,0,0,0,15.8,0,1.06,1.06,0,0,1,1-.9h0a1,1,0,0,1,1,1.1A10,10,0,0,1,10.79,24.72Z" />
                  <path d="M37.09,24.32a10,10,0,0,1-9.9-8.8,1,1,0,0,1,1-1.1h0a1.06,1.06,0,0,1,1,.9,7.95,7.95,0,0,0,15.8,0,1.06,1.06,0,0,1,1-.9h0a1,1,0,0,1,1,1.1A10,10,0,0,1,37.09,24.32Z" />
                  <path d="M1,7.82H1a1,1,0,0,1-.9-1.4,9.26,9.26,0,0,1,3.9-4c2.3-1.3,7.2-2.8,14.3,1.1a1.11,1.11,0,0,1,.4,1.4h0a1,1,0,0,1-1.4.3c-5.9-3.3-10-2.5-12.3-1.1a7.06,7.06,0,0,0-3,3.1A1.33,1.33,0,0,1,1,7.82Z" />
                  <path d="M45.69,5.92a1.23,1.23,0,0,1-1-.5,7.23,7.23,0,0,0-3.3-2.7c-2.5-1.1-6.6-1.5-12.1,2.4a1.08,1.08,0,0,1-1.4-.2h0a1.08,1.08,0,0,1,.2-1.4c6.7-4.7,11.7-3.7,14.1-2.6a9.86,9.86,0,0,1,4.3,3.6,1,1,0,0,1-.8,1.4Z" />
                </g>
              </g>
            </g>
          </svg>
        )
      case 4:
        return (
          <svg className="ojos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.79 21.42">
            <defs>
              <style>
                {`.ojos {
                        position: absolute;
                        margin-left: auto; 
                        margin-right: auto; 
                        left: 0; 
                        right: 0;
                        top: 18%;
                        z-index: 5;
                        width: 15%
                      }
                      .cls-5{fill:hsl(` +
                  color +
                  `,100%,50%);stroke:#1d1d1b;stroke-miterlimit:10;stroke-width:3px;}
                      .cls-6{fill:#1d1d1b;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <g id="ojos_4" data-name="ojos 4">
                  <path d="M1,7.32H1a1,1,0,0,1-.9-1.4,9.26,9.26,0,0,1,3.9-4c2.3-1.3,7.2-2.8,14.3,1.1a1.11,1.11,0,0,1,.4,1.4h0a1,1,0,0,1-1.4.3c-5.9-3.3-10-2.5-12.3-1.1a7.06,7.06,0,0,0-3,3.1A1.33,1.33,0,0,1,1,7.32Z" />
                  <path d="M44.89,5.92a1.23,1.23,0,0,1-1-.5,7.23,7.23,0,0,0-3.3-2.7c-2.5-1.1-6.6-1.5-12.1,2.4a1.08,1.08,0,0,1-1.4-.2h0a1.08,1.08,0,0,1,.2-1.4C34-1.18,39-.18,41.39.92a9.86,9.86,0,0,1,4.3,3.6,1,1,0,0,1-.8,1.4Z" />
                  <path
                    className="cls-5"
                    d="M9.69,20.42a8.07,8.07,0,0,0,8.1-8.1H1.59A8.13,8.13,0,0,0,9.69,20.42Z"
                  />
                  <ellipse cx="9.39" cy="15.52" rx="2.3" ry="3.2" />
                  <path
                    className="cls-5"
                    d="M36.29,20.42a8.07,8.07,0,0,0,8.1-8.1H28.19A8.07,8.07,0,0,0,36.29,20.42Z"
                  />
                  <ellipse cx="35.99" cy="15.02" rx="2.3" ry="3.2" />
                </g>
              </g>
            </g>
          </svg>
        )
      default:
        return null
    }
  }

  createCuerpo(color, number) {
    switch (number) {
      case 1:
        return (
          <svg className="cuerpo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180.21 314.55">
            <defs>
              <style>
                {`.cuerpo {
                        position: absolute;
                        z-index: 4; 
                        height: 80%; 
                        margin-left: auto; 
                        margin-right: auto; 
                        left: 0; right: 0;
                        top: 0; bottom: 0; 
                        margin-bottom: auto; margin-top: auto;
                      } 
                      .cls-1,.cls-2,.cls-3{fill:hsl(` +
                  color +
                  `,100%,50%);stroke:#000;}
                      .cls-1{stroke - miterlimit:10;stroke-width:3px;}
                      .cls-2{stroke - miterlimit:10;stroke-width:2px;}
                      .cls-3{stroke - miterlimit:10;stroke-width:2px;}`}
              </style>
            </defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <g id="CUERPO">
                  <ellipse
                    cx="107.05"
                    cy="8.46"
                    rx="3.5"
                    ry="3.9"
                    transform="translate(68.61 108.73) rotate(-73.54)"
                  />
                  <path
                    className="cls-1"
                    d="M121.06,66.25c-6.6,15.6-3.2,8.8-12.6,3.1-3.7-2.3-8.4-4.2-17.5-4.2-5.5,0-13.5,3.4-18.2,7.3-7.9,6.5-10.3,10-19.6-25.3C43.76,11.45,78,.65,94,1.55,115.76,2.55,137.16,28.25,121.06,66.25Z"
                  />
                  <path
                    className="cls-1"
                    d="M124.26,97a8.31,8.31,0,0,1,.53,6.87c-2.55,6.91-14.44,12.43-31.73,12.43-20,0-43.6-7.7-37.2-20.9,5.67-12.83,14.57-29.51,37.6-29.7C115,65.64,118.83,81,124.26,97Z"
                  />
                  <path
                    className="cls-1"
                    d="M71.26,115.45c-4.6-5.6,7.78,1.16,19.37.76,3.84-.13,8.74-.09,12-.75,8.92-1.79,13.64-3,10.1.79-3.8,5-9,12.5-21.6,12.3C79.66,128.45,75.1,121.55,71.26,115.45Z"
                  />
                  <circle cx="92.46" cy="84.95" r="2.3" />
                  <ellipse cx="92.76" cy="78.95" rx="2.6" ry="2.3" />
                  <ellipse
                    cx="85.06"
                    cy="81.15"
                    rx="3.9"
                    ry="3.5"
                    transform="translate(-5.65 6.37) rotate(-4.15)"
                  />
                  <ellipse
                    cx="71.62"
                    cy="10.41"
                    rx="3.5"
                    ry="3.9"
                    transform="translate(41.35 76.15) rotate(-73.54)"
                  />
                  <ellipse
                    cx="67.7"
                    cy="15.27"
                    rx="1.6"
                    ry="2.4"
                    transform="translate(33.87 75.87) rotate(-73.54)"
                  />
                  <ellipse
                    cx="107.07"
                    cy="15.24"
                    rx="1.6"
                    ry="2.4"
                    transform="translate(62.12 113.61) rotate(-73.54)"
                  />
                  <path d="M86.36,31a3.52,3.52,0,0,1-2.3-.9,2.18,2.18,0,0,1-.5-.8l-3.1-6.9a2.87,2.87,0,0,1,0-2.4,4,4,0,0,1,1.4-1.5,2.07,2.07,0,0,1-.6-1l-.7-1.8a3,3,0,0,1-.2-1.3,3.1,3.1,0,0,1,2-2.5l.9-.2c-.9-1.1-2.4-3.1-4.7-6.5-.9-1.3-.7-2.2.9-3.3a2.6,2.6,0,0,1,1.5-.4c3.2-.1,16.4-.2,16.4-.2v.8l-16.3.4a1.06,1.06,0,0,0-.9.6.94.94,0,0,0,.1,1,75.52,75.52,0,0,0,5.3,7.2l6.9-.2-9.6,2.8a.82.82,0,0,0-.5.5,1.1,1.1,0,0,0,0,.8l.8,2.1a.68.68,0,0,0,.8.4l2.5-.7a1.14,1.14,0,0,1,1.4.8l.2.7c0,.1,0,.1-.1.2l-5.2,1.7a.9.9,0,0,0-.6.6,1.1,1.1,0,0,0,0,.8l3.1,6.9a1.06,1.06,0,0,0,.7.6,1,1,0,0,0,.9-.2l.2-.1,1-.4.8,1.8-.9.4C87.46,30.75,87,31,86.36,31Z" />
                  <path d="M89.76,31.25a3.72,3.72,0,0,1-2-.7l-.1-.1-.9-1.7c0-.1,0-.2.1-.2l.2-.1a1.53,1.53,0,0,1,2.1.7h0a.88.88,0,0,0,.7.1c.3-.1.6-.2.7-.5l3.6-6.6a1.13,1.13,0,0,0,.1-.8.9.9,0,0,0-.6-.6l-4.7-2a.71.71,0,0,1-.3-.6h0a1.55,1.55,0,0,1,2-.9l1.6.6a1.18,1.18,0,0,0,1.5-.6l.7-1.6a1.1,1.1,0,0,0,0-.8,1,1,0,0,0-.5-.6l-9.9-2.8,4.4-.4a7.34,7.34,0,0,0,6.1-2.4c1-1.2,2.2-2.6,3.3-3.9a1,1,0,0,0,.2-1,1.07,1.07,0,0,0-.8-.6l-17.1-.1a14,14,0,0,1,1-1.6h0a.1.1,0,0,1,.1-.1l16.1-.1h0a3.38,3.38,0,0,1,1.9.9,3.19,3.19,0,0,1,.2,4.1,68.22,68.22,0,0,1-5.2,6.1l.8.3a3,3,0,0,1,1.8,2,3,3,0,0,1-.2,2.1l-.7,1.6a2.18,2.18,0,0,1-.7.9,2.76,2.76,0,0,1,1.2,1.6,2.87,2.87,0,0,1-.2,2.4l-3.6,6.5a3.18,3.18,0,0,1-1.1,1.2A13.49,13.49,0,0,1,89.76,31.25Z" />
                  <ellipse
                    className="cls-2"
                    cx="71.17"
                    cy="95.72"
                    rx="5.1"
                    ry="3.3"
                    transform="matrix(0.55, -0.84, 0.84, 0.55, -47.9, 102.78)"
                  />
                  <ellipse
                    className="cls-3"
                    cx="109.46"
                    cy="95.25"
                    rx="3.3"
                    ry="5.1"
                    transform="translate(-31.75 61.91) rotate(-27.74)"
                  />
                  <path
                    className="cls-1"
                    d="M85.26,295.65a31.93,31.93,0,0,1-2-7.5c0-.2-.1-.3-.1-.4h0L86,267c-29.1-1.8-49.2-17.3-57.9-45.5a47.18,47.18,0,0,0,1.4,17.3c2.6,10.2,7.9,18.5,14.1,23.5,1,1.3,2.1,2.7,3.3,4.1,6.7,8,3.9,18.5,2.4,25.7a17.79,17.79,0,0,1-4.6,5.4c-.1,0-.2-.1-.3-.1l-3.9-.9a2.22,2.22,0,0,0-2.7,1.7h-1a2,2,0,0,0,.9,1.8,2.38,2.38,0,0,0-1.7,1.9H35c-.2,1.2,1.7,2.4,3,2.6h0a2.43,2.43,0,0,0-1.4,2.1h-1c0,1.3,2,2.3,3.3,2.3h.8a2.34,2.34,0,0,0-.8,1.8c0,1.3-4.3,2.3,2.3,2.3h4c.5,0,2.6-.2,4.7-.5h26.2a11.17,11.17,0,0,0,4.4-.9,10.79,10.79,0,0,0,5.6-13.7Z"
                  />
                  <path
                    className="cls-1"
                    d="M93.36,296a37.66,37.66,0,0,0,2-7.5c0-.2.1-.3.1-.4h0l-2.9-20.7c29.1-2,49.1-17.7,57.6-45.9a49.29,49.29,0,0,1-1.3,17.3c-2.5,10.2-7.8,18.6-14,23.6-1,1.3-2.1,2.7-3.2,4.1-6.7,8-3.8,18.5-2.2,25.7a17.77,17.77,0,0,0,4.7,5.4c.1,0,.2-.1.3-.1l3.9-.9a2.22,2.22,0,0,1,2.7,1.7h1a2,2,0,0,1-.9,1.8,2.38,2.38,0,0,1,1.7,1.9h1c.2,1.2-1.7,2.4-2.9,2.6h0a2.31,2.31,0,0,1,1.4,2.1h1c0,1.3-2,2.3-3.3,2.3h-.8a2.27,2.27,0,0,1,.9,1.8c0,1.3,4.3,2.3-2.3,2.3h-4c-.5,0-2.6-.2-4.7-.5h-.6l-25.8.2a11.17,11.17,0,0,1-4.4-.9,10.89,10.89,0,0,1-5.7-13.7Z"
                  />
                  <circle cx="44.26" cy="119.25" r="2.3" />
                  <ellipse cx="44.56" cy="113.25" rx="2.6" ry="2.3" />
                  <ellipse
                    cx="36.86"
                    cy="115.46"
                    rx="3.9"
                    ry="3.5"
                    transform="translate(-8.27 2.97) rotate(-4.15)"
                  />
                  <circle cx="163.56" cy="193.05" r="2.3" />
                  <ellipse cx="163.86" cy="187.05" rx="2.6" ry="2.3" />
                  <ellipse
                    cx="156.16"
                    cy="189.36"
                    rx="3.9"
                    ry="3.5"
                    transform="translate(-13.31 11.81) rotate(-4.15)"
                  />
                  <circle cx="62.86" cy="282.35" r="2.3" />
                  <ellipse cx="63.16" cy="276.35" rx="2.6" ry="2.3" />
                  <ellipse
                    cx="55.46"
                    cy="278.66"
                    rx="3.9"
                    ry="3.5"
                    transform="translate(-20.04 4.75) rotate(-4.15)"
                  />
                  <circle cx="120.76" cy="270.25" r="2.3" />
                  <ellipse cx="121.06" cy="264.25" rx="2.6" ry="2.3" />
                  <ellipse
                    cx="113.36"
                    cy="266.46"
                    rx="3.9"
                    ry="3.5"
                    transform="translate(-19 8.91) rotate(-4.15)"
                  />
                  <path
                    className="cls-1"
                    d="M52.36,101.45l.2.6c3,9.6,10.4,19.2,2.8,28.3v.1a21.21,21.21,0,0,0-4.2,8.5l-8.6,38.6a21.7,21.7,0,0,1-5.1,10l2.4,8.4a9.85,9.85,0,0,1-.7,7.4l4.4,5.4c1.5,1.9,2.6,6,.8,7.3l-1.2-1.5c-1.8,1.3-4.5.7-6.1-1.2l-4.7-5.8a3.39,3.39,0,0,1-1.5-.6l.4,6.4a3.61,3.61,0,0,1-4,3.9l.3,1.8c-2.4-.1-4.8-3.9-4.9-6.2l-.4-5.5-1.7,2.7a2.18,2.18,0,0,1-.4.5v.7c-.1-.1-.3-.2-.4-.3a4.35,4.35,0,0,1-5,0l-1.5,1.9c-2.1-1.4-1.3-5.9-.2-7.7l2-3.2c-.3-.4-.6-.7-.8-.7l-1.1.3-2.5,2.1a3.34,3.34,0,0,1-2.7.6c-.4.2-.6.2-.6-.1a7.31,7.31,0,0,1-3.8-2l-1.5,1.9c-1.7-1.8.9-5.5,2.5-6.9l6.2-5.2,20-71.1C32.66,114.85,41,99.25,52.36,101.45Z"
                  />
                  <path
                    className="cls-1"
                    d="M127.36,104.05l-.2.6c-2.9,9.7-10.3,19.2-2.7,28.3l.1.1a20,20,0,0,1,4.2,8.5l8.8,38.5a21.87,21.87,0,0,0,5.2,10l-2.3,8.4a10.35,10.35,0,0,0,.7,7.4l-4.4,5.5c-1.5,1.9-2.5,6-.7,7.3l1.2-1.5a4.5,4.5,0,0,0,6-1.2l4.7-5.8a3.39,3.39,0,0,0,1.5-.6l-.4,6.2a3.7,3.7,0,0,0,4,3.9l-.3,1.8c2.4-.2,4.7-3.9,4.9-6.2l.4-5.5,1.7,2.7a2.18,2.18,0,0,0,.4.5v.7c.1-.1.3-.2.4-.3a4.35,4.35,0,0,0,5,0l1.5,1.9c2.1-1.4,1.3-5.9.1-7.7l-2-3.2c.3-.4.6-.7.8-.7l1.1.3,2.5,2.1a3.9,3.9,0,0,0,2.7.6c.4.2.6.2.6-.1a7.72,7.72,0,0,0,3.8-2l1.5,1.9c1.7-1.8-.9-5.5-2.6-6.9l-6.2-5.2-20.4-71C147.06,117.35,138.66,101.75,127.36,104.05Z"
                  />
                  <line className="cls-1" x1="85.86" y1="266.95" x2="92.56" y2="267.35" />
                  <polyline
                    className="cls-1"
                    points="51.88 40.64 43.95 42.95 51.16 47.85 47.55 54.75 54.53 52.27"
                  />
                  <polyline
                    className="cls-1"
                    points="125.46 52.35 133.06 54.65 129.75 46.55 136.56 42.75 126.68 40.35"
                  />
                </g>
                <line className="cls-1" x1="52.36" y1="101.45" x2="55" y2="101.45" />
                <line className="cls-1" x1="127.36" y1="104.05" x2="124.79" y2="103.82" />
                <line className="cls-1" x1="151.22" y1="219.31" x2="149.92" y2="222.22" />
                <line className="cls-1" x1="27.02" y1="218.96" x2="28.06" y2="221.45" />
              </g>
            </g>
          </svg>
        )
      case 2:
        return (
          <svg className="cuerpo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180.25 314.75">
            <defs>
              <style>
                {`.cuerpo {position: absolute;z-index: 4;top: 40px;width: 500px;height: 500px;} .cls-1{fill:black;}.cls-2,.cls-3,.cls-4{fill:hsl(` +
                  color +
                  `,100%,50%);stroke-miterlimit:10;}.cls-2,.cls-3{stroke:#1d1d1b;}.cls-2,.cls-4{stroke - width:3px;}.cls-3{stroke - width:2px;}.cls-4{stroke:#000;}`}
              </style>
            </defs>
            <ellipse
              className="cls-1"
              cx="170.01"
              cy="16.95"
              rx="3.48"
              ry="3.92"
              transform="translate(42.66 166.86) rotate(-73.54)"
            />
            <path
              className="cls-2"
              d="M184,74.73c-6.63,15.61-3.2,8.79-12.62,3.06-3.72-2.26-8.43-4.19-17.54-4.24-5.46,0-13.47,3.43-18.22,7.32-7.93,6.48-10.29,10-19.62-25.32-9.42-35.69,24.83-46.47,40.84-45.64C178.7,11,200.12,36.77,184,74.73Z"
              transform="translate(-62.92 -8.33)"
            />
            <path
              className="cls-2"
              d="M187.24,105.45c5,9.7-8.44,19.25-31.2,19.25-20,0-43.63-7.65-37.2-20.85,6.51-13.36,16-30.5,37.6-29.68C176.25,74.92,179.48,90.51,187.24,105.45Z"
              transform="translate(-62.92 -8.33)"
            />
            <path
              className="cls-2"
              d="M134.19,124c-4.58-5.62,8.21,1.71,19.85,1.64s25.43-5.78,21.72-.79-9,12.51-21.59,12.27C142.64,136.91,138.74,129.59,134.19,124Z"
              transform="translate(-62.92 -8.33)"
            />
            <circle className="cls-1" cx="92.43" cy="85.1" r="2.29" />
            <ellipse className="cls-1" cx="92.73" cy="79.1" rx="2.59" ry="2.29" />
            <ellipse
              className="cls-1"
              cx="147.96"
              cy="89.66"
              rx="3.92"
              ry="3.48"
              transform="translate(-69.02 2.62) rotate(-4.15)"
            />
            <ellipse
              className="cls-1"
              cx="134.63"
              cy="18.9"
              rx="3.48"
              ry="3.92"
              transform="translate(15.44 134.32) rotate(-73.54)"
            />
            <ellipse
              className="cls-1"
              cx="130.64"
              cy="23.73"
              rx="1.61"
              ry="2.4"
              transform="translate(7.95 133.96) rotate(-73.54)"
            />
            <ellipse
              className="cls-1"
              cx="170.01"
              cy="23.73"
              rx="1.61"
              ry="2.4"
              transform="translate(36.16 171.72) rotate(-73.54)"
            />
            <path
              className="cls-1"
              d="M149.32,39.42a3.1,3.1,0,0,1-2.28-.93,2.51,2.51,0,0,1-.52-.8l-3.1-6.92a3,3,0,0,1,0-2.43,2.93,2.93,0,0,1,1.36-1.46,3,3,0,0,1-.62-1l-.67-1.82a2.87,2.87,0,0,1-.17-1.33,3,3,0,0,1,2-2.55l.93-.22c-.94-1.14-2.38-3.1-4.67-6.49a3,3,0,0,1,.87-4.3A2.76,2.76,0,0,1,144,8.73l16.38-.4,0,2-16.34.4a1,1,0,0,0-.88.56,1,1,0,0,0,.09,1,77.47,77.47,0,0,0,5.27,7.17l6.93-.15-9.55,2.75a1,1,0,0,0-.51.5,1,1,0,0,0,0,.79l.76,2.08a.67.67,0,0,0,.82.42l2.48-.69a1.15,1.15,0,0,1,1.42.77l.23.72a.12.12,0,0,1-.08.15l-5.16,1.74a1,1,0,0,0-.6.56,1,1,0,0,0,0,.81l3.08,6.88a1,1,0,0,0,.67.56,1,1,0,0,0,.85-.16l.2-.12,1-.43.81,1.83-.91.4A3,3,0,0,1,149.32,39.42Z"
              transform="translate(-62.92 -8.33)"
            />
            <path
              className="cls-1"
              d="M152.74,39.74a3,3,0,0,1-2-.75l-.14-.12-.86-1.65a.15.15,0,0,1,.06-.2l.24-.13a1.6,1.6,0,0,1,2.14.67v0a1,1,0,0,0,1.42-.37l3.64-6.59a1,1,0,0,0,.07-.81,1,1,0,0,0-.56-.6l-4.68-2a.49.49,0,0,1-.25-.61h0a1.59,1.59,0,0,1,2-.9l1.61.61a1.17,1.17,0,0,0,1.46-.6l.75-1.62a1,1,0,0,0-.52-1.35L147,20l4.39-.44a7,7,0,0,0,6.07-2.41c1-1.19,2.2-2.6,3.25-3.91a1,1,0,0,0,.19-1.05,1,1,0,0,0-.79-.62l-16,.06a.15.15,0,0,1-.15-.15V9.78a.15.15,0,0,1,.15-.15l16.08-.06h0a3,3,0,0,1,1.88.87,3,3,0,0,1,.16,4.07c-2.55,3.18-4.14,5-5.17,6.06l.82.27a3.05,3.05,0,0,1,1.81,2.05,3.27,3.27,0,0,1-.25,2.15l-.75,1.6a3,3,0,0,1-.69.95,3,3,0,0,1,1,4l-3.6,6.52a3.12,3.12,0,0,1-1.07,1.18A3.22,3.22,0,0,1,152.74,39.74Z"
              transform="translate(-62.92 -8.33)"
            />
            <ellipse
              className="cls-3"
              cx="134.09"
              cy="104.23"
              rx="5.12"
              ry="3.34"
              transform="translate(-89.5 150.92) rotate(-56.76)"
            />
            <ellipse
              className="cls-3"
              cx="172.42"
              cy="103.72"
              rx="3.34"
              ry="5.12"
              transform="translate(-91.38 83.85) rotate(-27.74)"
            />
            <path
              className="cls-2"
              d="M148.21,304.17a38.6,38.6,0,0,1-2-7.45,2.19,2.19,0,0,0-.11-.43v0l2.77-20.76c-29.1-1.78-49.2-17.33-57.92-45.54a49.44,49.44,0,0,0,1.39,17.33c2.6,10.15,7.88,18.5,14.14,23.52,1,1.31,2.08,2.67,3.26,4.07,6.73,8,3.88,18.47,2.41,25.68a18.4,18.4,0,0,1-4.62,5.43,2.67,2.67,0,0,0-.26-.09l-4-.86a2.3,2.3,0,0,0-2.73,1.75h-1a2,2,0,0,0,.92,1.81,2.31,2.31,0,0,0-1.67,1.9h-1c-.17,1.24,1.71,2.41,3,2.58h0a2.29,2.29,0,0,0-1.38,2.09h-1c0,1.26,2,2.3,3.29,2.3h.78a2.25,2.25,0,0,0-.85,1.76c0,1.26-4.3,2.29,2.29,2.29h4c.55,0,2.58-.2,4.69-.52l.61,0H139a11.14,11.14,0,0,0,4.36-.89A10.84,10.84,0,0,0,149,306.43Z"
              transform="translate(-62.92 -8.33)"
            />
            <path
              className="cls-2"
              d="M156.26,304.5a38.68,38.68,0,0,0,2-7.47,2.4,2.4,0,0,1,.11-.43v0l-2.91-20.74c29.09-2,49.07-17.66,57.61-45.92a49.53,49.53,0,0,1-1.27,17.33c-2.53,10.17-7.76,18.56-14,23.62-1,1.32-2.07,2.68-3.24,4.09-6.68,8.05-3.75,18.49-2.24,25.7A18.24,18.24,0,0,0,197,306l.26-.08,4-.89a2.28,2.28,0,0,1,2.73,1.73h1a2,2,0,0,1-.91,1.82,2.29,2.29,0,0,1,1.68,1.88h1c.19,1.25-1.69,2.43-2.93,2.61h0a2.3,2.3,0,0,1,1.39,2.09h1c0,1.26-2,2.3-3.27,2.31h-.78a2.33,2.33,0,0,1,.86,1.76c0,1.26,4.32,2.26-2.28,2.31l-4,0c-.55,0-2.58-.18-4.69-.49l-.61,0-25.76.17a11.2,11.2,0,0,1-4.37-.85,10.84,10.84,0,0,1-5.73-13.68Z"
              transform="translate(-62.92 -8.33)"
            />
            <circle className="cls-1" cx="44.31" cy="119.38" r="2.29" />
            <ellipse className="cls-1" cx="44.61" cy="113.38" rx="2.59" ry="2.29" />
            <ellipse
              className="cls-1"
              cx="99.83"
              cy="123.94"
              rx="3.92"
              ry="3.48"
              transform="translate(-71.63 -0.77) rotate(-4.15)"
            />
            <circle className="cls-1" cx="163.6" cy="193.25" r="2.29" />
            <ellipse className="cls-1" cx="163.9" cy="187.25" rx="2.59" ry="2.29" />
            <ellipse
              className="cls-1"
              cx="219.13"
              cy="197.82"
              rx="3.92"
              ry="3.48"
              transform="translate(-76.67 8.06) rotate(-4.15)"
            />
            <circle className="cls-1" cx="62.86" cy="282.55" r="2.29" />
            <ellipse className="cls-1" cx="63.16" cy="276.55" rx="2.59" ry="2.29" />
            <ellipse
              className="cls-1"
              cx="118.39"
              cy="287.12"
              rx="3.92"
              ry="3.48"
              transform="translate(-83.4 1) rotate(-4.15)"
            />
            <circle className="cls-1" cx="120.81" cy="270.41" r="2.29" />
            <ellipse className="cls-1" cx="121.11" cy="264.41" rx="2.59" ry="2.29" />
            <ellipse
              className="cls-1"
              cx="176.34"
              cy="274.97"
              rx="3.92"
              ry="3.48"
              transform="translate(-82.37 5.17) rotate(-4.15)"
            />
            <path className="cls-2" d="M296.44,99.42" transform="translate(-62.92 -8.33)" />
            <path
              className="cls-4"
              d="M115.25,110l.18.57c3,9.65,10.44,19.16,2.83,28.25l-.05.06a19.93,19.93,0,0,0-4.15,8.49l-8.58,38.57a22.28,22.28,0,0,1-5.1,10l2.35,8.41a9.88,9.88,0,0,1-.7,7.41l4.41,5.43c1.55,1.91,2.57,6,.79,7.26L106,222.92a4.6,4.6,0,0,1-6.05-1.16l-4.73-5.82a3.41,3.41,0,0,1-1.52-.57l.44,6.39a3.64,3.64,0,0,1-4,3.9l.35,1.79c-2.36-.14-4.76-3.91-4.92-6.19l-.38-5.49-1.66,2.67a3.62,3.62,0,0,1-.42.53l0,.68a1.22,1.22,0,0,1-.4-.32,4.34,4.34,0,0,1-5,0l-1.48,1.9c-2.06-1.36-1.33-5.88-.18-7.72l2-3.23c-.31-.44-.6-.7-.84-.66a10,10,0,0,0-1.11.28L73.6,212a3.51,3.51,0,0,1-2.68.58c-.36.17-.58.17-.63-.11a7.58,7.58,0,0,1-3.84-2L65,212.38c-1.68-1.8.86-5.48,2.52-6.89l6.16-5.25,20-71.09C95.64,123.37,103.94,107.73,115.25,110Z"
              transform="translate(-62.92 -8.33)"
            />
            <path className="cls-1" d="M85.69,168.36" transform="translate(-62.92 -8.33)" />
            <path
              className="cls-4"
              d="M190.28,112.53l-.17.57c-2.91,9.67-10.33,19.22-2.68,28.27l0,.06a19.88,19.88,0,0,1,4.2,8.47l8.79,38.52a22.18,22.18,0,0,0,5.16,10l-2.31,8.42a9.92,9.92,0,0,0,.74,7.41l-4.38,5.46c-1.54,1.91-2.54,6-.75,7.26l1.21-1.5a4.61,4.61,0,0,0,6.05-1.19l4.7-5.85a3.5,3.5,0,0,0,1.51-.57l-.41,6.39a3.64,3.64,0,0,0,4,3.87l-.34,1.8c2.36-.16,4.74-3.94,4.89-6.22l.35-5.49,1.68,2.66a3.54,3.54,0,0,0,.42.52l0,.69a1.55,1.55,0,0,0,.39-.33,4.34,4.34,0,0,0,5,0l1.49,1.9c2.05-1.37,1.3-5.88.14-7.72l-2-3.23c.31-.43.6-.69.84-.65a8.17,8.17,0,0,1,1.11.27l2.52,2.12a3.51,3.51,0,0,0,2.68.57c.36.16.59.17.63-.11a7.68,7.68,0,0,0,3.84-2l1.48,1.89c1.67-1.81-.89-5.48-2.55-6.88l-6.19-5.21-20.43-71C210,125.84,201.59,110.25,190.28,112.53Z"
              transform="translate(-62.92 -8.33)"
            />
            <line className="cls-2" x1="85.91" y1="267.16" x2="92.54" y2="267.49" />
            <polyline
              className="cls-2"
              points="52.89 40.49 43.94 43.14 51.15 48.05 47.54 54.92 56.17 52.23"
            />
            <polyline
              className="cls-2"
              points="124.18 52.1 133.11 54.8 129.77 46.74 136.56 42.97 127.86 40.49"
            />
          </svg>
        )
      default:
        return null
    }
  }

  createCuerpoFondo(color) {
    return (
      <svg className="cuerpoBack" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.47 176.49">
        <defs>
          <style>
            {`.cuerpoBack {
                    position: absolute;
                    z-index: 0;
                    margin-left: auto;
                    margin-right: auto;
                    left: 0;
                    right: 0;
                    top: 33%;
                    width: 38%;
                  } 
                  .cls-100{fill:hsl(` +
              color +
              `,100%,50%);stroke:#000;stroke-miterlimit:10;stroke-width:3px;}`}
          </style>
        </defs>
        <g id="Capa_2" data-name="Capa 2">
          <g id="Capa_1-2" data-name="Capa 1">
            <path
              className="cls-100"
              d="M106.83,25.52,120,129.76c-.21,6.72-1.77,17-8.84,25.35-4,4.7-8.54,7.38-14.29,10.77a91.9,91.9,0,0,1-18.38,8.27,115.49,115.49,0,0,1-31.12-.46A114.4,114.4,0,0,1,34.72,171a56.15,56.15,0,0,1-7.45-3.73,58.22,58.22,0,0,1-6.82-4.78l-9-9.25a38.18,38.18,0,0,1-7.75-12.9A39.89,39.89,0,0,1,2.6,117.89Q7.85,92.65,13.11,67.42c-4.9-21.32.78-43.17,15.16-55.35C48.62-5.17,84.88-1.75,106.83,25.52Z"
            />
          </g>
        </g>
      </svg>
    )
  }

  render: () => ReactElement<DProps> = () => (
    <>
      <Card className="cardContainer">
        <CardContent>
          {this.createCuerpo(this.state.colorCuerpo, this.state.typeCuerpo)}
          {this.createAlas(this.state.colorAlas, this.state.typeAlas)}
          {this.createCuernos(this.state.colorCuernos, this.state.typeCuernos)}
          {this.createCola(this.state.colorCola, this.state.typeCola)}
          {this.createCuerpoFondo(this.state.colorCuerpo)}
          {this.createPanza(this.state.colorPanza, this.state.typePanza)}
          {this.createOjos(this.state.colorOjos, this.state.typeOjos)}
        </CardContent>
      </Card>
      <style global jsx>{`
        .cardContainer {
          position: absolute;
          width: 100px;
          height: 120px;
          float: left;
        }
      `}</style>
    </>
  )
}

export default DragonCreator
