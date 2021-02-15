import deviceType from '../types/device-types'

export default function getDeviceType(UA: string): deviceType {
  const isMobile = Boolean(
    UA.match(
      /android.*(.*Acer.*Iconia.*one.*7|.*KFFOWI.*|.*9006|.*Huawei.T1.*|.*NBX-T7A2I.*|.*Lenovo.A7.*|.*Lenovo.TB3.710F.*|.*Noblex.NBX.T742.*|.*Noblex.NBX.T8A1IE.*|.*PCBox.*|.*BGH-Y210.*|.*Positivo.Y400.*|.*SM-P350.*|.*SM-T231.*|.*SM-T350.*|.*SM-T280.*|.*SM-T560.*|.*SM-T113NU.*|.*Alcatel|.*SM-T116BU|.*SM-T285M|.*SM-T56.|.*SM-T210|.*Nexus.7|.*GT-N5110|.*SM-T110|.*SM-T230NU|.*SM-J710MN.*|.*IdeaTab.A3000|.*A1-810|.*A1_07|.*LG-V500|.*SM-T310.*|.*SM-J710MN.*|.*SM-T230|.*SM-T111|.*SM-T211|.*Tablet.DL.1603|.*GT-N5100|.*GT-P6200|.*SM-T320|.*ME371MG|.*GT-P6210|.*MZ608|.*GT-P6800|.*SM-T330|.*GT-P1000|.*GT-P7300|.*B1-730HD|.*A1-830|.*KFTT|.*PI2000|.*SM-T700|.*SM-T330|.*SGPT12|.*PCB-T700|.*MID7036|.*IdeaTab.A2109A|.*IdeaTab.A3000-F|.*IdeaTab.A2107A-F|.*RAIM7000NBD|.*TwitterAndroid)|PlayBook.*RIM.Tablet|Instagram/i
    )
  )
  const isMobileRest = Boolean(
    UA.match(
      /blackberry|android|iphone|ipod|symb|googlebot-mobile|Playstation.Vita|kindle|symbian|windows.phone|BB10|Mobile.*Firefox|Nokia[0-9][0-9]|Nokia[A-Z][0-9]|LG-[A-Z][0-9]|SAMSUNG-GT|SPICE|Opera.Mini/i
    )
  )
  const isTablet = Boolean(
    UA.match(
      /ipad|Silk.1.0.22.79|android(?!(.*mobile|.*kindle|.*A2107A|.*HP.7|.*opera.mini|.*HP.Slate.7|.*B1-710|.*GT-P3100|.*GT-P1000|.*IdeaTabA1000|.*gt-P3110|.*gt-P3113|.*NX008HD8G|.*ME172V|.*ME173X|.*AT300|.*MediaPad.7.Lite|.*B1-A71|.*A200|.*A100|.*SM-T210R|.*SM-T211|.*SM-T217S|.*SGPT12|.*K00U.Build))(?!(.*MMS-V))|xoom|sch-i800|playbook|tablet|gt-P5100|gt-P7500|gt-P7510|kindle.fire|.*KFOT.Build|.*KFTT.Build|.*KFJWI.Build|.*KFJWA.Build/i
    )
  )

  return isMobile ? 'mobile' : isTablet ? 'tablet' : isMobileRest ? 'mobile' : 'desktop'
}
