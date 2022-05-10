export default function Test({bgColor,color, fontFamily, fontSize, height, hinge, newValue, oldValue, width}){
    let style={
        "background-color": bgColor || 'black',
        "box-sizing":"border-box",
		"border-radius":"10px",
        "color": color|| "white",
        "font-family":fontFamily || 'arial',
        "font-size":fontSize|| "5.5em",
        "height": height||"150px",
        "line-height": height||"150px",
        "position":"relative",
        "text-align":"center",
        "transform-style":"preserve-3d",
        "width":width ||"100px"
    };
    return (
        <div style={style}>
            國
        </div>
    )
}