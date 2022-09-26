import Avatar from "./avatar"
import { CreatoCoinIcon } from "../../assets/svg"
import DmPyramid1 from "../../assets/img/dareme-pyramid1.png"
import DmPyramid2 from "../../assets/img/dareme-pyramid2.png"
import DmPyramid3 from "../../assets/img/dareme-pyramid3.png"
import DmPyramid4 from "../../assets/img/dareme-pyramid4.png"
import FmPyramid1 from "../../assets/img/fundme-pyramid1.png"
import FmPyramid2 from "../../assets/img/fundme-pyramid2.png"
import FmPyramid3 from "../../assets/img/fundme-pyramid3.png"
import FmPyramid4 from "../../assets/img/fundme-pyramid4.png"
import "../../assets/styles/PyramidCardStyle.scss"

const PyramidCard = (props: any) => {
  const { percentage, itemType, owner } = props
  const fmPyramids = [FmPyramid1, FmPyramid2, FmPyramid3, FmPyramid4]
  const dmPyramids = [DmPyramid1, DmPyramid2, DmPyramid3, DmPyramid4]
  const pyramids: any = itemType === "dareme" ? dmPyramids : fmPyramids
  const pyramidNo: any = (percentage >= 1 && percentage <= 29) ? 0 :
    (percentage >= 30 && percentage <= 49) ? 1 :
      (percentage >= 50 && percentage <= 69) ? 2 :
        (percentage >= 70 && percentage <= 89) ? 2 : 3
  const percent: any = (percentage >= 1 && percentage <= 29) ? 10 :
    (percentage >= 30 && percentage <= 49) ? 30 :
      (percentage >= 50 && percentage <= 69) ? 50 :
        (percentage >= 70 && percentage <= 89) ? 70 : 90

  return (
    <div className="pyramid-card-wrapper">
      <div className="header-title">
        <CreatoCoinIcon color="#EFA058" width={40} height={40} /><span>Creato</span>
      </div>
      <div className="pyramid-part">
        <img src={pyramids[pyramidNo]} alt="pyramids" width={300} />
        <div className="letter-part">
          <div className="top">
            <span className={`top-outline-${itemType}`}>TOP</span>
            <span className="top-front">TOP</span>
          </div>
          <span className="percent">
            <span className={`percent-outline-${itemType}`}>{percent}%</span>
            <span className="percent-front">{percent}%</span>
          </span>
          <span className="superfan">
            <span className={`superfan-outline-${itemType}`}>SuperFans</span>
            <span className="superfan-front">SuperFans</span>
          </span>
        </div>
      </div>
      <div className="profile-name">
        <div className="profile"
          style={{
            background: itemType === "dareme" ?
              "linear-gradient(136.21deg, #FFDD94 0%, #FFC38D 27.6%, #FEB389 53.35%, #FDA384 74.31%, #F68B77 100%)"
              : "linear-gradient(121.78deg, #14C3C9 0%, #14AFC9 29.13%, #14A5C9 54.17%, #1490C9 97.1%)"
          }}
        >
          <Avatar
            size="mobile"
            avatar={owner.avatar.indexOf('uploads') === -1 ? owner.avatar : `${process.env.REACT_APP_SERVER_URL}/${owner.avatar}`}
            handleClick={() => { }}
          />
        </div>
        <div className="name"
          style={{
            background: itemType === "dareme" ?
              "linear-gradient(136.21deg, #FFDD94 0%, #FFC38D 27.6%, #FEB389 53.35%, #FDA384 74.31%, #F68B77 100%)"
              : "linear-gradient(121.78deg, #14C3C9 0%, #14AFC9 29.13%, #14A5C9 54.17%, #1490C9 97.1%)"
          }}>
          <span>{owner.name}</span>
        </div>
      </div>
    </div>
  )
}

export default PyramidCard