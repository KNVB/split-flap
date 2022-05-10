import './SplitFlap.css';
export default function SplitFlap({ action, bgColor, borderRadius, color, fontFamily, fontSize, height, hinge, newValue, oldValue, width }) {
    let style = {
        "background-color": bgColor || 'black',
        "box-sizing": "border-box",
        "border-radius": borderRadius || "10px",
        "color": color || "white",
        "font-family": fontFamily || 'arial',
        "font-size": fontSize || "5.5em",
        "height": height || "150px",
        "line-height": height || "150px",
        "position": "relative",
        "text-align": "center",
        "transform-style": "preserve-3d",
        "width": width || "100px"
    };
    let firstDivHandle = () => { }
    let secondDivHandle = () => { }
    let thirdDivHandle = () => { }
    let fourDivHandle = () => { }
    return (
        <div style={style}>
            <div 
                className="fullCard-after zIndex2" 
                id="first"
                onAnimationEndCapture={firstDivHandle}
                style={{ "background-color": style['background-color'] }} >
                因
            </div>
            <div 
                className="fullCard-after zIndex2"
                id="second"
                onAnimationEndCapture={secondDivHandle}
                style={{ "background-color": style['background-color'] }} >
                果
            </div>
            <div 
                className="halfCard zIndex2" 
                id="third"
                onAnimationEndCapture={thirdDivHandle}
                style={{ "background-color": style['background-color'] }}>
                因
            </div>
            <div  
                className="halfCard zIndex4" 
                id="fourth"
                onAnimationEndCapture={fourDivHandle}
                style={{ "background-color": style['background-color'] }}>
                果
            </div>
        </div>
    )
}