import { Animate } from "react-show";

interface Props {
  show: boolean
}


const HideShow: React.FunctionComponent<Props> = (props) => (
  <Animate
    show={props.show}
    duration={200}
    easing={Animate.easings.easeInOutSine}
    style={{ height: "auto" }}
    start={{
      height: 0,
      opacity: 0,
      overflow: "hidden"
    }}
  >
    {props.children}
  </Animate>
);

export default HideShow;